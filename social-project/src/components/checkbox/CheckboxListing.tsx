import { CheckboxListingProps } from '@/components/types'
import clsx from 'clsx'
import { FC } from 'react'
import Checkbox from './Checkbox'
import './style.scss'

const CheckboxListing: FC<CheckboxListingProps> = ({
  values: arrayChecked = [],
  className,
  row,
  isTwoCol = false,
  onChange,
  options,
}) => {
  const { name, key }: any = row

  return (
    <div className='w-100'>
      {name && <p className='fs-16 fw-semibold pb-8px m-0'>{name}</p>}

      <div
        className={clsx([
          'filter-checkbox-wrap',
          isTwoCol ? 'grid-2-columns justify-content-between' : 'w-fit-content d-flex flex-wrap',
          className,
        ])}
      >
        {options?.map((el, index) => {
          const isChecked = arrayChecked?.includes(el.value.toString())

          return (
            <div
              className={clsx([
                'position-relative d-flex flex-column justify-content-end',
                isTwoCol ? 'h-46px' : 'h-0',
              ])}
              key={index}
            >
              <Checkbox
                name={key}
                value={el.value}
                label={el.label}
                classNameLabel={`fs-16 fw-semibold text-nowrap ${isChecked ? 'text-gray-900' : 'text-gray-600'
                  }`}
                checked={isChecked}
                onChange={(e) =>
                  onChange({
                    event: e,
                    row,
                    typeFilter: 'in',
                  })
                }
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CheckboxListing
