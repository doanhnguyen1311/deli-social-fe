import React, { useState } from 'react';
import { Users, Tv, UserCheck, MonitorDot } from 'lucide-react';
import styles from './index.module.css';

interface HeaderProps {
  activeTab?: 'feeds' | 'people' | 'watch' | 'groups';
}

const Header: React.FC<HeaderProps> = ({ activeTab = 'feeds' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

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
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>V</div>
          </div>
          <div className={styles.brandInfo}>
            <h1 className={styles.brandName}>Deli Social</h1>
            <p className={styles.brandTagline}>Social Network</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.key} className={styles.navItem}>
                <button
                  className={`${styles.navButton} ${
                    currentTab === item.key ? styles.active : ''
                  }`}
                  onClick={() => setCurrentTab(item.key as typeof currentTab)}
                >
                  {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
                  <span className={styles.navLabel}>{item.label}</span>
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