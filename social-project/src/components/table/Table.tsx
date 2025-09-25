import { TableConfig, TableRow } from '@/components/types'
import { formatDate, formatMoney } from '@/components/utils'
import clsx from 'clsx'

import { FC, Fragment, useMemo } from 'react'
import { AnyObject } from 'yup'
import ButtonDelete from '../button/ButtonDelete'
import ButtonEdit from '../button/ButtonEdit'
import ButtonViewDetail from '../button/ButtonViewDetail'
import { Filter } from '../filter/Filter'
import Loading from './components/Loading'
import './styles.scss'

type Props = {
  config: TableConfig
  onEditItem?: (data: any) => void
  onViewDetail?: (data: any) => void
  isUpdated?: boolean
  setIsUpdated?: any
  isShowFilter?: boolean
  setSttTable?: any
  data: any[]
  loading?: boolean
  pageSize?: number
  currentPage?: number
  onClickItem?: (item: any, row: TableRow, index: number) => void
  onClickEdit?: (item: any, index: number) => void
  onClickView?: (item: any, index: number) => void
  onCLickDelete?: (item: any, index: number) => void
}

const Table: FC<Props> = ({
  config,
  isShowFilter = false,
  data = [],
  loading = false,
  pageSize = 10,
  currentPage = 1,
  onClickItem = () => {},
  onClickEdit = () => {},
  onClickView = () => {},
  onCLickDelete = () => {},
}) => {
  const {settings, rows} = config
  const {
    showAction = true,
    showDeleteButton = true,
    showEditButton = true,
    showViewButton = true,
    showRefresh = false,
  }: any = settings

  const ROW_LIST = useMemo(() => {
    return rows.filter((el) => !el.isHide)
  }, [rows])

  function handleFormatValue(value: any, config: TableRow, item: AnyObject, index: number) {
    const { format, key, options, typeDateFormat = 'MMM DD, YYYY' } = config
  
    if (key.includes('.')) {
      const keys = key.split('.')
      value = keys.reduce((prev, curr) => (prev ? prev[curr] : null), item)
    }
  
    switch (true) {
      case key === 'id':
        const page = (+currentPage || 1) - 1
        const limit = +pageSize || 10
        const id = page * limit + index + 1
        return id
      case format === 'date':
        return formatDate(value, typeDateFormat)
      case format === 'money':
        return formatMoney(value)
      case format === 'option':
        const label = options?.find((option) => option.value === value)?.label
        return label || value
      case format === 'percent':
        return `${value}%`
      case format === 'color-picker':
        return ''
      default:
        return value
    }
  }
  

  function handleAddClassNameByCondition(
    value: any,
    config: TableRow,
    item: AnyObject,
    index: number
  ) {
    const {format, options}: any = config

    switch (true) {
      case format === 'link':
        return 'text-gray-900 text-hover-primary'
      case format === 'option':
        const className = options.find((o: any) => o.value === value)?.className
        return className || ''
      case format === 'date':
        return 'text-nowrap'
      case format === 'color-picker':
        return 'd-inline-block w-50px h-10px rounded-8px'
      default:
        return ''
    }
  }

  function Base64ToImage({base64String, altText, className}: any) {
    if (!base64String) return null

    return (
      <img
        src={`data:image/png;base64,${base64String}`}
        alt={altText}
        className={className}
        style={{width: '100px', height: '50px'}}
      />
    )
  }

  return (
    <>
      <div className='table-responsive mb-3'>
        <table className='table-main'>
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {ROW_LIST.map((row, i) => (
                <th className={clsx(['text-nowrap', row.classNameTableHead])} key={i}>
                  <div
                    className={clsx([
                      row.name === 'Status'
                        ? 'w-100 d-flex justify-content-center text-uppercase text-gray-500 align-items-center fs-14 fw-bold'
                        : 'w-100 text-uppercase text-gray-500 fs-14 fw-bold',
                    ])}
                  >
                    <span>{row.name}</span>
                    {isShowFilter && <Filter />}
                  </div>
                </th>
              ))}
              {(showAction || showRefresh) && (
                <th className='text-center w-150px'>
                  <div
                    className={clsx([
                      'w-100 d-flex justify-content-center text-uppercase text-gray-500 align-items-center fs-14 fw-bold',
                    ])}
                  >
                    <span>ACTIONS</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>

          <tbody className='text-gray-600 fw-bold'>
            {data?.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr key={index} className='fw-medium'>
                    {rows.map((row, rowIndex) => {
                      const {key, component, classNameTableBody, classNameText, isHide, format} =
                        row

                      const Component = component || Fragment

                      let value = item?.[key]
                      value = handleFormatValue(value, row, item, index)
                      // value = handleFormatForTableIdentify(value, row, item, index)

                      const customClassName = handleAddClassNameByCondition(
                        item[key],
                        row,
                        item,
                        index
                      )

                      if (isHide) {
                        return <Fragment key={rowIndex}></Fragment>
                      }

                      if (key === 'user_signature') {
                        return (
                          <td style={{width: '20px', height: '20px'}}>
                            <Base64ToImage
                              base64String={value}
                              className={''}
                              altText={'signature'}
                            />
                          </td>
                        )
                      }

                      return (
                        <td key={rowIndex} className={clsx([classNameTableBody])}>
                          {component ? (
                            <Component />
                          ) : (
                            <span
                              onClick={() => onClickItem(item, row, index)}
                              className={clsx([classNameText, customClassName])}
                              style={
                                format === 'color-picker'
                                  ? {backgroundColor: `${item?.[key]}`}
                                  : undefined
                              }
                            >
                              {value}
                            </span>
                          )}
                        </td>
                      )
                    })}

                    {showAction && (showDeleteButton || showEditButton || showViewButton) && (
                      <td className='text-center' key={index}>
                        <div className='d-flex align-items-center justify-content-center gap-1'>
                          {showViewButton && (
                            <ButtonViewDetail onClick={() => onClickView(item, index)} />
                          )}

                          {showEditButton && (
                            <ButtonEdit
                              // disabled={
                              //   [1, 2].includes(+item?.id) &&
                              //   ['New Task Type'].includes(settings.buttonAddNew)
                              // }
                              onClick={() => onClickEdit(item, index)}
                            />
                          )}

                          {showDeleteButton && (
                            <ButtonDelete
                              // disabled={
                              //   [1, 2].includes(+item?.id) &&
                              //   ['New Task Type'].includes(settings.buttonAddNew)
                              // }
                              onClick={() => onCLickDelete(item, index)}
                            />
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={rows.length}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center fs-14 fw-semibold'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && <Loading />}
    </>
  )
}

export default Table
