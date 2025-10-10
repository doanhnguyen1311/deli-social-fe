import React from 'react';
import { Play } from 'lucide-react';
import styles from '../index.module.css';

export interface Video {
    id: string;
    thumbnail: string;
    duration: string;
    author: {
        name: string;
        avatar: string;
    };
    title?: string;
}

interface VideoCardProps {
    video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
        <div className='bg-white overflow-hidden cursor-pointer'>
            <div className='relative w-100 h-240 overflow-hidden radius-8 box-shadow hover-scale-300'>
                <img 
                    src={video.thumbnail} 
                    alt="Video thumbnail"
                    className='w-100 h-100 object-cover'
                />
                <div className='absolute top-8 right-8 text-white fs-12 py-4 px-8 radius-8' style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>{video.duration}</div>
                <div className='absolute d-flex align-center justify-center' style={{inset: '0'}}>
                    <div className='d-flex align-center justify-center w-64 h-64 radius-50' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <Play className='w-24 h-24 text-white' style={{fill: 'currentcolor'}} />
                    </div>
                </div>
            </div>
            <div className='py-16 px-0'>
                <div className='d-flex align-center gap-12px'>
                    <img 
                        src={video.author.avatar} 
                        alt={video.author.name}
                        className='w-30 h-30 radius-50 object-cover'
                    />
                    <div>
                        <h3 className='fw-medium text-color'>{video.author.name}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
