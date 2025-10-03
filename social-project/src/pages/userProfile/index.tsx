import React from 'react';
import { useParams } from 'react-router-dom';
import Editor from './Editor';
import Activity from '../newsfeed/Activity';

const UserProfile: React.FC = () => {
    const { userName } = useParams();
    return (
        <div>
            <Editor userName={userName}/>
            <Activity />
        </div>
    );
};

export default UserProfile;
