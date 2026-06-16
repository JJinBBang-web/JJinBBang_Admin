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


export default function Header() {
  const location = useLocation();

  const title =
    PAGE_TITLE[location.pathname] ?? '찐빵 관리자';
  
  return (
    <AntHeader
      style={{
        background: '#fff',
        paddingInline: 24,
        borderBottom: '1px solid #f0f0f0',
      }}
      className="
        flex
        items-center
        justify-between
      "
    >
      <h1 className="text-lg !font-semibold !mb-0">
        {title}
      </h1>
      <div className="text-sm text-gray-500">
        마지막 갱신: 오늘 06:00
      </div>
    </AntHeader>
  );
}