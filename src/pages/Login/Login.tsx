import { LockOutlined } from '@ant-design/icons';
import { Alert, Button } from 'antd';
import { useSearchParams } from 'react-router-dom';

const ERROR_MESSAGES: Record<string, string> = {
  authentication_failed:
    '관리자 권한을 확인하지 못했습니다. Authentik 관리자 그룹을 확인해 주세요.',
};

export const Login = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');
  const loggedOut = searchParams.has('logout');

  const startLogin = () => {
    window.location.assign('/oauth2/authorization/authentik');
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f7ff] px-6 py-12">
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-[#f7aa56]/20 blur-3xl"
      />

      <section className="relative w-full max-w-[430px] rounded-[24px] border border-white/80 bg-white/95 px-9 py-10 shadow-[0_24px_70px_rgba(31,54,104,0.14)]">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-[0.08em] text-primary">
            JJINBBANG ADMIN
          </span>
          <h1 className="mt-5 text-[30px] font-black tracking-[-0.04em] text-text-primary">
            찐빵 관리자 로그인
          </h1>
          <p className="mt-3 leading-6 text-text-muted">
            찐빵 홈랩의 Authentik 계정으로 안전하게 로그인합니다.
          </p>
        </div>

        {error && (
          <Alert
            className="mb-5"
            type="error"
            showIcon
            title={ERROR_MESSAGES[error] ?? '로그인에 실패했습니다. 다시 시도해 주세요.'}
          />
        )}
        {loggedOut && (
          <Alert
            className="mb-5"
            type="success"
            showIcon
            title="안전하게 로그아웃되었습니다."
          />
        )}

        <Button
          type="primary"
          size="large"
          block
          icon={<LockOutlined />}
          onClick={startLogin}
          className="h-12! rounded-lg! font-bold!"
        >
          Authentik으로 로그인
        </Button>

        <p className="mt-5 text-center text-xs leading-5 text-text-disabled">
          계정 생성과 비밀번호·MFA 관리는 Authentik에서 진행합니다.
        </p>
      </section>
    </main>
  );
};

export default Login;
