import React, { useState } from 'react';
import { Paperclip, SquarePen, X } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { BaseURL } from '../../../api';
import axios from "axios";
import { avatarDefault } from '../../../component_helper/default-avt';

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
            const draftPost = draftRes.data.data;
            
            const mediaIds: any[] = [];
            const contentTypes: any[] = [];
            
            // 2️⃣ Upload tất cả file lên S3
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
                                contextId: draftPost.id,
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
        <div className="p-16 bg-white box-shadow radius-24">
            <form onSubmit={handleSubmit}>
                <div className="d-flex align-center gap-16px">
                    <img
                        src={user?.profile.avatarUrl || avatarDefault}
                        alt="avatar"
                        className="w-40 h-40 radius-50 object-cover"
                    />
                    <input
                        type="text"
                        placeholder="What's new, Joseph?"
                        className="input-rounded w-100 p-12 border-light-gray"
                        value={content}
                        onFocus={() => setIsExpanded(true)}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
    
                {isExpanded && (
                    <div className="mt-12">
                        <div className="pt-12 border-top-light">
                            <button className="btn-attach text-primary fs-14 d-flex align-center gap-8px cursor-pointer">
                                <Paperclip size={16}/> 
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
                                        setFiles((prev) => [...prev, ...selectedFiles]);
                                    }}
                                />
                                <p>Attach Media</p>
                            </button>

                            {/* File Preview List */}
                            {files.length > 0 && (
                                <div className="mt-16 d-flex flex-column gap-12px">
                                    {files.map((file, index) => (
                                        <div key={index} className="file-item d-flex align-center justify-between p-12 bg-gray radius-8">
                                            <div className="d-flex align-center gap-12px flex-1 overflow-hidden">
                                                <img 
                                                    src={URL.createObjectURL(file)} 
                                                    alt={file.name}
                                                    className="w-40 h-40 radius-8 object-cover"
                                                />
                                                <div className="flex-1 overflow-hidden">
                                                    <div className="fs-14 fw-medium text-color text-ellipsis">
                                                        {file.name}
                                                    </div>
                                                    <div className="fs-12 text-gray mt-8">
                                                        {(file.size / 1024).toFixed(0)} KB
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-center gap-8px">
                                                <button 
                                                    type="button"
                                                    className="btn-icon-small cursor-pointer"
                                                    onClick={() => {
                                                        // Edit functionality
                                                    }}
                                                >
                                                    <SquarePen size={16} />
                                                </button>
                                                <button 
                                                    type="button"
                                                    className="btn-icon-small cursor-pointer"
                                                    onClick={() => {
                                                        setFiles(files.filter((_, i) => i !== index));
                                                    }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="d-flex justify-between align-center mt-12 pt-12 border-top-light">
                                <select 
                                    className="select-rounded py-6 px-12 border-light-gray"
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value)}
                                >
                                    <option value="PUBLIC">Public</option>
                                    <option value="FRIEND_ONLY">Friends</option>
                                    <option value="PRIVATE">Private</option>
                                </select>
                                <div className="d-flex gap-12px fs-12 fw-normal">
                                    <button
                                        className="btn-cancel text-purple cursor-pointer"
                                        onClick={() => setIsExpanded(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button className="btn-gradient-purple text-white py-6 px-32 cursor-pointer" type='submit'>
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