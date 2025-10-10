import React from "react";

type NotificationOption = {
    label: string;
    name: string;
};

type NotificationCategory = {
    title: string;
    options: NotificationOption[];
};

const notificationSettings: NotificationCategory[] = [
    {
        title: "Activity",
        options: [
            {
                label: 'A member mentions you in an update using "@user"',
                name: "mention",
            },
            {
                label: "A member replies to an update or comment you've posted",
                name: "reply",
            },
        ],
    },
    {
        title: "Messages",
        options: [
            {
                label: "A member sends you a new message",
                name: "message",
            },
        ],
    },
    {
        title: "Friends",
        options: [
            {
                label: "A member sends you a friendship request",
                name: "friendRequest",
            },
            {
                label: "A member accepts your friendship request",
                name: "friendAccept",
            },
        ],
    },
    {
        title: "Groups",
        options: [
            {
                label: "A member invites you to join a group",
                name: "groupInvite",
            },
            {
                label: "Group information is updated",
                name: "groupUpdate",
            },
            {
                label: "You are promoted to a group administrator or moderator",
                name: "groupPromote",
            },
            {
                label:
                "A member requests to join a private group for which you are an admin",
                name: "groupRequest",
            },
            {
                label: "Your request to join a group has been approved or denied",
                name: "groupApproval",
            },
        ],
    },
];

const EmailNotifications: React.FC = () => {
    return (
        <form>
            <h2 className='fs-24 mb-16 text-color'>Email Notifications</h2>
            <p className='fs-14 pb-8 text-color lh-16 fw-normal'>Set your email notification preferences.</p>

            {notificationSettings.map((category) => (
                <div key={category.title}>
                    <h4 className='font-bold fs-16 mt-24 mb-12'>{category.title}</h4>
                    {category.options.map((option) => (
                        <div key={option.name} className='d-flex justify-between align-center mb-16 pb-8 border-bottom-gray'>
                            <span className='fs-14 text-color'>{option.label}</span>
                            <div className='d-flex gap-20px ml-20'>
                                <label className='d-flex align-center fs-14 gap-6px'>
                                    <input type="radio" name={option.name} defaultChecked />
                                    <span>Yes</span>
                                </label>
                                <label className='d-flex align-center fs-14 gap-6px'>
                                    <input type="radio" name={option.name} />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            <button type="submit" className='btn-gradient-purple text-white py-8 lh-16' style={{ width: "30%" }}>
                Save Changes
            </button>
        </form>
    );
};

export default EmailNotifications;
