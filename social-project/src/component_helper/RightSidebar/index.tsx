import React, { useState } from 'react';

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
    <div className="w-280 h-100vh bg-white d-flex flex-column">
      {/* Tab Navigation */}
      <div className="d-flex bg-purple-light p-4 mx-16 mt-12 mb-12 radius-8 gap-2px">
        <button
          className={`flex-1 py-8 px-12 text-gray fs-13 fw-medium cursor-pointer radius-6 text-center tab-button ${
            activeTab === 'newest' ? 'tab-active' : ''
          }`}
          onClick={() => setActiveTab('newest')}
        >
          Newest
        </button>
        <button
          className={`flex-1 py-8 px-12 text-gray fs-13 fw-medium cursor-pointer radius-6 text-center tab-button ${
            activeTab === 'active' ? 'tab-active' : ''
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button
          className={`flex-1 py-8 px-12 text-gray fs-13 fw-medium cursor-pointer radius-6 text-center tab-button ${
            activeTab === 'popular' ? 'tab-active' : ''
          }`}
          onClick={() => setActiveTab('popular')}
        >
          Popular
        </button>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto py-8 hide-scrollbar-thin">
        {users.map((user) => (
          <div key={user.id} className="d-flex align-center py-12 px-16 cursor-pointer hover-bg-light">
            <div className="w-40 h-40 mr-12">
              <img src={user.avatar} alt={user.name} className="w-100 h-100 radius-50 object-cover border-light" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="fs-14 fw-medium text-color mb-2 text-ellipsis">{user.name}</div>
              <div className="fs-12 text-gray">{user.lastActive}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;