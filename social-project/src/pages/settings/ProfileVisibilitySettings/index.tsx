import React, { useState } from "react";

const options = ["Everyone", "Only Me", "All Members", "My Friends"];

const defaultSettings = {
    name: "Everyone",
    PersonalInfo: "Only Me",
};

const ProfileVisibilitySettings: React.FC = () => {
    const [visibility, setVisibility] = useState(defaultSettings);

    const handleChange = (field: keyof typeof visibility, value: string) => {
        setVisibility((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <form>
            <h2 className='fs-24 mb-16 text-color'>Profile Visibility Settings</h2>
            <p className='fs-14 pb-8 text-color lh-16 fw-normal'>
                Select who may see your profile details.
            </p>

            <table className='w-100 mb-24'>
                <thead>
                    <tr>
                        <th className='text-left border-bottom-gray bg-white py-12 px-0 w-76per'>Base</th>
                        <th className='text-left border-bottom-gray bg-white py-12 px-0'>Visibility</th>
                    </tr>
                </thead>
                <tbody>
                <tr className='border-bottom-gray'>
                    <td className='py-14 px-0 fs-14 text-color bg-white'>Name</td>
                    <td className='py-14 px-0 fs-14 text-color bg-white'>Everyone</td>
                </tr>
                {Object.entries(visibility).map(([key, value]) => {
                    if (key === "name") return null;
                    return (
                    <tr key={key} className='border-bottom-gray'>
                        <td className='py-14 px-0 fs-14 text-color bg-white'>
                            {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (c) => c.toUpperCase())}
                        </td>
                        <td className='py-14 px-0 fs-14 text-color'>
                            <select
                                className='select'
                                value={value}
                                onChange={(e) =>
                                    handleChange(key as keyof typeof visibility, e.target.value)
                                }
                            >
                                {options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>

            <button type="submit" className='btn-gradient-purple text-white py-8 lh-16' style={{ width: "30%" }}>
                Save Changes
            </button>
        </form>
    );
};

export default ProfileVisibilitySettings;
