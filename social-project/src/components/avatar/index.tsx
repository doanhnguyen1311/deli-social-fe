import camera from '@/components/images/camera.svg'
import noAvatar from '@/components/images/no-avatar.png'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import { FC, InputHTMLAttributes } from 'react'
import './style.scss'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  size?: string | number
  className?: string // used in var $custom-sizes. Reference links: src/_metronic/assets/sass/core/components/_variables.scss
  file: string
  onRemove?: () => void
  showUpload?: boolean
  showIconClose?: boolean
}

const Avatar: FC<Props> = ({
  className,
  size,
  file,
  showUpload = true,
  showIconClose = true,
  onChange,
  onRemove,
  ...rest
}) => {
  return (
    <div className={clsx(['avatar flex-shrink-0', size && `w-${size}`, className])}>
      <img
        className='w-100 h-100 object-fit-cover rounded-inherit'
        src={file || noAvatar}
        alt='avatar'
      />

      {/* Remove file */}
      {file && showIconClose && (
        <FontAwesomeIcon
          icon={faClose}
          className='close-icon cursor-pointer text-hover-danger'
          onClick={onRemove}
        />
      )}

      {/* Upload file */}
      {showUpload && (
        <label className='camera-wrap rounded-circle cursor-pointer' htmlFor='upload'>
          <input
            type='file'
            id='upload'
            hidden
            onChange={(e) => {
              if (onChange) {
                onChange(e)
              }
            }}
            {...rest}
          />
          <img className='camera-img w-100 h-100 object-fit-cover' src={camera} alt='camera' />
        </label>
      )}
    </div>
  )
}

export default Avatar
