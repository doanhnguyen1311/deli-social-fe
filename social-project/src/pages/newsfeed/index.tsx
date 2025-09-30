import React from 'react';
import Editor from './Editor';
import Activity from './Activity';

const NewsFeed: React.FC = () => {
    return (
        <div>
            <Editor />
            <Activity />
        </div>
    );
};

export default NewsFeed;
