import { KTIconCustom } from '@/_metronic/helpers/components/KTIconCustomer'
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonDelete = ({title, ...rest}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      className='btn btn-icon btn-bg-transparent btn-active-color-primary btn-sm me-1'
      aria-label='button'
      title={title || 'Delete'}
      {...rest}
    >
      <KTIconCustom iconName='trash' className='fs-3 dark-gray-500 pink-brand-500-hover' />
    </button>
  )
}

export default forwardRef(ButtonDelete)
