import React, { useState } from 'react';
import { Search } from 'lucide-react';
import image from '../../assets/imgs/video.jpg';
import type { Video } from './VideoCard';
import VideoCard from './VideoCard';

const Watch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const videos: Video[] = [
        {
            id: '1',
            thumbnail: image,
            duration: '0:09',
            author: {
                name: 'Joseph',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
        },
        {
            id: '2',
            thumbnail: image,
            duration: '0:09',
            author: {
                name: 'Joseph',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
        },
        {
            id: '3',
            thumbnail: image,
            duration: '0:06',
            author: {
                name: 'Robert Cook',
                avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            },
        },
        {
            id: '4',
            thumbnail: image,
            duration: '0:34',
            author: {
                name: 'Joseph',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
        },
        {
            id: '5',
            thumbnail: image,
            duration: '0:30',
            author: {
                name: 'Joseph',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
        },
        {
            id: '6',
            thumbnail: image,
            duration: '0:00',
            author: {
                name: 'Robert Cook',
                avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            },
        },
    ];

    const filteredVideos = videos.filter((video) =>
        video.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white box-shadow radius-24 py-16 px-16">
            <div className='mb-32'>
                <div className='d-flex align-center justify-between mb-24 border-bottom-gray'>
                    <h1 className='fs-14 font-bold text-primary py-12 px-8 border-bottom-primary cursor-pointer'>All Videos</h1>
                </div>

                <div className='d-flex align-center gap-8px pb-24'>
                    <input
                        type="text"
                        placeholder="Search Media"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='py-10 px-14 radius-24 fs-14 border-gray'
                    />
                    <button className='btn-gradient-purple d-flex align-center justify-center w-40 h-40 text-white py-8 lh-16'>
                        <Search size={18} />
                    </button>
                </div>
            </div>

            <div className='d-grid grid-cols-200-auto gap-24px'>
                {filteredVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>

            {filteredVideos.length === 0 && (
                <div className='text-center py-48'>
                    <div className='text-color fs-18 mb-8'>No videos found</div>
                    <div className='text-gray fs-14'>Try adjusting your search terms</div>
                </div>
            )}
        </div>
    );
};

export default Watch;
