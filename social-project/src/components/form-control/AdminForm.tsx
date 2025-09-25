

import request from '@/components/axios'
import { useAuth } from '@/components/context/AuthContext'
import { TableRow } from '@/components/types'
import clsx from 'clsx'
import { FormikProps } from 'formik'
import moment from 'moment'
import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnyObject } from 'yup'
import { CheckboxRounded } from '../checkbox'
import { Input } from '../input'
import Label from '../label'
import { Select } from '../select'
import { TextArea } from '../textarea'

type Props = {
  row: TableRow
  formik: FormikProps<any>
  onChange?: (row: TableRow, event: React.ChangeEvent<any>) => void
  onBlur?: (row: TableRow, event: React.ChangeEvent<any>) => void
  optionListingFromAPI?: AnyObject
  isDisable?: boolean
  showLabel?: boolean
  value?: string
  applyFor?: string
  optionsRole: any
  isEdit?: boolean
}

const FormControlAdmin: FC<Props> = ({
  row,
  formik,
  isDisable,
  optionListingFromAPI,
  showLabel = true,
  value,
  onChange,
  onBlur,
  applyFor = '',
  optionsRole,
  isEdit = false,
}) => {
  const {values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched} = formik
  
  const {pathname} = useLocation()
  
  const [patentStatus, setPatentStatus] = useState<any[]>([])

  useEffect(() => {
    handleGetPatentStatus()
  }, [])

  async function handleGetPatentStatus() {
    try {
      const {data} = await request.post('/config/get-patent-status')
      setPatentStatus(data?.data || [])
    } catch (error) {
      console.log(error)
    }
  }

  function handleChangeDefault(row: TableRow, e: ChangeEvent<any>) {
    const {typeComponent} = row?.infoCreateEdit || {}
    const {value, name, type, checked} = e.target

    if (typeComponent === 'checkbox-rounded' && type === 'checkbox') {
      setFieldValue(name, checked ? 1 : 0)
      return
    }

    setFieldValue(name, value)
  }

  function handleGetFormControl() {
    const {currentUser} = useAuth()
    const {key, name, infoCreateEdit} = row
    const {
      keyLabelOption,
      keyValueOption,
      options,
      required,
      type,
      disabled,
      minDate,
      maxDate,
      defaultProps,
      subTextWhenChecked,
      subTextWhenNoChecked,
    } = infoCreateEdit || {}
    const valueRow =
      type === 'date'
        ? moment(value || (values?.[key] ?? '')).format('YYYY-MM-DD')
        : value || (values?.[key] ?? '')

    switch (row?.infoCreateEdit?.typeComponent) {
      case 'select':
        return (
          <>
            <Select
              {...defaultProps}
              className={clsx(valueRow === '' ? 'black-brand-200' : 'dark-gray-500')}
              required={required}
              placeholder={infoCreateEdit?.placeholder || ''}
              label={showLabel ? name : undefined}
              error={errors?.[key] as string}
              touched={touched?.[key] as boolean}
              value={valueRow}
              onChange={(e) => (onChange ? onChange(row, e) : handleChange(e))}
              onBlur={(e) => (onBlur ? onBlur(row, e) : handleBlur(e))}
              name={key}
              keyValueOption='value'
              keyLabelOption='label'
              options={optionsRole}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                }
              }}
            />

            {key === 'role' && +valueRow === 1 && (
              <div className='pt-8px fs-14 purple-brand-500'>
                When the role is set to Manager, you can assign the startups that this user can
                view.
              </div>
            )}
          </>
        )
      case 'input':
        return (
          <Input
            {...defaultProps}
            required={required}
            label={
              showLabel
                ? key === 'password_hash' && isEdit === true
                  ? 'Reset Password'
                  : name
                : undefined
            }
            value={valueRow}
            placeholder={infoCreateEdit?.placeholder || ''}
            onChange={(e) => (onChange ? onChange(row, e) : handleChangeDefault(row, e))}
            onBlur={(e) => (onBlur ? onBlur(row, e) : handleBlur(e))}
            disabled={isDisable || disabled}
            type={type}
            name={key}
            error={errors?.[key] as string}
            touched={touched?.[key] as boolean}
            min={type === 'date' ? minDate || '1900-01-01' : undefined}
            max={type === 'date' ? maxDate : undefined}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          />
        )
      case 'textarea':
        return (
          <TextArea
            {...defaultProps}
            className='dark-gray-500'
            required={required}
            label={showLabel ? name : undefined}
            disabled={isDisable || disabled}
            value={value || (values?.[key] ?? '')}
            onChange={(e) => (onChange ? onChange(row, e) : handleChangeDefault(row, e))}
            onBlur={(e) => (onBlur ? onBlur(row, e) : handleBlur(e))}
            name={key}
            error={errors?.[key] as string}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
            touched={touched?.[key] as boolean}
          />
        )
      case 'checkbox-rounded':
        return (
          <CheckboxRounded
            {...defaultProps}
            key={key}
            name={key}
            label={name}
            checked={!!values[key]}
            onChange={(e) => (onChange ? onChange(row, e) : handleChangeDefault(row, e))}
            onBlur={(e) => (onBlur ? onBlur(row, e) : handleBlur(e))}
            subTextWhenChecked={subTextWhenChecked}
            subTextWhenNoChecked={subTextWhenNoChecked}
            id={key}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          />
        )
      case 'color-picker':
        return (
          <div className='d-flex align-items-center gap-16px'>
            <Label
              className='d-flex align-items-center fs-5 fw-semibold'
              required={required}
              label={name}
              htmlFor={name}
            />

            <label
              htmlFor='id'
              style={{
                backgroundColor: values[key] as string,
                borderRadius: '8px',
              }}
              className='p-3px d-flex align-items-center justify-content-center'
            >
              <div
                style={{
                  cursor: 'pointer',
                  border: '2px solid #fff',
                  backgroundColor: values[key] as string,
                  borderRadius: '4px',
                  width: '40px',
                  height: '20px',
                }}
              ></div>
            </label>

            <input
              id='id'
              type='color'
              className='w-0 h-0 opacity-0 pe-none user-select-none visibility-hidden'
              name={key}
              value={values[key] || ''}
              onChange={(e) => (onChange ? onChange(row, e) : handleChangeDefault(row, e))}
              onBlur={(e) => (onBlur ? onBlur(row, e) : handleBlur(e))}
            />
          </div>
        )
      default:
        return <Fragment></Fragment>
    }
  }

  return handleGetFormControl()
}

export default FormControlAdmin
