import React, { useState } from 'react';
import { Phone, Mail, Globe, ExternalLink, MoreHorizontal } from 'lucide-react';
import avatar from '../../assets/imgs/tindepchai.jpg';

interface StoryHighlight {
  id: string;
  image: string;
  label: string;
}

interface SidebarProps {
  user?: {
    name: string;
    username: string;
    location: string;
    avatar: string;
    isOnline: boolean;
    posts: number;
    followers: string;
    following: number;
    bio: string;
    phone: string;
    email: string;
    website: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  const defaultUser = {
    name: "X_AE.C-921",
    username: "@xtheobliterator",
    location: "Osaka, Japan 🇯🇵",
    avatar: avatar,
    isOnline: true,
    posts: 548,
    followers: "12.7K",
    following: 221,
    bio: "Hi there! 👋 I'm X-AE-A-18, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym.",
    phone: "+123 456 789 000",
    email: "hello@slothui.com",
    website: "www.slothui.com"
  };

  const userData = user || defaultUser;

  const storyHighlights: StoryHighlight[] = [
    { id: '1', image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=60&h=60&fit=crop', label: 'France' },
    { id: '2', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=60&h=60&fit=crop', label: 'Korea' },
    { id: '3', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=60&h=60&fit=crop', label: 'USA' },
  ];

  return (
    <div className="w-476 h-100vh overflow-y-auto bg-white p-16 d-flex flex-column hide-scrollbar">
      {/* Profile Card */}
      <div className="bg-white radius-16 p-24 text-center">
        <div className="mb-24">
          <div className="relative d-inline-block mb-16">
            <img src={userData.avatar} alt={userData.name} className="avatar-lg radius-50 object-cover box-shadow" />
            {userData.isOnline && <div className="status-badge"></div>}
          </div>
          <h2 className="fs-20 fw-semibold text-color mb-8">{userData.name}</h2>
          <p className="fs-14 text-gray mb-8">{userData.username}</p>
          <p className="fs-13 text-gray">{userData.location}</p>
        </div>

        {/* Stats */}
        <div className="d-flex justify-between pt-24 border-top-gray">
          <div className="d-flex flex-column align-center gap-4px">
            <span className="fs-20 fw-semibold text-color">{userData.posts}</span>
            <span className="fs-12 text-gray">POSTS</span>
          </div>
          <div className="d-flex flex-column align-center gap-4px">
            <span className="fs-20 fw-semibold text-color">{userData.followers}</span>
            <span className="fs-12 text-gray">FOLLOWERS</span>
          </div>
          <div className="d-flex flex-column align-center gap-4px">
            <span className="fs-20 fw-semibold text-color">{userData.following}</span>
            <span className="fs-12 text-gray">FOLLOWING</span>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="bg-white radius-12 p-24">
        <div className="d-flex justify-between align-center mb-16">
          <h3 className="fs-16 fw-semibold text-color">About Me</h3>
          <button className="btn-icon radius-50 cursor-pointer">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <div className="text-left">
          <p className="fs-14 text-color-secondary lh-16 mb-12 text-left">
            {showFullBio ? userData.bio : `${userData.bio.substring(0, 120)}...`}
          </p>
          <button 
            className="btn-link text-primary fw-medium fs-14 cursor-pointer"
            onClick={() => setShowFullBio(!showFullBio)}
          >
            {showFullBio ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>

      {/* Story Highlights */}
      <div className="bg-white radius-12 p-24">
        <h3 className="fs-16 fw-semibold text-color mb-16">My Story Highlights</h3>
        <div className="d-flex gap-16px overflow-x-auto py-8 hide-scrollbar">
          {storyHighlights.map((story) => (
            <div key={story.id} className="d-flex flex-column align-center gap-8px min-w-60">
              <div className="w-60 h-60 radius-50 overflow-hidden border-light hover-border-primary cursor-pointer">
                <img src={story.image} alt={story.label} className="w-100 h-100 object-cover" />
              </div>
              <span className="fs-12 text-gray text-center">{story.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white radius-12 p-24">
        <h3 className="fs-16 fw-semibold text-color mb-16">Contact Information</h3>
        <div className="d-flex flex-column gap-16px">
          <div className="d-flex align-center gap-12px p-12 radius-8 cursor-pointer hover-bg-gray">
            <div className="w-40 h-40 bg-gray radius-8 d-flex align-center justify-center">
              <Phone size={16} className="text-gray" />
            </div>
            <div className="flex-1">
              <span className="fs-12 text-gray fw-medium d-block">Phone Number</span>
              <span className="fs-14 text-color d-block mt-8">{userData.phone}</span>
            </div>
            <button className="btn-icon cursor-pointer">
              <ExternalLink size={16} />
            </button>
          </div>
          
          <div className="d-flex align-center gap-12px p-12 radius-8 cursor-pointer hover-bg-gray">
            <div className="w-40 h-40 bg-gray radius-8 d-flex align-center justify-center">
              <Mail size={16} className="text-gray" />
            </div>
            <div className="flex-1">
              <span className="fs-12 text-gray fw-medium d-block">Email Address</span>
              <span className="fs-14 text-color d-block mt-8">{userData.email}</span>
            </div>
            <button className="btn-icon cursor-pointer">
              <ExternalLink size={16} />
            </button>
          </div>
          
          <div className="d-flex align-center gap-12px p-12 radius-8 cursor-pointer hover-bg-gray">
            <div className="w-40 h-40 bg-gray radius-8 d-flex align-center justify-center">
              <Globe size={16} className="text-gray" />
            </div>
            <div className="flex-1">
              <span className="fs-12 text-gray fw-medium d-block">Website</span>
              <span className="fs-14 text-color d-block mt-8">{userData.website}</span>
            </div>
            <button className="btn-icon cursor-pointer">
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;