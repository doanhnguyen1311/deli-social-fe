import React, { useEffect, useRef, useState } from 'react';
import { EllipsisVertical, ThumbsUp, CornerUpLeft, MessageCircleMore, MessageSquare, Share2, Bookmark } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { getAllPostByUserId } from '../../../api/authAPI';
import type { Post } from '../../../api/authAPI';

// Reactions
import like from '../../../assets/imgs/like.jpg';
import love from '../../../assets/imgs/love.png';
import haha from '../../../assets/imgs/haha.jpg';
import care from '../../../assets/imgs/care.jpg';
import wow from '../../../assets/imgs/wow.jpg';
import sad from '../../../assets/imgs/sad.jpg';
import angry from '../../../assets/imgs/angry.jpg';
import axios from 'axios';
import { BaseURL } from '../../../api';
import Loading from '../../../component_helper/Loading';
import { avatarDefault } from '../../../component_helper/default-avt';

const reactions = [
  { name: "like",  icon: like,  color: "text-blue-500" },
  { name: "love",  icon: love,  color: "text-red-500" },
  { name: "care",  icon: care,  color: "text-orange-500" },
  { name: "haha",  icon: haha,  color: "text-yellow-500" },
  { name: "wow",   icon: wow,   color: "text-purple-500" },
  { name: "sad",   icon: sad,   color: "text-gray-500" },
  { name: "angry", icon: angry, color: "text-red-700" },
];

// Mock data
const mockPosts: Post[] = [
  {
    id: 1,
    userId: "user-123",
    content: "Habitant morbi tristique senectus et netus et. Suspendisse sed nisi lacus sed viverra. Dolor morbi non arcu risus quis varius. #amazing #great #lifetime #uiux #machinelearning",
    mediaList: [
      {
        mediaId: "media-001",
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop"
      }
    ],
    likeCount: 12,
    commentCount: 25,
    visibility: "PUBLIC",
    createdAt: new Date(Date.now() - 2 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60000).toISOString()
  },
  {
    id: 2,
    userId: "user-123",
    content: "Just finished an amazing project! The team worked incredibly hard and the results are outstanding. Excited to share more details soon!",
    mediaList: [],
    likeCount: 45,
    commentCount: 12,
    visibility: "PUBLIC",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 3,
    userId: "user-123",
    content: "Beautiful sunset today. Nature never ceases to amaze me. #nature #photography #sunset",
    mediaList: [
      {
        mediaId: "media-002",
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop"
      }
    ],
    likeCount: 89,
    commentCount: 34,
    visibility: "PUBLIC",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString()
  }
];

