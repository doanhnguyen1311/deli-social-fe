import React, { useState, useMemo } from "react";
import { MessageCircleWarning, UploadCloud, X, Save, UserRound } from "lucide-react"; 
// BaseURL giả định được import từ file cấu hình API của bạn
import { BaseURL } from "../../../api";

// Enum ContextType phải khớp với enum Java của bạn
const ContextType = {
    NONE: 'NONE',
    POST: 'POST',
    CONVERSATION: 'CONVERSATION',
} as const;

// Hàm giả định lấy Token (Thay thế bằng logic thực tế của bạn: Context/Redux/etc.)
const getAuthToken = (): string => {
    return localStorage.getItem('authToken') || ''; 
};

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
            alert("Vui lòng chọn một file ảnh hợp lệ (JPG/PNG/GIF).");
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
            
            if (!updateResponse.ok || !updateData.success) {
                throw new Error(`Lỗi cập nhật hồ sơ: ${updateData.message || 'Không thể lưu mediaId.'}`);
            }

            alert('Cập nhật Ảnh đại diện thành công! 🎉');
            handleRemoveImage();

        } catch (error) {
            console.error("Lỗi quá trình upload:", error);
            alert(`Lỗi: Không thể cập nhật ảnh đại diện. Vui lòng thử lại.`);
        } finally {
            setIsUploading(false);
        }
    };

    // --- RENDER UI ---
    
    const renderDropzoneContent = useMemo(() => {
        if (imagePreviewUrl && imageFile) {
            return (
                <div className="d-flex flex-column align-items-center w-100 py-2">
                    
                    <div className="position-relative mb-3 avatar-200">
                        <img 
                            src={imagePreviewUrl} 
                            alt="Ảnh đại diện" 
                            className="rounded-circle w-100 h-100 object-fit-cover border border-primary border-3 shadow-sm"
                        />
                        <button 
                            onClick={handleRemoveImage} 
                            className="btn btn-danger p-1 position-absolute top-0 end-0 rounded-circle"
                            title="Xóa ảnh"
                            style={{ transform: 'translate(25%, -25%)' }} 
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="text-center mt-3" style={{ fontSize: '14px' }}>
                        <p className="fw-bold mb-1">{imageFile.name}</p>
                        <p className="text-muted mb-0">Kích thước: {(imageFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
            );
        }

        return (
            <>
                <UserRound size={60} className="text-primary mb-2" />
                <p className="fw-bold mb-1">Kéo thả ảnh vào đây</p>
                <p className="text-muted mb-3">Dạng: JPG/PNG, Max: 5MB</p>
                
                <label htmlFor="file-upload" className="btn btn-primary d-flex align-items-center">
                    <UploadCloud size={18} className="me-2" /> Chọn file
                </label>
                
                <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={handleFileSelect}
                    className="d-none"
                />
            </>
        );
    }, [imagePreviewUrl, imageFile]);

    return (
        <div className="card p-4 mx-auto shadow-lg" style={{ maxWidth: '600px' }}>
            <h2 className='fs-4 mb-3 text-dark'>Cập nhật Ảnh đại diện</h2>

            <div className='alert alert-info d-flex align-items-center gap-2' role="alert">
                <MessageCircleWarning size={20} />
                <p className="m-0">Ảnh đại diện sẽ hiển thị ở hồ sơ và các bình luận của bạn.</p>
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
                    className="btn btn-success d-flex align-items-center justify-content-center w-100 py-2 gap-2"
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