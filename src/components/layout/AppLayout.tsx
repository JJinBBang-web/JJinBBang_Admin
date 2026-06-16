// src/components/layout/AppLayout.tsx

import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const { Content } = Layout;

export const AppLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout>
        <Header />
        <Content className="bg-gray-50 p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;