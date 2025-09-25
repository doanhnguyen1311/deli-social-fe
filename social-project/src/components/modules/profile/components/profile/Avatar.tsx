import { useEffect, useState } from 'react'
import { useAuth } from '@/components/context/AuthContext'

const Avatar = ({ style }: any) => {
  const { currentUser } = useAuth()
  let avatarInitials = ''

  if (currentUser?.first_name && currentUser?.last_name) {
    avatarInitials = `${currentUser?.last_name[0].toUpperCase()}${currentUser?.first_name[0].toUpperCase()}`
  }

  useEffect(() => { }, [currentUser?.avatar])

  const [isBigMonitor, setIsBigMonitor] = useState<boolean>(
    document.documentElement.clientWidth > 992
  )

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth
      setIsBigMonitor(clientWidth >= 992)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      setIsBigMonitor(true)
    }
  }, [document.documentElement.clientWidth > 992])

  return (
    <>
      {!currentUser?.avatar && (
        <div
          className='avatar rounded-circle'
          style={{
            backgroundColor: '#C0C0C0',
            width: '90px',
            height: '90px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            objectFit: 'cover',
            ...style,
            borderRadius: '0.475rem',
          }}
        >
          <div className='avatar-text fw-bold text-black '>{avatarInitials}</div>
        </div>
      )}

      {currentUser?.avatar && (
        <div
          className='avatar rounded-circle'
          style={{
            width: '90px',
            objectFit: 'cover',
            height: '90px',
            ...style,
          }}
        >
          <img
            src={currentUser && `${currentUser?.avatar}`}
            alt='User Avatar'
            className='img-thumbnail avatar rounded-circle'
            width={90}
            height={90}
            style={{
              objectFit: 'cover',
              ...style,
            }}
          />
        </div>
      )}
    </>
  )
}

export default Avatar
