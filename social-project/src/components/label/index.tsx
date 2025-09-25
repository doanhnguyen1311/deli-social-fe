import clsx from 'clsx'
import {FC} from 'react'

type Props = {
  required?: boolean
  htmlFor?: string
  label?: string
  className?: string
  title?: string
}

const Label: FC<Props> = ({htmlFor, label, required, className, title}) => {
  return (
    <label
      className={clsx(
        'cursor-pointer fs-16 text-capitalize fw-semibold',
        required && 'required',
        className
      )}
      title={title}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  )
}

export default Label
