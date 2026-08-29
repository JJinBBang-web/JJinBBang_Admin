// src/components/layout/Sidebar.tsx

import { Layout } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

interface NavItem {
  key: string;
  icon: string;
  label: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { key: '/dashboard', icon: '📊', label: '대시보드' },
  { key: '/reviews', icon: '📝', label: '리뷰 관리' },
  { key: '/reports', icon: '🚨', label: '신고 관리', badge: 3 },
  { key: '/certificates', icon: '🎓', label: '합격증 승인', badge: 3 },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      width={240}
      className="bg-white!"
      style={{ minHeight: '100vh', borderRight: '1px solid #D6D6D6' }}
      theme="light"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-[60px] items-center border-b border-border-light px-5">
          <span className="text-base font-extrabold text-text-primary">
            🥟 찐빵 어드민
          </span>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 py-3.5">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => navigate(item.key)}
                className={`flex w-full items-center gap-2.5 rounded-sm px-3 py-[11px] text-left transition-colors ${
                  isActive
                    ? 'bg-[#E8F0FF] text-primary'
                    : 'text-text-secondary hover:bg-bg-light'
                }`}
              >
                <span className={`w-[18px] text-center text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.icon}
                </span>
                <span className={`flex-1 text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
                {item.badge != null && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-[10px] bg-danger px-1.5 text-[11px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </Sider>
  );
};

export default Sidebar;
