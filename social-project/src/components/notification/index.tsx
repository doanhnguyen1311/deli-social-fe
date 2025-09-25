import ErrorIcon from '@/components/images/error.svg'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

type Props = {
  message?: string
  children?: ReactNode
  title?: string
  color?: 'danger' | 'warning' | 'primary'
  className?: string
  classNameTitle?: string
  classNameMessage?: string
}
const Notification: FC<Props> = (props) => {
  const {
    message,
    children,
    title,
    color = 'danger',
    className,
    classNameMessage,
    classNameTitle,
  } = props

  return (
    <div
      className={clsx([
        `d-flex align-items-center gap-16px border border-${color} bg-light-${color} p-12px rounded-8 mb-24px`,
        className,
      ])}
    >
      <div className={`text-${color}`}>
        <ErrorIcon />
      </div>

      {children ? (
        children
      ) : (
        <div className='d-flex flex-column flex-grow-1 gap-4px'>
          {title && <h3 className={clsx(['m-0 fs-16 fw-bold', classNameTitle])}>{title}</h3>}

          <span className={clsx([`fs-14 text-${color}`, classNameMessage])}>{message}</span>
        </div>
      )}
    </div>
  )
}

export default Notification
