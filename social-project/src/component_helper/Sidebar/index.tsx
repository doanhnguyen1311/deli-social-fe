import React, { useState } from 'react';
import { Phone, Mail, Globe, ExternalLink, MoreHorizontal } from 'lucide-react';
import avatar from '../../assets/imgs/tindepchai.jpg';
import styles from './index.module.css';

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
    <div className={styles.sidebar}>
      {/* Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarContainer}>
            <img src={userData.avatar} alt={userData.name} className={styles.avatar} />
            {userData.isOnline && <div className={styles.onlineIndicator}></div>}
          </div>
          <h2 className={styles.userName}>{userData.name}</h2>
          <p className={styles.username}>{userData.username}</p>
          <p className={styles.location}>{userData.location}</p>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{userData.posts}</span>
            <span className={styles.statLabel}>Posts</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{userData.followers}</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{userData.following}</span>
            <span className={styles.statLabel}>Following</span>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>About Me</h3>
          <button className={styles.moreButton}>
            <MoreHorizontal size={16} />
          </button>
        </div>
        <div className={styles.bioContainer}>
          <p className={styles.bio}>
            {showFullBio ? userData.bio : `${userData.bio.substring(0, 120)}...`}
          </p>
          <button 
            className={styles.readMoreButton}
            onClick={() => setShowFullBio(!showFullBio)}
          >
            {showFullBio ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>

      {/* Story Highlights */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>My Story Highlights</h3>
        <div className={styles.storyGrid}>
          {storyHighlights.map((story) => (
            <div key={story.id} className={styles.storyItem}>
              <div className={styles.storyImage}>
                <img src={story.image} alt={story.label} />
              </div>
              <span className={styles.storyLabel}>{story.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Contact Information</h3>
        <div className={styles.contactList}>
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>
              <Phone size={16} />
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>Phone Number</span>
              <span className={styles.contactValue}>{userData.phone}</span>
            </div>
            <button className={styles.contactAction}>
              <ExternalLink size={16} />
            </button>
          </div>
          
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>
              <Mail size={16} />
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>Email Address</span>
              <span className={styles.contactValue}>{userData.email}</span>
            </div>
            <button className={styles.contactAction}>
              <ExternalLink size={16} />
            </button>
          </div>
          
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>
              <Globe size={16} />
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>Website</span>
              <span className={styles.contactValue}>{userData.website}</span>
            </div>
            <button className={styles.contactAction}>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;