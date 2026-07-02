// src/components/layout/AppLayout.tsx

import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const { Content } = Layout;

export const AppLayout = () => {
  return (
    <Layout className="min-h-screen bg-white">
      <Sidebar />
      <Layout className="!bg-white">
        <Header />
        <Content className="bg-white px-7 pb-9 pt-[26px]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
