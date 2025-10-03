import React from 'react';
import type { User } from './PeopleCard';
import PeopleCard from './PeopleCard';
import { useNavigate } from 'react-router-dom';

const People: React.FC = () => {
    const navigate = useNavigate();
    
    const sampleUsers: User[] = [
        {
            id: 1,
            name: 'Joseph',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            activeStatus: 'Active 3 seconds ago',
            friends: 0,
            groups: 3,
            actionType: 'profile',
            actionText: 'Add Friend'
        },
        {
            id: 2,
            name: 'Sephiroth',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
            activeStatus: 'Active 3 weeks, 4 days ago',
            friends: 10,
            groups: 6,
            actionType: 'cancel',
            actionText: 'Cancel Friendship Request'
        },
        {
            id: 3,
            name: 'Linda Lohan',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
            activeStatus: 'Active 1 year, 5 months ago',
            friends: 6,
            groups: 5,
            actionType: 'cancel',
            actionText: 'Add Friend'
        },
        {
            id: 4,
            name: 'Irina Petrova',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
            activeStatus: 'Active 1 year, 5 months ago',
            friends: 10,
            groups: 3,
            actionType: 'cancel',
            actionText: 'Add friend'
        },
        {
            id: 5,
            name: 'Irina Petrova',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
            activeStatus: 'Active 1 year, 5 months ago',
            friends: 10,
            groups: 3,
            actionType: 'cancel',
            actionText: 'Add friend'
        },
        {
            id: 6,
            name: 'Irina Petrova',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
            activeStatus: 'Active 1 year, 5 months ago',
            friends: 10,
            groups: 3,
            actionType: 'cancel',
            actionText: 'Cancel Friendship Request'
        }
    ];
      
    const handleAction = (userName: string, actionType: string): void => {
        console.log(`Action ${actionType} for user ${userName}`);
        if (actionType === 'profile') {
            navigate(`/profile/${userName}`);
        }
    };

    return (
        <div className=''>
            {/* PeopleCard */}
            <div className='d-grid grid-cols-250-auto gap-16px'>
                {sampleUsers.map((user) => (
                    <PeopleCard 
                        key={user.id} 
                        user={user} 
                        onAction={handleAction}
                    />
                ))}
            </div>
        </div>
    );
};

export default People;