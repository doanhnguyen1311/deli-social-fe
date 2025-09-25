import IconDocument from '@/components/images/icon-document.svg?react'
import { convertSize } from '@/components/utils'
import clsx from 'clsx'
import { FC } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import { Checkbox } from '../checkbox'
import './style.scss'

interface Props {
  id: number
  base64: string
  type: string
  fileName: string
  size: number
  className?: string
  isCheck?: boolean
  onDeleteFile?: (id: number) => void
  onClickItem?: (id: number) => void
  showDeleteIcon?: boolean
  showSize?: boolean
}
const UploadFile: FC<Props> = ({
  id,
  base64,
  type,
  fileName,
  size,
  className,
  isCheck = false,
  showDeleteIcon,
  onDeleteFile = () => {},
  onClickItem = () => {},
  showSize = true,
}) => {
  function handleViewPdf(value: string) {
    const base64String = value.startsWith('data:application/pdf;base64,')
      ? value.split(',')[1]
      : value

    try {
      const binaryString = window.atob(base64String)
      const len = binaryString.length
      const bytes = new Uint8Array(len)

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      const blob = new Blob([bytes], {type: 'application/pdf'})

      const url = URL.createObjectURL(blob)

      window.open(url, '_blank')
    } catch (error) {
      console.error('Error decoding base64:', error)
    }
  }

  return (
    <div
      title='Select File'
      className={clsx([
        'd-flex flex-row position-relative h-100 rounded-8px hover-document gap-10px p-10px',
        className,
      ])}
      style={{border: '1px solid #f1f1f2'}}
    >
      <div className='d-flex position-relative cursor-pointer'>
        {isCheck && (
          <div className='position-absolute px-30px start-0'>
            <Checkbox name='check' checked onChange={() => {}} />
          </div>
        )}

        <div
          title='Open File'
          // onClick={() => {
          //   handleViewPdf(base64)
          // }}
          onClick={(e) => {
            const isClickedInsideIcon = (e.target as any)?.closest('.icon-open-file')
            if (!isClickedInsideIcon) {
              handleViewPdf(base64)
            }
          }}
          className='icon-open-file d-flex cursor-pointer justify-content-center align-items-center'
        >
          <IconDocument className='w-24px h-24px' />
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-between w-100'>
        <div
          className='d-flex flex-column gap-8px cursor-pointer'
          // onClick={() => {
          //   handleViewPdf(base64)
          // }}
          onClick={(e) => {
            const isClickedInsideIcon = (e.target as any)?.closest('.icon-open-file')
            if (!isClickedInsideIcon) {
              handleViewPdf(base64)
            }
          }}
        >
          <p
            className={`p-0 m-0 w-100 fw-semibold fs-12 text-gray-900 text-break text-hover-primary cursor-pointer`}
          >
            {fileName && fileName.length > 100 ? `${fileName.slice(0, 100)}...` : fileName}
          </p>

          {showSize === true && (
            <p className='w-100 text-B5B5C3 text-start fw-semibold fs-12 p-0 m-0'>
              {convertSize(Number(size) || 0)}
            </p>
          )}
        </div>
        {showDeleteIcon && (
          <button
            className='close text-16px button-file cursor-position p-16px border-0 bg-transparent'
            onClick={() => onDeleteFile(id)}
          >
            <AiOutlineClose className='icon text-hover-primary' />
          </button>
        )}
      </div>
    </div>
  )
}

export default UploadFile
