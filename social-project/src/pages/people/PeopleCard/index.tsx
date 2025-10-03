import React from 'react';

export interface User {
  id: number;
  name: string;
  avatar: string;
  activeStatus: string;
  friends: number;
  groups: number;
  actionType: 'profile' | 'cancel';
  actionText: string;
}

export interface PeopleCardProps {
  user: User;
  onAction: (userName: string, actionType: string) => void;
}

const PeopleCard: React.FC<PeopleCardProps> = ({ user, onAction }) => {
  return (
    <div 
      className='bg-white radius-24 p-16 text-center box-shadow'
      onClick={() => onAction(user.name, 'profile')}
    >
      {/* Avatar */}
      <div className='mb-16'>
        <img 
          src={user.avatar} 
          alt={user.name}
          className='w-80 radius-50 object-cover'
        />
      </div>
      
      {/* Name */}
      <h3 className='fs-18 font-medium mb-12'>{user.name}</h3>
      
      {/* Active Status */}
      <p className='fs-12 text-gray mb-12'>{user.activeStatus}</p>
      
      {/* Stats */}
      <div className='d-flex justify-center gap-32px mb-20'>
        <div className='text-center'>
          <div className='fs-16 fw-semibold lh-16'>{user.friends}</div>
          <div className='fs-12 text-gray mt-8'>Friends</div>
        </div>
        <div className='text-center'>
          <div className='fs-16 fw-semibold lh-16'>{user.groups}</div>
          <div className='fs-12 text-gray mt-8'>Groups</div>
        </div>
      </div>
      
      {/* Action Button */}
      <button 
        onClick={() => onAction(user.name, user.actionType)}
        className='w-100 btn-primary py-12'
      >
        {user.actionText}
      </button>
    </div>
  );
};

export default PeopleCard;