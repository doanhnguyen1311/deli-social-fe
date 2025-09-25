import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { BaseURL } from '../../../api';
import axios from "axios";
import styles from '../index.module.css';

interface FileType {
    name: string;
    type: string;
}

const Editor: React.FC = () => {
    
    const token = localStorage.getItem("token");

    const { user } = useAuth();

    const [isExpanded, setIsExpanded] = useState(false);

    const [content, setContent] = useState("");

    const [visibility, setVisibility] = useState("PUBLIC");

    const [files, setFiles] = useState<File[]>([]);

    const [newPost, setNewPost] = useState(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!files.length && !content.trim()) return;
    
        try {
            // 1️⃣ Tạo draft post trước
            const draftRes = await axios.post(
                `${BaseURL}/post/draft`,
                {
                    content,
                    visibility,
                    userId: user?.id,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const draftPost = draftRes.data.data; // chứa postId
            
            const mediaIds: any[] = [];
            const contentTypes: any[] = [];
            
            // 2️⃣ Upload tất cả file lên S3 bằng presigned URL
            await Promise.all(
                files.map(async (file: FileType) => {
                    const presignRes = await axios.post(
                        `${BaseURL}/media/presign-upload`,
                        null,
                        {
                            params: {
                                originalFilename: file.name,
                                contentType: file.type,
                                contextType: "POST",
                                userId: draftPost.userId,
                                contextId: draftPost.id, // gắn media vào postId
                            },
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                
                    const { mediaId, uploadUrl } = presignRes.data.data;
                    mediaIds.push(mediaId);
                    contentTypes.push(file.type);
                
                    await axios.put(uploadUrl, file, { headers: { "Content-Type": file.type } });
                })
            );
            
            // 3️⃣ Update draft post thành PUBLISHED
            const finalRes = await axios.patch(
                `${BaseURL}/post/${draftPost.id}`,
                mediaIds.map((id, idx) => ({
                    mediaId: id,
                    type: contentTypes[idx].startsWith("image/")
                        ? "IMAGE"
                        : contentTypes[idx].startsWith("video/")
                        ? "VIDEO"
                        : contentTypes[idx].startsWith("audio/")
                            ? "AUDIO"
                            : "FILE",
                })),
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            const createdPost = finalRes.data.data;
            
            // 4️⃣ Lấy presign view URL cho tất cả media
            if (createdPost.mediaList?.length) {
                const mediaListWithUrl = await Promise.all(
                    createdPost.mediaList.map(async (m: any) => {
                        const viewRes = await axios.get(`${BaseURL}/media/presign-view`, {
                            params: { mediaId: m.mediaId },
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        return { ...m, url: viewRes.data.data.viewUrl };
                    })
                );
                createdPost.mediaList = mediaListWithUrl;
            }
            
            setNewPost(createdPost);
            setContent("");
            setFiles([]);
            setVisibility("PUBLIC");
        } catch (err: any) {
            console.error("Error:", err.response?.data || err.message);
        }
    };

    return (
        <div className={styles.editor}>
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <img
                        src={user?.profile.avatarUrl}
                        alt="avatar"
                        className={styles.avatar}
                    />
                    <input
                        type="text"
                        placeholder="What's new, Joseph?"
                        className={styles.input}
                        value={content}
                        onFocus={() => setIsExpanded(true)}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
    
                {isExpanded && (
                    <div className={styles.expandedSection}>
                        <div className={styles.actions}>
                            <button className={styles.attachBtn}>
                                <Paperclip size={16}/> 
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
                                        setFiles((prev) => [...prev, ...selectedFiles]);
                                    }}
                                />
                            </button>
                            <div className={styles.bottomRow}>
                                <select 
                                    className={styles.select}
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value)}
                                >
                                    <option value="PUBLIC">Public</option>
                                    <option value="FRIEND_ONLY">Friends</option>
                                    <option value="PRIVATE">Private</option>
                                </select>
                                <div className={styles.buttons}>
                                    <button
                                        className={styles.cancelBtn}
                                        onClick={() => setIsExpanded(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button className={styles.postBtn} type='submit'>
                                        Post Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Editor;