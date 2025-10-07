import React from "react";
import { useAuth } from '../../../hooks/useAuth';

const ViewProfile: React.FC = () => {
    const { user } = useAuth();

    return (
        <>
            <h2 className='fs-24 mb-12 text-color'>View Profile</h2>
            <h4 className='fs-16 text-color'>Base</h4>
            <hr className='divider' />
            <table className='w-100'>
                <tbody>
                    <tr>
                        <td className='bg-gray fs-14 pl-16 font-bold border-bottom-gray text-color'>Name</td>
                        <td className='bg-white fs-14 p-12 pl-16 border-bottom-gray'>{user?.profile.fullName}</td>
                    </tr>
                    <tr>
                        <td className='bg-gray fs-14 pl-16 font-bold border-bottom-gray text-color'>Date of Birth</td>
                        <td className='bg-white fs-14 p-12 pl-16 border-bottom-gray'>{user?.profile.birthday}</td>
                    </tr>
                    <tr>
                        <td className='bg-gray fs-14 pl-16 font-bold border-bottom-gray text-color'>Sex</td>
                        <td className='bg-white fs-14 p-12 pl-16 border-bottom-gray'>{user?.profile.gender}</td>
                    </tr>
                    <tr>
                        <td className='bg-gray fs-14 pl-16 font-bold border-bottom-gray text-color'>City</td>
                        <td className='bg-white fs-14 p-12 pl-16 border-bottom-gray'>{user?.province.name}</td>
                    </tr>
                    <tr>
                        <td className='bg-gray fs-14 pl-16 font-bold text-color'>Website</td>
                        <td className='bg-white fs-14 p-12 pl-16 text-primary cursor-pointer text-hover-underline'>{user?.profile.website}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};

export default ViewProfile;
