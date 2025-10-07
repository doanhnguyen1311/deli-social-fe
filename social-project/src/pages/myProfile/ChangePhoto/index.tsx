import React from "react";
import { MessageCircleWarning } from "lucide-react";
import styles from "../index.module.css";

const ChangePhoto: React.FC = () => {

    return (
        <div className={styles.changePhoto}>
            {/* Title */}
            <h2 className='fs-24 mb-12 text-color'>Change Profile Photo</h2>

            {/* Info Box */}
            <div className='d-flex gap-8px bg-white p-24 my-16 relative box-shadow radius-12 border-top-primary'>
                <MessageCircleWarning size={40} className='text-purple mt-n5' />
                <p className='fs-14 fw-normal lh-16 text-color'>
                    Your profile photo will be used on your profile and throughout the site. If there is a{" "}
                    <a href="#" className='text-primary text-hover-underline'>Gravatar</a> associated with your account email we will use that, or you can upload an image from your computer.
                </p>
            </div>

            <div className='radius-12 p-40 text-center text-color border-dash-gray'>
                <p>Drop your file here</p>
                <button className='btn-gradient-purple py-12 px-32 text-white mt-16'>Select your file</button>
            </div>
        </div>
    );
};

export default ChangePhoto;
