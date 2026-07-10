import { CERTIFICATE_SLA_HOURS } from './constants';

export function formatElapsed(elapsedHours: number) {
  const isOverdue = elapsedHours > CERTIFICATE_SLA_HOURS;
  return {
    label: isOverdue ? `${elapsedHours}시간 경과 ⚠️` : `${elapsedHours}시간 경과`,
    isOverdue,
  };
}

export function formatElapsedDetail(elapsedHours: number) {
  const isOverdue = elapsedHours > CERTIFICATE_SLA_HOURS;
  return {
    label: isOverdue
      ? `${elapsedHours}시간 경과 ⚠️ (SLA ${CERTIFICATE_SLA_HOURS}시간 초과)`
      : `${elapsedHours}시간 경과`,
    isOverdue,
  };
}
