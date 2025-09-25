

import { TableConfig } from '@/components/types'
import { filterObjectKeyNotEmpty, formatDate, isObject } from '@/components/utils'
import clsx from 'clsx'
import { FC, useMemo } from 'react'
import Icons from '../icons'

type Props = {
  dataFilter: {[key: string]: any}
  config: TableConfig
  onResetFilter: () => void
  onRemoveFilter: (key: string) => void
  className?: string
}

const FilterActive: FC<Props> = ({
  dataFilter,
  config,
  className,
  onResetFilter,
  onRemoveFilter,
}) => {

  const filterHasValue = useMemo(() => {
    const newFilter = filterObjectKeyNotEmpty(dataFilter)

    const finishFilter = Object.keys(newFilter).reduce((acc, key) => {
      if (isObject(newFilter[key])) {
        if (newFilter[key]?.in) {
          const arrayFiltered = newFilter[key]?.in?.filter((el: any) => el || el === 0) || []
          return {...acc, ...(arrayFiltered?.length ? {[key]: arrayFiltered} : {})}
        } else {
          const newObject = filterObjectKeyNotEmpty(newFilter[key])
          const isHasValue = Object.keys(newObject).length ? true : false

          return {...acc, ...(isHasValue ? {[key]: newObject} : {})}
        }
      }
      return {...acc, [key]: newFilter[key]}
    }, {})

    return finishFilter as {[key: string]: any}
  }, [dataFilter])

  if (!Object.keys(filterHasValue).length) return <></>

  return (
    <div className={clsx(['d-flex align-items-center gap-16px m-0', className])}>
      <h1 className='fs-14 text-gray-600 fw-semibold m-0'>Filter:</h1>

      <div className='d-flex justify-content-start align-items-center flex-wrap gap-16px'>
        {Object.keys(filterHasValue).map((key: string, i: number) => {
          const currentConfig = config.rows.find((row) => row.key === key)

          const name = currentConfig?.name
          const isDate = currentConfig?.infoFilter?.typeInput === 'date' ? true : false

          let value = filterHasValue[key]

          if (currentConfig?.infoFilter?.typeComponent === 'checkbox') {
            value = value
              ?.map((valueChecked: any) => {
                const label =
                  currentConfig.options?.find((o) => o.value.toString() === valueChecked)?.label ||
                  ''
                return label
              }) // get label
              ?.filter(Boolean) // remove value falsy
              ?.join(', ') // join array.Eg: [a, b, c] to "a, b, c"
          }

          if (isObject(value)) {
            const fromValue =
              isDate && value?.gte ? formatDate(value?.gte, 'DD MMM, YYYY') : value?.gte
            const toValue =
              isDate && value?.lte ? formatDate(value?.lte, 'DD MMM, YYYY') : value?.lte

            // gte key comes first, followed by lte
            value = [fromValue || '...', toValue || '...'].join(' - ')
          }

          // case identification_type in application listing
          if (key === 'identification_type') {
            if (value === 'singapore_nric_no') {
              return (
                <div className='wrapper-filter-application d-flex align-items-center' key={i}>
                  <h2 className='filter-title-show'>
                    {name}: {'Singapore Nric No'}
                  </h2>
                  <div
                    onClick={() => {
                      onRemoveFilter(key)
                    }}
                    className='p-0 m-0 cursor-pointer'
                  >
                    <Icons name={'CloseSmall'} />
                  </div>
                </div>
              )
            }
            if (value === 'foreign_identification_number') {
              return (
                <div className='wrapper-filter-application d-flex align-items-center' key={i}>
                  <h2 className='filter-title-show'>
                    {name}: {'Foreign Identification Number'}
                  </h2>
                  <div
                    onClick={() => {
                      onRemoveFilter(key)
                    }}
                    className='p-0 m-0 cursor-pointer'
                  >
                    <Icons name={'CloseSmall'} />
                  </div>
                </div>
              )
            }
          }

          //case blacklisted or exclusion in customer listing
          if (key === 'blacklisted' || key === 'exclusion') {
            if (value === '0') {
              return (
                <div className='wrapper-filter-application d-flex align-items-center' key={i}>
                  <h2 className='filter-title-show'>
                    {name}: {'No'}
                  </h2>
                  <div
                    onClick={() => {
                      onRemoveFilter(key)
                    }}
                    className='p-0 m-0 cursor-pointer'
                  >
                    <Icons name={'CloseSmall'} />
                  </div>
                </div>
              )
            } else {
              return (
                <div className='wrapper-filter-application d-flex align-items-center' key={i}>
                  <h2 className='filter-title-show'>
                    {name}: {'Yes'}
                  </h2>
                  <div
                    onClick={() => {
                      onRemoveFilter(key)
                    }}
                    className='p-0 m-0 cursor-pointer'
                  >
                    <Icons name={'CloseSmall'} />
                  </div>
                </div>
              )
            }
          }

          return (
            <div className='wrapper-filter-application d-flex align-items-center' key={i}>
              <h2 className='filter-title-show'>
                {name}: {value}
              </h2>
              <div
                onClick={() => {
                  onRemoveFilter(key)
                }}
                className='p-0 m-0 cursor-pointer'
              >
                <Icons name={'CloseSmall'} />
              </div>
            </div>
          )
        })}
      </div>

      <button onClick={onResetFilter} className='reset-all-filter-application'>
        Reset All
      </button>
    </div>
  )
}

export default FilterActive
