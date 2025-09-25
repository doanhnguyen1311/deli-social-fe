import React, { useEffect, useRef, useState } from 'react';
import { EllipsisVertical, ThumbsUp, CornerUpLeft, MessageCircleMore } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { getAllPostByUserId } from '../../../api/authAPI';
import type { Post } from '../../../api/authAPI';
import styles from '../index.module.css';

// Reactions
import like from '../../../assets/imgs/like.jpg';
import love from '../../../assets/imgs/love.png';
import haha from '../../../assets/imgs/haha.jpg';
import care from '../../../assets/imgs/care.jpg';
import wow from '../../../assets/imgs/wow.jpg';
import sad from '../../../assets/imgs/sad.jpg';
import angry from '../../../assets/imgs/angry.jpg';

const reactions = [
  { name: "like", icon: like },
  { name: "love", icon: love },
  { name: "care", icon: care },
  { name: "haha", icon: haha },
  { name: "wow", icon: wow },
  { name: "sad", icon: sad },
  { name: "angry", icon: angry },
];

const Activity: React.FC = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setLoading] = useState(true);

  const [showMenu, setShowMenu] = useState<number | null>(null);

  const [isExpanded, setIsExpanded] = useState<number | null>(null);

  const [selectedReaction, setSelectedReaction] = useState<{ [key: number]: string | null }>({});

  const [showReactions, setShowReactions] = useState<number | null>(null);

  const [showShareMenu, setShowShareMenu] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const shareMenuRef = useRef<HTMLDivElement>(null);
  
  const timeoutRef = useRef<number | null>(null);

  // Gọi API lấy bài post
  useEffect(() => {
    if (!user?.id) return;
    getAllPostByUserId(user.id)
      .then(data => setPosts(data.content))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user?.id]);

  // Ẩn menu khi click bên ngoài
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
    const r = selectedReaction[postId]; // r: string | null | undefined
    return r ? r.charAt(0).toUpperCase() + r.slice(1) : "Like";
  };

  if (loading) return <p>Đang tải bài viết...</p>;

  return (
    <div className={styles.activity}>
      <ul className={styles.activity_list}>
        {posts.map(post => {
          const currentReaction = reactions.find(r => r.name === selectedReaction[post.id]);
          return (
            <li key={post.id} className={styles.activity_item}>
              <div className={styles.activity_avatar}>
                <img src={user?.profile.avatarUrl} alt="avatar" className={styles.item_avatar} />
              </div>
              <div className={styles.activity_content}>
                <div className={styles.activity_header}>
                  <div className={styles.post_meta}>
                    <p><span className='cursor-pointer'>{user?.username}</span> posted an update</p>
                    <div className={styles.date}>{new Date(post.createdAt).toLocaleString()}</div>
                  </div>
                  <div
                    className={styles.more_icon}
                    ref={menuRef}
                    onClick={() => setShowMenu(showMenu === post.id ? null : post.id)}
                  >
                    <EllipsisVertical size={16} />
                  </div>
                  {showMenu === post.id && (
                    <div className={styles.menu}>
                      <div className={`${styles.menu_item} ${styles.menu_first}`}>Mark as Favorite</div>
                      <div className={`${styles.menu_item} ${styles.menu_second}`}>Delete</div>
                    </div>
                  )}
                </div>

                <div className={styles.activity_inner}>
                  <div className={styles.activity_container}>
                    <div className={styles.activity_inner_text}>
                      <span>{post.content}</span>
                    </div>
                    {post.mediaList?.length > 0 && (
                      <ul className={styles.activity_media_list}>
                        {post.mediaList.map(media => (
                          <li key={media.mediaId} className={styles.media_list_item}>
                            <div className={styles.media_item_thumbnail}>
                              <img src={`https://com.delichat.online/media/${media.mediaId}`} alt="Media" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className={styles.activity_action}>
                  {/* Like */}
                  <div
                    className={`${styles.generic_button_reaction} ${styles.reactionWrapper}`}
                    onMouseEnter={() => handleMouseEnter(post.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      setSelectedReaction(prev => ({
                        ...prev,
                        [post.id]: prev[post.id] ? null : "like"
                      }));
                    }}
                  >
                    <div className="d-flex align-center gap-4px">
                      {selectedReaction[post.id] ? (
                        <img
                          src={currentReaction?.icon}
                          alt={selectedReaction[post.id] || ""}
                          className={styles.reaction_icon_selected}
                        />
                      ) : (
                        <ThumbsUp size={16} />
                      )}
                      <span>
                        {formatReactionLabel(post.id)}
                      </span>
                    </div>
                    {showReactions === post.id && (
                      <div className={styles.reaction_popup}>
                        {reactions.map(reaction => (
                          <img
                            key={reaction.name}
                            src={reaction.icon}
                            alt={reaction.name}
                            className={styles.reaction_icon}
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
                  <div className={styles.generic_button_comment}>
                    <div
                      className='d-flex align-center gap-4px'
                      onClick={() => setIsExpanded(isExpanded === post.id ? null : post.id)}
                    >
                      <span>Comment</span>
                      <span className={styles.comment_count}>{post.commentCount}</span>
                    </div>
                  </div>

                  {/* Share */}
                  <div
                    className={styles.generic_button_share}
                    onClick={() => setShowShareMenu(showShareMenu === post.id ? null : post.id)}
                    ref={shareMenuRef}
                  >
                    <span>Share</span>
                    {showShareMenu === post.id && (
                      <div className={styles.shareMenu}>
                        <div className={`${styles.menu_item} ${styles.menu_first} d-flex align-center gap-8px`}>
                          <CornerUpLeft size={16} />Share on Activity
                        </div>
                        <div className={`${styles.menu_item} ${styles.menu_second} d-flex align-center gap-8px`}>
                          <MessageCircleMore size={16} />Share on DeliChat
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comment Section */}
                {isExpanded === post.id && (
                  <div className={styles.expandedSection}>
                    <div className={styles.comment_editor}>
                      <div>
                        <img
                          src={user?.profile.avatarUrl}
                          alt="avatar"
                          className={styles.comment_avatar}
                        />
                      </div>
                      <div className={styles.comment}>
                        <input type="text" className={styles.comment_input} />
                        <div className={styles.buttons}>
                          <button className={styles.postBtn}>Post</button>
                          <button
                            className={styles.cancelBtn}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Activity;
