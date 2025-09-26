import React, { useState } from 'react';
import styles from './index.module.css';

interface User {
  id: number;
  name: string;
  avatar: string;
  lastActive: string;
}

const RightSideBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'newest' | 'active' | 'popular'>('newest');

  // Dữ liệu mẫu cho danh sách người dùng
  const users: User[] = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: 'David Thompson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    lastActive: '2 min ago'
  }));

  return (
    <div className={styles.rightSideBar}>
      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tab} ${activeTab === 'newest' ? styles.active : ''}`}
          onClick={() => setActiveTab('newest')}
        >
          Newest
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'active' ? styles.active : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'popular' ? styles.active : ''}`}
          onClick={() => setActiveTab('popular')}
        >
          Popular
        </button>
      </div>

      {/* User List */}
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.userItem}>
            <div className={styles.avatar}>
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.lastActive}>{user.lastActive}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;