// src/components/layout/Sidebar.tsx

import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  AlertOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      width={240}
      style={{minHeight: '100vh'}}
      theme="light"
    >
      <div className="h-16 flex items-center px-6 border-b border-[#f0f0f0]">
        <span className="text-2xl">🥟</span>
        <span className="ml-2 text-lg font-bold">
          찐빵 관리자
        </span>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        className="border-r-0 pt-4"
        items={[
          {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: '대시보드',
          },
          {
            key: '/reviews',
            icon: <FileTextOutlined />,
            label: '리뷰 관리',
          },
          {
            key: '/reports',
            icon: <AlertOutlined />,
            label: '신고 관리',
          },
          {
            key: '/certificates',
            icon: <SafetyCertificateOutlined />,
            label: '합격증 승인',
          },
        ]}
      />
    </Sider>
  );
}