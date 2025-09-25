import {ButtonHTMLAttributes, ForwardedRef, forwardRef} from 'react'
import IconCall from '@/components/images/phoneCall.svg'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonCall = ({title, ...rest}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
      aria-label='button'
      title={title || 'Call'}
      {...rest}
    >
      <img src={IconCall} alt='call-icon' style={{width: '16px', height: '16px'}} />
    </button>
  )
}

export default forwardRef(ButtonCall)
