import React, { useState } from "react";
import General from "./General";
import EmailNotifications from "./EmailNotifications";
import ProfileVisibilitySettings from "./ProfileVisibilitySettings";

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"general" | "email" | "visibility" | "invite">("general");

    return (
        <div className='bg-white box-shadow radius-24 py-16 px-16'>
            <div className='d-flex mb-24 gap-20px border-bottom-gray-200'>
                <div
                    className={`tab p-8 fs-14 fw-medium ${activeTab === "general" ? 'active' : ""}`}
                    onClick={() => setActiveTab("general")}
                >
                    General
                </div>
                <div
                    className={`tab p-8 fs-14 fw-medium ${activeTab === "email" ? 'active' : ""}`}
                    onClick={() => setActiveTab("email")}
                >
                    Email
                </div>
                <div
                    className={`tab p-8 fs-14 fw-medium ${activeTab === "visibility" ? 'active' : ""}`}
                    onClick={() => setActiveTab("visibility")}
                >
                    Profile Visibility
                </div>
            </div>

            {/* Nội dung của từng tab */}
            {activeTab === "general" && <General />}
            {activeTab === "email" && <EmailNotifications />}
            {activeTab === "visibility" && <ProfileVisibilitySettings />}
        </div>
    );
};

export default Settings;
