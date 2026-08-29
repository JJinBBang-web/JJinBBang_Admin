import { Alert, Button, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCurrentAdmin } from '../../api/auth';
import { useAuthStore } from '../../store/useAuthStore';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export const AuthGuard = () => {
  const location = useLocation();
  const setAdmin = useAuthStore((state) => state.setAdmin);
  const clearAdmin = useAuthStore((state) => state.clearAdmin);
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    getCurrentAdmin()
      .then((admin) => {
        if (!active) return;
        setAdmin(admin);
        setStatus('authenticated');
      })
      .catch((error: unknown) => {
        if (!active) return;
        clearAdmin();
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setStatus('unauthenticated');
          return;
        }
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, [attempt, clearAdmin, setAdmin]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light">
        <Spin size="large" description="관리자 세션을 확인하고 있습니다." />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light px-6">
        <Alert
          type="error"
          showIcon
          title="로그인 상태를 확인하지 못했습니다."
          description="서버 연결을 확인한 뒤 다시 시도해 주세요."
          action={
            <Button size="small" onClick={() => {
              setStatus('loading');
              setAttempt((value) => value + 1);
            }}>
              다시 시도
            </Button>
          }
        />
      </div>
    );
  }

  return <Outlet />;
};

export default AuthGuard;
