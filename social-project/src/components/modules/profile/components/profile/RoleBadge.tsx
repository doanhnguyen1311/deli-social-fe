import { WithChildren } from '@/_metronic/helpers'
import clsx from 'clsx'
import { FC } from 'react'
import './style.scss'

type Props = {
  classNameWrapper?: string
  className?: string
  role: string
}

const RoleBadge: FC<Props & WithChildren> = (props) => {
  const { classNameWrapper, className, role } = props

  return (
    <div className={clsx(
      'position-relative d-flex align-items-center justify-content-center p-8px rounded-4px border',
      classNameWrapper
    )}
      style={{ backgroundColor: "#F1E9FD80" }}
    >
      <div className={clsx(
        'fs-11 fw-semibold',
        className
      )}>
        {role}
      </div>
    </div>
  )
}

export default RoleBadge
