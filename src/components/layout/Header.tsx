// src/components/layout/Header.tsx

import { LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, message } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { submitLogout } from '../../api/auth';
import { useAuthStore } from '../../store/useAuthStore';

const { Header: AntHeader } = Layout;

const PAGE_TITLE: Record<string, string> = {
  '/dashboard': '대시보드',
  '/reviews': '리뷰 관리',
  '/reports': '신고 관리',
  '/certificates': '합격증 승인',
};

export const Header = () => {
  const location = useLocation();
  const admin = useAuthStore((state) => state.admin);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const title = PAGE_TITLE[location.pathname] ?? '찐빵 어드민';

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await submitLogout();
    } catch {
      message.error('로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      setIsLoggingOut(false);
    }
  };

  return (
    <AntHeader
      style={{
        background: '#fff',
        paddingInline: 28,
        height: 60,
        lineHeight: '60px',
        borderBottom: '1px solid #D6D6D6',
      }}
      className="flex items-center justify-between"
    >
      <h1 className="!mb-0 text-lg font-extrabold tracking-[-0.01em] text-text-primary">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        <div className="text-right leading-5">
          <div className="text-[13px] font-bold text-text-secondary">
            {admin?.displayName ?? admin?.username ?? '관리자'}
          </div>
          {admin?.email && (
            <div className="text-[11px] text-text-disabled">{admin.email}</div>
          )}
        </div>
        <Button
          icon={<LogoutOutlined />}
          loading={isLoggingOut}
          onClick={logout}
        >
          로그아웃
        </Button>
      </div>
    </AntHeader>
  );
};

export default Header;
