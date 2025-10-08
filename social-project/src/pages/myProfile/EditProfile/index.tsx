import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { BaseURL } from "../../../api";
import { updateProfile } from "../../../api/authAPI";
import { ToastContainer, toast } from 'react-toastify';

interface Province {
    id: number;
    code: string;
    name: string;
}

const EditProfile: React.FC = () => {
    const { user } = useAuth();

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>("");

    const [fullName, setFullName] = useState<string>(user?.profile.fullName || "");
    const [gender, setGender] = useState<string>(user?.profile.gender || "");
    const [day, setDay] = useState<number | null>(null);
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<number | null>(null);
    
    // Fetch provinces
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await fetch(`${BaseURL}/provinces`);
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    setProvinces(data.data);
                }
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        };
        fetchProvinces();
    }, []);

    // Set user data
    useEffect(() => {
        if (user?.profile) {
            setFullName(user.profile.fullName || "");
            setGender(user.profile.gender || "");
        }

        if (user?.province?.name) {
            setSelectedProvince(user.profile.location);
        }

        if (user?.profile.birthday) {
            const dateObj = new Date(user.profile.birthday);
            setDay(dateObj.getDate());
            setMonth(dateObj.toLocaleString("en-US", { month: "long" }));
            setYear(dateObj.getFullYear());
        }
    }, [user]);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    // 🟣 Gọi hàm updateProfile()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // format ngày sinh
        let formattedBirthday: string | null = null;
        if (day && month && year) {
            const monthIndex = months.indexOf(month);
            const date = new Date(Number(year), monthIndex, Number(day));
            formattedBirthday = date.toISOString().split("T")[0];
        }

        // Chuẩn bị data
        const data = {
            fullName: fullName || null,
            avatarUrl: user.profile.avatarUrl || null,
            coverPhotoUrl: user.profile.coverPhotoUrl || null,
            bio: user.profile.bio || null,
            gender: gender || null,
            birthday: formattedBirthday,
            location: selectedProvince || null,
            website: user.profile.website || null,
        };

        try {
            const res = await updateProfile(user.id, data);
            if (res.success) {
                toast.success("Cập nhật hồ sơ thành công!");
                console.log("New profile:", res.data);
            }
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error("Cập nhật thất bại");
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="fs-24 mb-12 text-color">Edit Profile</h2>
            <h4 className="fs-16 text-color">Editing "Base" Profile Group</h4>
            <hr className="divider" />

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-20px">
                {/* Name */}
                <div className="d-flex flex-column relative">
                    <div className="d-flex mb-16">
                        <label className="w-32per fs-16 font-bold mt-8 pr-16 text-right">
                            Name <span className="fw-normal ml-4 fs-12 text-gray">(required)</span>
                        </label>
                        <div className="w-100">
                            <input
                                type="text"
                                className="w-90per fs-14 h-40 bg-gray-500 px-16 py-6 lh-16 text-color radius-24"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <div className="fs-13 mt-6 text-color">
                                This field may be seen by: <strong>Everyone</strong>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="d-flex flex-column relative">
                    <div className="d-flex mb-16">
                        <label className="w-32per fs-16 font-bold mt-8 pr-16 text-right">
                            Date of Birth <span className="fw-normal ml-4 fs-12 text-gray">(required)</span>
                        </label>
                        <div className="w-100">
                            <div className="d-flex gap-10px">
                                <select className="select" value={day || ""} onChange={(e) => setDay(Number(e.target.value))}>
                                    <option value="">Day</option>
                                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                <select className="select" value={month} onChange={(e) => setMonth(e.target.value)}>
                                    <option value="">Month</option>
                                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                                <select className="select" value={year || ""} onChange={(e) => setYear(Number(e.target.value))}>
                                    <option value="">Year</option>
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                            <div className="fs-13 mt-6 text-color">
                                This field may be seen by: <strong>Only Me</strong>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sex */}
                <div className="d-flex flex-column relative">
                    <div className="d-flex mb-16">
                        <label className="w-32per fs-16 font-bold mt-8 pr-16 text-right" style={{ marginTop: "6px" }}>
                            Sex <span className="fw-normal ml-4 fs-12 text-gray">(required)</span>
                        </label>
                        <div className="w-100">
                            <div className="d-flex gap-20px fs-14">
                                <label>
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="male"
                                        checked={gender === "male"}
                                        onChange={() => setGender("male")}
                                    /> Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={() => setGender("female")}
                                    /> Female
                                </label>
                            </div>
                            <div className="fs-13 mt-6 text-color">
                                This field may be seen by: <strong>Only Me</strong>
                            </div>
                        </div>
                    </div>
                </div>

                {/* City */}
                <div className="d-flex flex-column relative">
                    <div className="d-flex mb-16">
                        <label className="w-32per fs-16 font-bold mt-8 pr-16 text-right">
                            City <span className="fw-normal ml-4 fs-12 text-gray">(required)</span>
                        </label>
                        <div className="w-100">
                            <select
                                className="w-90per fs-14 h-40 bg-gray-500 px-16 py-6 lh-16 text-color radius-24 cursor-pointer border-none"
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                            >
                                <option value="">Select a city</option>
                                {provinces.map(province => (
                                    <option key={province.id} value={province.name}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                            <div className="fs-13 mt-6 text-color">
                                This field may be seen by: <strong>Only Me</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-50per mx-auto btn-gradient-purple text-white py-8 cursor-pointer radius-24">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
