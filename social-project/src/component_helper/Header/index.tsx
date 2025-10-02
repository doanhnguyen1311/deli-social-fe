import React, { useEffect, useRef, useState } from 'react';
import { Users, Tv, UserCheck, MonitorDot } from 'lucide-react';
import logo from '../../assets/imgs/logo.png'

interface HeaderProps {
  activeTab?: 'feeds' | 'people' | 'watch' | 'groups';
  scrollContainer?: React.RefObject<HTMLDivElement | null>; 
}

const Header: React.FC<HeaderProps> = ({ activeTab = 'feeds', scrollContainer }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const container = scrollContainer?.current ?? window; // fallback window
    if (!container) return;

    const handleScroll = () => {
      const currentScrollY =
        container instanceof Window ? window.scrollY : container.scrollTop;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainer]);

  const navItems = [
    {
      key: 'feeds',
      label: 'Feeds',
      icon: <MonitorDot size={16}/>
    },
    {
      key: 'people',
      label: 'People',
      icon: <Users size={16} />
    },
    {
      key: 'watch',
      label: 'Watch',
      icon: <Tv size={16} />
    },
    {
      key: 'groups',
      label: 'Groups',
      icon: <UserCheck size={16} />
    }
  ];

  return (
    <header className={`bg-white box-shadow h-64 py-8 px-16 radius-24 d-flex align-center justify-between sticky top-0 z-100 slide-toggle ${showHeader ? 'show' : 'hide'}`}>
      <div className="w-100 max-w-1200 mx-auto d-flex align-center justify-between">
        {/* Logo Section */}
        <div className="d-flex align-center gap-12px">
          <div className="d-flex align-center justify-center">
            <div className="text-white d-flex align-center justify-center radius-10">
              <img src={logo} alt='logo' className='w-40 h-40' />
            </div>
          </div>
          <div className="d-flex flex-column gap-2px">
            <h1 className="fs-18 fw-semibold text-color lh-12">Deli Social</h1>
            <p className="fs-12 text-gray lh-12">Social Network</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 d-flex justify-end max-w-500">
          <ul className="d-flex gap-8px list-none">
            {navItems.map((item) => (
              <li key={item.key} className="d-flex">
                <button
                  className={`nav-button d-flex flex-column align-center gap-6px py-8 px-16 text-gray fs-14 fw-medium cursor-pointer radius-16 ${
                    currentTab === item.key ? 'nav-button-active' : ''
                  }`}
                  onClick={() => setCurrentTab(item.key as typeof currentTab)}
                >
                  {item.icon && <span className="d-flex align-center justify-center">{item.icon}</span>}
                  <span className="fs-14 nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;