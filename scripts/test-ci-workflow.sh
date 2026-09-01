#!/usr/bin/env bash
set -euo pipefail

workflow="${1:-.github/workflows/ci.yml}"
failures=0

if [[ ! -f "$workflow" ]]; then
  printf 'not ok - workflow file exists: %s\n' "$workflow"
  exit 1
fi

job_block() {
  local job="$1"

  awk -v job="$job" '
    $0 == "  " job ":" { capture = 1 }
    capture && $0 ~ /^  [[:alnum:]_-]+:$/ && $0 != "  " job ":" { exit }
    capture { print }
  ' "$workflow"
}

check_fixed() {
  local description="$1"
  local content="$2"
  local expected="$3"

  if grep -Fq -- "$expected" <<<"$content"; then
    printf 'ok - %s\n' "$description"
  else
    printf 'not ok - %s (missing: %s)\n' "$description" "$expected"
    failures=$((failures + 1))
  fi
}

check_regex() {
  local description="$1"
  local content="$2"
  local expected="$3"

  if grep -Eq -- "$expected" <<<"$content"; then
    printf 'ok - %s\n' "$description"
  else
    printf 'not ok - %s (pattern not found: %s)\n' "$description" "$expected"
    failures=$((failures + 1))
  fi
}

check_absent_fixed() {
  local description="$1"
  local content="$2"
  local forbidden="$3"

  if grep -Fq -- "$forbidden" <<<"$content"; then
    printf 'not ok - %s (unexpected: %s)\n' "$description" "$forbidden"
    failures=$((failures + 1))
  else
    printf 'ok - %s\n' "$description"
  fi
}

workflow_content="$(<"$workflow")"
validate_job="$(job_block validate)"
image_job="$(job_block image)"
dispatch_job="$(job_block dispatch)"

check_regex "pushes target develop and main" "$workflow_content" '^  push:[[:space:]]*$'
check_fixed "develop remains a push branch" "$workflow_content" "      - develop"
check_fixed "main remains a push branch" "$workflow_content" "      - main"
check_fixed "validation installs locked dependencies" "$validate_job" "npm ci"
check_fixed "validation runs lint" "$validate_job" "npm run lint"
check_fixed "validation runs the production build" "$validate_job" "npm run build"

check_fixed "image publication waits for validation" "$image_job" "needs: validate"
check_fixed "images publish only for develop or main pushes" "$image_job" "if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop')"
check_fixed "GHCR publication permission remains scoped to packages" "$image_job" "packages: write"
check_fixed "the image is pushed" "$image_job" "push: true"
check_regex "the only image tag is the immutable full Git SHA" "$image_job" '^[[:space:]]+tags: ghcr\.io/jjinbbang-web/jjinbbang-admin:\$\{\{ github\.sha \}\}[[:space:]]*$'
check_regex "Buildx targets ARM64" "$image_job" '^[[:space:]]+platforms: linux/arm64[[:space:]]*$'
check_fixed "Buildx digest must match the sha256 contract" "$image_job" "^sha256:[0-9a-f]{64}$"
check_fixed "the published digest is inspected" "$image_job" 'docker buildx imagetools inspect "$IMAGE@$IMAGE_DIGEST"'
check_fixed "inspection must prove linux/arm64 is present" "$image_job" "grep -Eq '(^|[[:space:]])linux/arm64([[:space:]]|$)'"

check_fixed "repository dispatch runs only for main pushes" "$dispatch_job" "if: github.event_name == 'push' && github.ref == 'refs/heads/main'"
check_fixed "repository dispatch always targets prod" "$dispatch_job" "DEPLOY_ENVIRONMENT: prod"
check_absent_fixed "develop never triggers repository dispatch" "$dispatch_job" "refs/heads/develop"
check_absent_fixed "this repository has no hourly reconciliation schedule" "$workflow_content" "schedule:"
check_fixed "missing GitOps credentials skip only dispatch" "$dispatch_job" "GitOps dispatch skipped because GitHub App credentials are not configured"
check_fixed "App token creation is credential-gated" "$dispatch_job" "if: steps.gitops.outputs.available == 'true'"
check_fixed "dispatch retries up to three times" "$dispatch_job" "for attempt in 1 2 3; do"
check_fixed "exhausted dispatch retries fail clearly" "$dispatch_job" "GitOps dispatch failed after 3 attempts"

action_count=0
while IFS= read -r action_line; do
  action_count=$((action_count + 1))
  if [[ ! "$action_line" =~ @([0-9a-f]{40})([[:space:]]|$) ]]; then
    printf 'not ok - action is pinned to a full commit SHA (%s)\n' "$action_line"
    failures=$((failures + 1))
  fi
done < <(grep -E '^[[:space:]]*-[[:space:]]+uses:' "$workflow")

if ((action_count == 0)); then
  printf 'not ok - workflow contains pinned actions\n'
  failures=$((failures + 1))
else
  printf 'ok - checked %d pinned action references\n' "$action_count"
fi

if ((failures > 0)); then
  printf 'FAILED: %d CI workflow contract check(s) failed\n' "$failures"
  exit 1
fi

printf 'PASS: CI workflow contract satisfied\n'
