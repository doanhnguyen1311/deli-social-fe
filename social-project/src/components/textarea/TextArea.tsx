import clsx from 'clsx'
import { FC, TextareaHTMLAttributes, useId } from 'react'
import ErrorMessage from '../error/ErrorMessage'
import Label from '../label'
import './style.scss'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  classShared?: string
  label?: string
  error?: string
  touched?: boolean
}

const TextArea: FC<TextAreaProps> = ({
  id,
  name,
  label,
  className = '',
  classShared = '',
  required = false,
  error,
  touched,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const defaultId = useId()

  return (
    <div className={clsx('textarea-comp', classShared)}>
      {label && (
        <Label
          className='d-flex align-items-center fs-5 fw-semibold mb-8px'
          required={required}
          label={label}
          htmlFor={id || defaultId || name}
        />
      )}

      <textarea
        className={clsx([
          className,
          'form-textarea-custom form-control bg-inherit_textarea min-h-120px p-14px dark-gray-500 border-violet-500-hover border-violet-500-active form-control-lg fs-14 rounded-8px fw-normal',
        ])}
        id={id || defaultId || name}
        name={name}
        aria-label={ariaLabel || label || name || 'text-area'}
        {...rest}
      />

      {error && touched && <ErrorMessage className='mt-2' message={error} />}
    </div>
  )
}

export default TextArea
