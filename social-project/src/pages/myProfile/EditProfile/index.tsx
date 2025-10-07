import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import styles from "../index.module.css";

const EditProfile: React.FC = () => {
    const { user } = useAuth();
    console.log(user);
    
    // Giả sử userData.birthday = "2003-02-07"
    const birthday = user?.profile.birthday;
    let day: number = 0;
    let month: string = "";
    let year: number = 0;

    if (birthday) {
        const dateObj = new Date(birthday);
        day = dateObj.getDate();
        month = dateObj.toLocaleString("en-US", { month: "long" });
        year = dateObj.getFullYear();
    }

    // Mảng ngày, tháng, năm
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div>
            <h2 className='fs-24 mb-12 text-color'>Edit Profile</h2>
            <h4 className='fs-16 text-color'>Editing "Base" Profile Group</h4>
            <hr className='divider' />

            <form className='d-flex flex-column gap-20px'>
                {/* Name */}
                <div className='d-flex flex-column relative'>
                    <div className='d-flex mb-16'>
                        <label className='w-32per fs-16 font-bold mt-8 mt-8 pr-16 text-right'>Name <span className='fw-normal ml-4 fs-12 text-gray'>(required)</span></label>
                        <div className='w-100'>
                            <input type="text" className='w-90per h-40 bg-gray-500 px-16 py-6 lh-16 text-color radius-24' defaultValue={user?.profile.fullName} />
                            <div className='fs-13 mt-6 text-color'>This field may be seen by: <strong>Everyone</strong></div>
                        </div>
                    </div>
                </div>

                {/* Date of Birth */}
                <div className='d-flex flex-column relative'>
                    <div className='d-flex mb-16'>
                        <label className='w-32per fs-16 font-bold mt-8 pr-16 text-right'>Date of Birth <span className='fw-normal ml-4 fs-12 text-gray'>(required)</span></label>
                        <div className='w-100'>
                            <div className='d-flex gap-10px'>
                                <select className='select' defaultValue={day || ""}>
                                    <option value="">Day</option>
                                    {days.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
    
                                <select className='select' defaultValue={month || ""}>
                                    <option value="">Month</option>
                                    {months.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
    
                                <select className='select' defaultValue={year || ""}>
                                    <option value="">Year</option>
                                    {years.map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='fs-13 mt-6 text-color'>This field may be seen by: <strong>Only Me</strong></div>
                        </div>
                    </div>
                </div>

                {/* Sex */}
                <div className='d-flex flex-column relative'>
                    <div className='d-flex mb-16'>
                        <label className='w-32per fs-16 font-bold mt-8 pr-16 text-right' style={{marginTop: '6px'}}>Sex <span className='fw-normal ml-4 fs-12 text-gray'>(required)</span></label>
                        <div className='w-100'>
                            <div className='d-flex gap-20px'>
                                <label>
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="male"
                                        checked={user?.profile.gender === "male"}
                                    /> Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="female"
                                        checked={user?.profile.gender === "female"}
                                    /> Female
                                </label>
                            </div>
                            <div className='fs-13 mt-6 text-color'>This field may be seen by: <strong>Only Me</strong></div>
                        </div>
                    </div>
                </div>

                {/* City */}
                <div className='d-flex flex-column relative'>
                    <div className='d-flex mb-16'>
                        <label className='w-32per fs-16 font-bold mt-8 pr-16 text-right'>City <span className='fw-normal ml-4 fs-12 text-gray'>(required)</span></label>
                        <div className='w-100'>
                            <input type="text" className='w-90per h-40 bg-gray-500 px-16 py-6 lh-16 text-color radius-24' defaultValue={user?.profile.location} />
                            <div className='fs-13 mt-6 text-color'>This field may be seen by: <strong>Only Me</strong></div>
                        </div>
                    </div>
                </div>

                {/* Country */}
                <div className='d-flex flex-column relative'>
                    <div className='d-flex mb-16'>
                        <label className='w-32per fs-16 font-bold mt-8 pr-16 text-right'>Country <span className='fw-normal ml-4 fs-12 text-gray'>(required)</span></label>
                        <div className='w-100'>
                            <select className='select w-90per' defaultValue={user?.profile.website}>
                                <option>Armenia</option>
                            </select>
                            <div className='fs-13 mt-6 text-color'>This field may be seen by: <strong>Only Me</strong></div>
                        </div>
                    </div>
                </div>

                <button type="submit" className='w-50per mx-auto btn-gradient-purple text-white py-8 cursor-pointer radius-24'>Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
