import clsx from 'clsx'
import { FC, InputHTMLAttributes, useId } from 'react'

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'defaultChecked'> {
  name: string
  labelYes?: string
  labelNo?: string
  className?: string
  label?: string
  classNameLabel?: string
  classNameWrap?: string
  classNameNo?: string
  classNameYes?: string
  is_document?: boolean
  data: any
}

const YesNoRadio: FC<Props> = ({
  name,
  className,
  classNameLabel = '',
  classNameWrap,
  labelYes = 'Yes',
  labelNo = 'No',
  is_document = false,
  label,
  onChange,
  data,
  checked = 0,
  classNameYes = '',
  classNameNo = '',
  ...rest
}) => {
  const idYes = useId()
  const idNo = useId()

  return (
    <div className={clsx(['form-check form-check-custom form-check-solid', classNameWrap])}>
      <div className='d-flex flex-row gap-12px'>
        {label && (
          <label className={`${is_document ? 'ms-8px fw-semibold' : 'form-check-label ms-0'}`}>
            <div className={clsx(['cursor-pointer', classNameLabel])}>{label}</div>
          </label>
        )}
        <div className='form-check'>
          <input
            className={clsx(['d-inline-block form-check-input cursor-pointer', className])}
            name={name}
            id={idYes}
            type='radio'
            value={1}
            {...rest}
            checked={1 === +data[name]}
            onChange={onChange}
          />
          {/* <label className={'ms-8} htmlFor={idYes}> */}
          <label className='ms-8px'>
            <div className={clsx(['cursor-pointer', classNameYes])}>{labelYes}</div>
          </label>
        </div>

        <div className='form-check'>
          <input
            className={clsx(['d-inline-block form-check-input cursor-pointer', className])}
            name={name}
            id={idNo}
            type='radio'
            {...rest}
            value={0}
            checked={0 === +data[name]}
            onChange={onChange}
          />
          {/* <label className={'ms-8} htmlFor={idNo}> */}
          <label className='ms-8px'>
            <div className={clsx(['cursor-pointer', classNameNo])}>{labelNo}</div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default YesNoRadio
