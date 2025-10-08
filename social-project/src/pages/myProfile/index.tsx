import React, { useState } from "react";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";
import ChangePhoto from "./ChangePhoto";
import ChangeCover from "./ChangeCover";

const MyProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"view" | "edit" | "photo" | "cover">("view");

    return (
        <div className='bg-white radius-24 p-16 box-shadow'>
            <div className='border-bottom-gray-200 d-flex mb-24 gap-20px'>
                <div
                    className={`tab p-8 fs-14 fw-semibold ${activeTab === "view" ? 'active' : ""}`}
                    onClick={() => setActiveTab("view")}
                >
                    View
                </div>
                <div
                    className={`tab p-8 fs-14 fw-semibold ${activeTab === "edit" ? 'active' : ""}`}
                    onClick={() => setActiveTab("edit")}
                >
                    Edit
                </div>
                <div
                    className={`tab p-8 fs-14 fw-semibold ${activeTab === "photo" ? 'active' : ""}`}
                    onClick={() => setActiveTab("photo")}
                >
                    Change Profile Photo
                </div>
                <div
                    className={`tab p-8 fs-14 fw-semibold ${activeTab === "cover" ? 'active' : ""}`}
                    onClick={() => setActiveTab("cover")}
                >
                    Change Cover Image
                </div>
            </div>

            {/* Nội dung của từng tab */}
            {activeTab === "view" && <ViewProfile />}
            {activeTab === "edit" && <EditProfile />}
            {activeTab === "photo" && <ChangePhoto />}
            {activeTab === "cover" && <ChangeCover />}
        </div>
    );
};

export default MyProfile;
