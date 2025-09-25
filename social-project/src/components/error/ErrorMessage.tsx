import clsx from 'clsx'
import {FC} from 'react'

type Props = {
  message?: string
  className?: string
  classNameText?: string
  containerRef?: React.RefObject<HTMLDivElement> | null
}

const ErrorMessage: FC<Props> = ({message, className = '', classNameText = '', containerRef}) => {
  return (
    <div className={clsx('fv-plugins-message-container text-danger', className)} ref={containerRef}>
      <span className={clsx('fv-help-block', classNameText)}>{message}</span>
    </div>
  )
}

export default ErrorMessage