const Activity: React.FC = () => {
  
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState<number | null>(null);

  const [isExpanded, setIsExpanded] = useState<number | null>(null);

  const [selectedReaction, setSelectedReaction] = useState<{ [key: number]: string | null }>({});

  const [showReactions, setShowReactions] = useState<number | null>(null);

  const [showShareMenu, setShowShareMenu] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const shareMenuRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    
    setLoading(true);
    getAllPostByUserId(user.id)
      .then(async (data) => {
        const postsWithUrls = await Promise.all(
          data.content.map(async (post: Post) => {
            if (post.mediaList?.length) {
              const mediaListWithUrl = await Promise.all(
                post.mediaList.map(async (m: any) => {
                  try {
                    const viewRes = await axios.get(`${BaseURL}/media/presign-view`, {
                      params: { mediaId: m.mediaId },
                      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    });
                    return { ...m, url: viewRes.data.data.viewUrl };
                  } catch (err) {
                    console.error("Error fetching media url:", err);
                    return m;
                  }
                })
              );
              return { ...post, mediaList: mediaListWithUrl };
            }
            return post;
          })
        );
        setPosts(postsWithUrls);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user?.id]);
  

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(null);
      }
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (postId: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowReactions(postId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => setShowReactions(null), 200);
  };

  const formatReactionLabel = (postId: number) => {
    const r = selectedReaction[postId];
    return r ? r.charAt(0).toUpperCase() + r.slice(1) : "Like";
  };

  if (loading) return <Loading />;

  return (
    <div className="pt-16">
      <div className="d-flex flex-column gap-24px">
        {posts.map(post => {
          const currentReaction = reactions.find(r => r.name === selectedReaction[post.id]);
          const reactionColor = currentReaction?.color ?? "text-gray-800";
          const mediaCount = post.mediaList.length;
          const containerClass = mediaCount === 1 ? 'post-media-container single-image' : 'post-media-container';
          
          return (
            <div key={post.id} className="bg-white radius-24 p-16 box-shadow">
              {/* Header */}
              <div className="d-flex justify-between align-center mb-16">
                <div className="d-flex align-center gap-12px">
                  <img 
                    src={user?.profile?.avatarUrl || avatarDefault} 
                    alt="avatar"
                    className="w-40 h-40 radius-50 object-cover"
                  />
                  <div className='d-flex flex-column gap-8px'>
                    <div className="fs-14 fw-semibold text-color">
                      {user?.profile?.fullName || "Người dùng DeliSocial"}
                    </div>
                    <div className="fs-12 text-gray">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })} at {new Date(post.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
                <div className="relative" ref={menuRef}>
                  <button
                    className="btn-icon radius-50 cursor-pointer"
                    onClick={() => setShowMenu(showMenu === post.id ? null : post.id)}
                  >
                    <EllipsisVertical size={16} />
                  </button>
                  {showMenu === post.id && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item">Mark as Favorite</div>
                      <div className="dropdown-item">Delete</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="mb-16">
                <p className="fs-14 text-color lh-16 mb-12">
                  {post.content}
                </p>
                {post.mediaList && post.mediaList.length > 0 && (
                  <div className={containerClass}>
                    {post.mediaList.map(media => (
                      <div key={media.mediaId} className="post-media-item radius-12 w-100">
                        {media.type === "IMAGE" && (
                          <img src={media.url} alt="Media" className="w-100 h-100 object-cover" />
                        )}
                        {media.type === "VIDEO" && (
                          <video controls className="w-100 h-auto radius-12">
                            <source src={media.url} type="video/mp4" />
                          </video>
                        )}
                        {media.type === "AUDIO" && (
                          <audio controls className="w-100 mt-8">
                            <source src={media.url} type="audio/mpeg" />
                          </audio>
                        )}
                        {media.type === "FILE" && (
                          <a href={media.url} target="_blank" rel="noopener noreferrer" className="file-link text-blue-500 underline">
                            📎 Download File
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="d-flex align-center justify-between py-12 border-top-light">
                {/* Like */}
                <div
                  className="post-action-button relative"
                  onMouseEnter={() => handleMouseEnter(post.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    setSelectedReaction(prev => ({
                      ...prev,
                      [post.id]: prev[post.id] ? null : "like"
                    }));
                  }}
                >
                  <div className="d-flex align-center gap-8px">
                    {currentReaction ? (
                      <img src={currentReaction.icon} alt={currentReaction.name} className="w-18 h-18" />
                    ) : (
                      <ThumbsUp size={18} />
                    )}
                    <span className={`fs-14 ${reactionColor}`}>
                      {post.likeCount} {formatReactionLabel(post.id)}
                    </span>
                  </div>
                  {showReactions === post.id && (
                    <div className="reaction-popup">
                      {reactions.map(reaction => (
                        <img
                          key={reaction.name}
                          src={reaction.icon}
                          alt={reaction.name}
                          className="reaction-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReaction(prev => ({
                              ...prev,
                              [post.id]: prev[post.id] === reaction.name ? null : reaction.name
                            }));
                            setShowReactions(null);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Comment */}
                <div
                  className="post-action-button"
                  onClick={() => setIsExpanded(isExpanded === post.id ? null : post.id)}
                >
                  <div className="d-flex align-center gap-8px">
                    <MessageSquare size={18} />
                    <span className="fs-14">{post.commentCount} Comments</span>
                  </div>
                </div>

                {/* Share */}
                <div className="relative" ref={shareMenuRef}>
                  <div
                    className="post-action-button"
                    onClick={() => setShowShareMenu(showShareMenu === post.id ? null : post.id)}
                  >
                    <div className="d-flex align-center gap-8px">
                      <Share2 size={18} />
                      <span className="fs-14">187 Share</span>
                    </div>
                  </div>
                  {showShareMenu === post.id && (
                    <div className="share-menu">
                      <div className="dropdown-item d-flex align-center gap-8px">
                        <CornerUpLeft size={16} />
                        Share on Activity
                      </div>
                      <div className="dropdown-item d-flex align-center gap-8px">
                        <MessageCircleMore size={16} />
                        Share on DeliChat
                      </div>
                    </div>
                  )}
                </div>

                {/* Bookmark */}
                <button className="btn-icon cursor-pointer ml-auto">
                  <Bookmark size={18} />
                </button>
              </div>

              {/* Comment Section */}
              {isExpanded === post.id && (
                <div className="mt-16 pt-16 border-top-light">
                  <div className="d-flex gap-12px">
                    <img
                      src={user?.profile?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=30&h=30&fit=crop&crop=face"}
                      alt="avatar"
                      className="w-30 h-30 radius-50 object-cover"
                    />
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Write a comment..."
                        className="input-rounded w-100 py-12 px-16 border-light-gray mb-8"
                      />
                      <div className="d-flex gap-12px fs-12">
                        <button className="btn-gradient-purple text-white py-6 px-32 cursor-pointer">
                          Post
                        </button>
                        <button
                          className="btn-cancel text-purple cursor-pointer"
                          onClick={() => setIsExpanded(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activity;