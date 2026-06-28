// src/components/layout/Header.tsx

import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const PAGE_TITLE: Record<string, string> = {
  '/dashboard': '대시보드',
  '/reviews': '리뷰 관리',
  '/reports': '신고 관리',
  '/certificates': '합격증 승인',
};

export const Header = () => {
  const location = useLocation();

  const title = PAGE_TITLE[location.pathname] ?? '찐빵 어드민';

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
      <div className="text-[13px] text-text-disabled">
        마지막 데이터 갱신: 오늘 06:00
      </div>
    </AntHeader>
  );
};

export default Header;
