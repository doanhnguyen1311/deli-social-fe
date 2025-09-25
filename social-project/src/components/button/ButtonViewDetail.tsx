import {ButtonHTMLAttributes, ForwardedRef, forwardRef} from 'react'
import {KTIconCustom} from '@/_metronic/helpers/components/KTIconCustomer'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonViewDetail = ({title, ...rest}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      // className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm '
      className='btn btn-icon btn-bg-transparent btn-active-color-primary btn-sm me-1'
      aria-label='button'
      title={title || 'View Details'}
      {...rest}
    >
      {/* <KTIcon iconName='eye' className=' fs-3' /> */}
      <KTIconCustom iconName='eye' className='fs-3 dark-gray-500 pink-brand-500-hover' />
    </button>
  )
}

export default forwardRef(ButtonViewDetail)
