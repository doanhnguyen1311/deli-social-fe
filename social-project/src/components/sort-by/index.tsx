/* eslint-disable */

import { KTIcon } from '@/_metronic/helpers'
import { OrderBy } from '@/components/types'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { FC } from 'react'

type Props = {
  orderBy?: OrderBy
  isActive?: boolean
  className?: string
}

const SortBy: FC<Props> = ({ orderBy, className, isActive = false }) => {
  return (
    <div
      className={clsx([
        'sort-by-icon d-inline-flex flex-column justify-content-center',
        isActive && orderBy,
        className,
      ])}
    >
      <KTIcon
        iconName='arrow-up-down'
        className={`d-inline-block up-icon ${isActive && orderBy ? 'orange-500' : 'black-200'}`}
      />
    </div>
  )
}

export default SortBy
