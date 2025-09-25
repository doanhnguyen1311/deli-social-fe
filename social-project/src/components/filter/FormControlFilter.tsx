import {FilterRow, InputProps, PropsChangeFilterRow, SelectProps} from '@/components/types'
import {FC, FocusEvent, Fragment, KeyboardEvent} from 'react'
import {Input} from '../input'
import {Select} from '../select'
import {AnyObject} from 'yup'
import {CheckboxListing} from '../checkbox'

type Props = {
  row: FilterRow
  onChange: (info: PropsChangeFilterRow) => void
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  onKeyDown?: (e: KeyboardEvent<any>) => void
  optionsFromApi?: AnyObject[]
  dataFilter?: AnyObject
  isTwoCol?: boolean
}

const FormControlFilter: FC<Props> = (props) => {
  const {row, optionsFromApi, dataFilter, onChange, onBlur, onKeyDown, isTwoCol = true} = props

  function handleGetFormControl() {
    const value = dataFilter?.[row.key]
    switch (row.type) {
      case 'input':
        return (
          <>
            <Input
              {...(row.defaultProps as InputProps)}
              name={row.key}
              label={row.name}
              value={row.isFromTo ? value?.['gte'] : value}
              onChange={(e) =>
                onChange({
                  event: e,
                  row,
                  typeFilter: row.isFromTo ? 'gte' : undefined,
                })
              }
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              placeholder={row.isFromTo ? 'from' : undefined}
            />

            {row.isFromTo && (
              <Input
                {...(row.defaultProps as InputProps)}
                name={row.key}
                value={value?.['lte']}
                onChange={(e) =>
                  onChange({
                    event: e,
                    row,
                    typeFilter: 'lte',
                  })
                }
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                placeholder={'to'}
              />
            )}
          </>
        )
      case 'select':
        return (
          <Select
            {...(row.defaultProps as SelectProps)}
            name={row.key}
            label={row.name}
            value={value}
            onChange={(e) =>
              onChange({
                event: e,
                row,
              })
            }
            options={optionsFromApi || row?.options || []}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
        )
      case 'checkbox-multiple':
        return (
          <CheckboxListing
            {...(row.defaultProps as SelectProps)}
            onChange={onChange}
            values={value?.in}
            row={row}
            isTwoCol={false}
            options={optionsFromApi || row?.options || []}
          />
        )
      default:
        return <Fragment></Fragment>
    }
  }

  return <>{handleGetFormControl()}</>
}

export default FormControlFilter
