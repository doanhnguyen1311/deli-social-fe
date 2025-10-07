import React from "react";
import { MessageCircleWarning } from "lucide-react";
import styles from "../index.module.css";

const ChangeCover: React.FC = () => {

    return (
        <div className={styles.changePhoto}>
            {/* Title */}
            <h2 className='fs-24 mb-12 text-color'>Change Cover Image</h2>

            {/* Info Box */}
            <div className='d-flex align-center gap-8px bg-white p-24 my-16 relative box-shadow radius-12 border-top-primary'>
                <MessageCircleWarning size={16} className='text-purple' />
                <p className='fs-14 fw-normal lh-16 text-color'>
                    Your Cover Image will be used to customize the header of your profile.
                </p>
            </div>

            {/* Select File Box */}
            <div className='radius-12 p-40 text-center text-color border-dash-gray'>
                <p>Drop your file here</p>
                <button className='btn-gradient-purple py-12 px-32 text-white mt-16'>Select your file</button>
            </div>

            {/* Warning */}
            <div className='warning-box my-16 radius-12'>
                <p className='fs-14 fw-normal lh-16 text-color'>
                    For better results, make sure to upload an image that is larger than 1920px wide, and 280px tall.
                </p>
            </div>
        </div>
    );
};

export default ChangeCover;
