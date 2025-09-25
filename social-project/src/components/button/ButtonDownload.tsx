import DownloadIcon from '@/components/images/file-down.svg?react'
import {ButtonHTMLAttributes, ForwardedRef, forwardRef} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonDownload = ({title, ...rest}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button
      className='btn btn-icon btn-bg-transparent btn-active-color-primary btn-sm me-1 text-gray-500 text-hover-primary'
      aria-label='button'
      title={title || 'Download'}
      {...rest}
    >
      <DownloadIcon className='fs-3 dark-gray-500 ' />
    </button>
  )
}

export default forwardRef(ButtonDownload)
