import React, { useState } from "react";
import { MessageCircleWarning, EyeOff, Eye } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import { BaseURL } from "../../../api";

const General: React.FC = () => {
    const { user } = useAuth();

    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Hàm tạo mật khẩu ngẫu nhiên
    const generatePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setNewPassword(password);
    };

    // Hàm xóa mật khẩu
    const clearPassword = () => {
        setNewPassword("");
    };

    // Toggle hiện/ẩn mật khẩu
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    // Hàm đổi mật khẩu
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!oldPassword || !newPassword) {
            toast.warning("Please enter both your current and new passwords!");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.warning("Token not found. Please log in again!");
                return;
            }

            const response = await fetch(`${BaseURL}/accounts/password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Đổi mật khẩu thất bại!");
            }

            toast.success("Change password successful!");
            setOldPassword("");
            setNewPassword("");
        } catch (error: any) {
            console.error("Lỗi khi đổi mật khẩu:", error);
            toast.error(error.message || "An error occurred while changing the password!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className='fs-24 mb-16 text-color'>Email & Password</h2>
            <h4 className='fs-14 pb-8 text-color lh-16 fw-normal'>Update your email and or password.</h4>

            <form className='d-flex flex-column gap-20px' onSubmit={handleSubmit}>
                {/* Current Password */}
                <div className='d-flex flex-column relative'>
                    <div className='relative'>
                        <label className='text-color mt-12 mb-8 font-bold fs-16 d-block max-w-100per'>
                            Current Password{" "}
                            <span className='fw-normal fs-12 ml-4 text-gray'>
                                (required to update email or change current password)
                            </span>
                        </label>
                        <input
                            type="password"
                            className='w-100 fs-16 text-color lh-16 radius-24 py-8 px-16 bg-gray-500'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <div className='fs-14 fw-normal lh-16 text-color-secondary text-hover-underline'>Lost your password?</div>
                    </div>
                </div>

                {/* Account Email */}
                <div className='d-flex flex-column relative'>
                    <div className='relative'>
                        <label className='text-color mt-12 mb-8 font-bold fs-16 d-block max-w-100per'>Account Email</label>
                        <input
                            type="text"
                            className='w-100 fs-16 text-color lh-16 radius-24 py-8 px-16 bg-gray-500'
                            defaultValue={user?.email}
                            disabled
                        />
                    </div>
                </div>

                <div className='d-flex align-center gap-8px bg-white p-24 relative box-shadow radius-12 border-top-primary'>
                    <MessageCircleWarning
                        size={16}
                        style={{ color: "#8224e3" }}
                    />
                    <p>Click on the "Generate Password" button to change your password.</p>
                </div>

                <button
                    type="button"
                    className='w-25per btn-primary py-12'
                    onClick={generatePassword}
                >
                    Generate Password
                </button>

                <div className='d-flex flex-column relative'>
                    <div className='relative'>
                        <label className='text-color mt-12 mb-8 font-bold fs-16 d-block max-w-100per'>Add Your New Password</label>
                        <div className="d-flex align-center gap-8px">
                            <input
                                type={showPassword ? "text" : "password"}
                                className='w-25 fs-16 text-color lh-16 radius-24 py-8 px-16 bg-gray-500'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            {showPassword ? (
                                <Eye
                                    size={40}
                                    className='btn-primary border-primary radius-50 p-8 text-primary'
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: "pointer" }}
                                />
                            ) : (
                                <EyeOff
                                    size={40}
                                    className='btn-primary border-primary radius-50 p-8 text-primary'
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: "pointer" }}
                                />
                            )}
                            <button
                                type="button"
                                className='w-15per btn-primary py-12'
                                onClick={clearPassword}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-gradient-purple text-white py-8 lh-16"
                    style={{ width: "30%" }}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default General;
