import React, { useState, useMemo } from "react";
import { MessageCircleWarning, UploadCloud, X, Save, UserRound, ImagePlus } from "lucide-react";
import { BaseURL } from "../../../api";
import { ToastContainer, toast } from 'react-toastify';

// Enum ContextType phải khớp với enum Java của bạn
const ContextType = {
    NONE: 'NONE',
    POST: 'POST',
    CONVERSATION: 'CONVERSATION',
} as const;

// Hàm phụ trợ để xác định MediaType
const getMediaType = (contentType: string): string => {
    if (contentType.startsWith("image/")) return 'IMAGE';
    if (contentType.startsWith("video/")) return 'VIDEO';
    if (contentType.startsWith("audio/")) return 'AUDIO';
    if (contentType.startsWith("application/")) return 'FILE';
    return 'NONE';
};

const ChangePhoto: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    // --- LOGIC XỬ LÝ FILE & UI ---
    
    const handleFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
            setImageFile(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        } else {
            toast.warning("Vui lòng chọn một file ảnh hợp lệ (JPG/PNG/GIF).");
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            handleFile(file);
            event.target.value = '';
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.classList.add('dropzone-hover');
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.currentTarget.classList.remove('dropzone-hover');
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.classList.remove('dropzone-hover');
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
            setImagePreviewUrl(null);
        }
    };

    // --- LOGIC UPLOAD 3 BƯỚC ĐÃ TÍCH HỢP API ---
    
    const handleUpload = async () => {
        if (!imageFile) return;

        setIsUploading(true);
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Lỗi: Không tìm thấy token xác thực.");
            setIsUploading(false);
            return;
        }

        let mediaId = ''; 

        try {
            // BƯỚC 1: GỌI /presign-upload (Lấy URL upload S3)
            const filename = encodeURIComponent(imageFile.name);
            const contentType = encodeURIComponent(imageFile.type);
            
            // contextId= là rỗng vì contextType là NONE
            const presignUrl = `${BaseURL}/media/presign-upload?originalFilename=${filename}&contentType=${contentType}&contextType=${ContextType.NONE}&contextId=&userId=`;
            
            const presignResponse = await fetch(presignUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                },
            });
            
            const presignData = await presignResponse.json();
            
            if (!presignResponse.ok || !presignData.success) {
                throw new Error(`Lỗi Presign: ${presignData.message || 'Không thể tạo URL upload.'}`);
            }

            const { uploadUrl, mediaId: newMediaId } = presignData.data;
            mediaId = newMediaId;

            // BƯỚC 2: TẢI FILE TRỰC TIẾP LÊN S3 bằng URL đã ký (PUT Request)
            const s3UploadResponse = await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': imageFile.type, // Phải khớp với Content-Type đã ký
                },
                body: imageFile, 
            });

            if (!s3UploadResponse.ok) {
                throw new Error("Lỗi tải file lên S3. Mã trạng thái: " + s3UploadResponse.status);
            }

            // BƯỚC 3: GỌI API CẬP NHẬT PROFILE (Gửi MediaResponse)
            const updateProfileUrl = `${BaseURL}/accounts/avatar`; 
            
            // Body phải khớp với MediaResponse: {mediaId: string, type: MediaType}
            const updateBody = { 
                mediaId: mediaId, 
                type: getMediaType(imageFile.type) // Đảm bảo gửi type = IMAGE
            }; 
            
            const updateResponse = await fetch(updateProfileUrl, {
                method: 'PATCH', // Phương thức PATCH
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Gửi JSON body
                },
                body: JSON.stringify(updateBody),
            });

            const updateData = await updateResponse.json();
            console.log(updateData);
            
            if (updateResponse.ok && updateData.success) {
                toast.success("Cập nhật ảnh đại diện thành công!");
                handleRemoveImage();
            }
            
            if (!updateResponse.ok || !updateData.success) {
                throw new Error(`Lỗi cập nhật hồ sơ: ${updateData.message || 'Không thể lưu mediaId.'}`);
            }

        } catch (error) {
            console.error("Lỗi quá trình upload:", error);
            toast.error("Không thể cập nhật ảnh đại diện. Vui lòng thử lại.");
        } finally {
            setIsUploading(false);
        }
    };

    // --- RENDER UI ---
    
    const renderDropzoneContent = useMemo(() => {
        if (imagePreviewUrl && imageFile) {
            return (
                <div className="d-flex flex-column align-items-center w-100 py-2">
                    
                    <div className="position-relative mb-3 avatar-200 hover-container">
                        <img 
                            src={imagePreviewUrl} 
                            alt="Ảnh đại diện" 
                            className="w-100 h-100 rounded-circle object-fit-cover border border-primary border-3 shadow-sm"
                        />
                        {/* Overlay hiển thị khi hover */}
                        <div className="hover-overlay rounded-circle d-flex justify-content-center align-items-center gap-2">
                            <label htmlFor="file-reupload" className="btn btn-light btn-sm d-flex align-items-center gap-1 cursor-pointer">
                                <ImagePlus size={16} /> Đổi ảnh
                            </label>
                            <input
                                id="file-reupload"
                                type="file"
                                accept="image/jpeg, image/png, image/gif"
                                onChange={handleFileSelect}
                                className="d-none"
                            />
                            <button onClick={handleRemoveImage} className="btn btn-danger btn-sm d-flex align-items-center gap-1">
                                <X size={16} /> Hủy
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-3" style={{ fontSize: '14px' }}>
                        <p className="fw-bold mb-1">{imageFile.name}</p>
                        <p className="text-muted mb-0">Kích thước: {(imageFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-100 radius-12 p-40 text-center text-color border-dash-gray">
                <UserRound size={60} className="text-primary mb-2" />
                <p className="fw-bold mb-2">Drop your file here</p>
                <p className="text-muted">Require: JPG/PNG, Max: 5MB</p>
                
                <label htmlFor="file-upload" className="btn-gradient-purple py-12 px-32 text-white mt-16 cursor-pointer">
                    <UploadCloud size={18} className="me-2" /> Select your file
                </label>
                
                <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={handleFileSelect}
                    className="d-none"
                />
            </div>
        );
    }, [imagePreviewUrl, imageFile]);

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className='fs-24 mb-12 text-color'>Change Profile Photo</h2>

            <div className='d-flex align-center gap-8px bg-white p-24 my-16 relative box-shadow radius-12 border-top-primary' role="alert">
                <MessageCircleWarning size={16} className="text-purple" />
                <p className="fs-14 fw-normal lh-16 text-color">Ảnh đại diện sẽ hiển thị ở hồ sơ và các bình luận của bạn.</p>
            </div>

            <div
                className="dropzone-style d-flex flex-column align-items-center justify-content-center p-4 mb-3 text-center" 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => {
                    if (!imageFile) {
                        document.getElementById('file-upload')?.click();
                    }
                }}
            >
                {renderDropzoneContent}
            </div>

            {imageFile && (
                <button 
                    onClick={handleUpload} 
                    disabled={isUploading}
                    className="btn-gradient-purple d-flex align-items-center justify-content-center w-50 mx-auto py-12 gap-2 text-white"
                >
                    {isUploading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Đang tải lên...
                        </>
                    ) : (
                        <>
                            <Save size={20} /> Lưu & Cập nhật
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export default ChangePhoto;