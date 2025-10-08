import React, { useState } from "react";
import Editor from "../Editor";
import Activity from "../Activity";
import type { FeedItem } from "../../../api/authAPI";

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<FeedItem[]>([]);

  const handleNewPost = (post: FeedItem) => {
    setPosts(prev => [post, ...prev]); // ✅ thêm bài mới lên đầu danh sách
  };

  return (
    <div>
      <Editor onNewPost={handleNewPost} />
      <Activity posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default FeedPage;
