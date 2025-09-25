

import request from '@/components/axios'
import Button from '@/components/button/Button'
import { useAuth } from '@/components/context/AuthContext'
import FileItem from '@/components/file/FileItem'
import { useStatus } from '@/components/hooks/useStatus'
import Modal from '@/components/modal/Modal'
import NoRecord from '@/components/no-records'
import { DataResponse } from '@/components/types'
import { convertFileTypeFromBase64, logger } from '@/components/utils'
import clsx from 'clsx'
import { FC, useEffect, useRef, useState } from 'react'

type Props = {
  onClose: (newModalName: string) => void
  applicationId: number
}
const ModalDownloadFile: FC<Props> = ({ applicationId, onClose }) => {
  const [fileList, setFileList] = useState<any[]>([])
  const [fileIdsSelected, setFileIdsSelected] = useState<number[]>([])
  const [status, setStatus] = useStatus('')
  const { currentUser } = useAuth()
  const [data, setData] = useState<string>('')

  useEffect(() => {
    getFilesListingByApplicationId()
  }, [applicationId])

  useEffect(() => {
    fetchData()
  }, [applicationId])

  const fetchData = async () => {
    try {
      const { data } = await request.get<DataResponse>(
        `/startup/organization-report/${applicationId}`
      )

      setData(data.data)
    } catch (error) {
      console.error('Error fetching data or logging action:', error)
    }
  }

  const controller = useRef<AbortController>(null)

  async function getFilesListingByApplicationId() {
    try {
      if (!applicationId) return
      setStatus('pending')

      controller.current?.abort()

      const newController = new AbortController()
      controller.current = newController

      const { data } = await request.get<DataResponse>(
        `/startup/organization-report/${applicationId}`
      )

      setFileList(data?.data)
      setStatus('fulfilled')
    } catch (error) {
      setStatus('rejected')
      logger(error)
    }
  }

  const downloadFiles = async (files: any[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        await downloadFile(file, i + 1)
      } catch (error) {
        logger(`Error downloading file ${file?.document_name}: ${error}`)
      }
    }
  }

  const downloadFile = (file: any, index: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            const byteString = atob(file.base64.split(',')[1])
            const ab = new ArrayBuffer(byteString.length)
            const ia = new Uint8Array(ab)

            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i)
            }

            const blob = new Blob([ab], { type: convertFileTypeFromBase64(file.base64) })
            const url = URL.createObjectURL(blob)

            const link = window.document.createElement('a')
            link.href = url
            link.download = file.document_name
            window.document.body.appendChild(link)
            link.click()
            window.document.body.removeChild(link)
            URL.revokeObjectURL(url)

            resolve()
          }, 100) // Resolve the promise once the file is downloaded
        }
      } catch (error) {
        reject(error) // Reject the promise if there's an error
      }
    })
  }

  return (
    <>
      <Modal title='Download File' className='w-1000px' onClose={() => onClose('')}>
        <div className='overflow-auto p-30px'>
          {status === 'pending' ? (
            <div className='d-flex flex-column align-items-center'>
              <span className='fs-14 fw-semibold text-gray-600 d-block'>Loading...</span>
            </div>
          ) : fileList?.length <= 0 ? (
            <NoRecord />
          ) : (
            <>
              <div className='d-flex justify-content-between gap-24px'>
                <div className='d-flex align-items-center gap-12px mb-16px'>
                  <span
                    className='text-hover-primary fw-semibold fs-14 cursor-pointer'
                    onClick={() => setFileIdsSelected(fileList?.map((el) => el.id))}
                  >
                    Select All
                  </span>
                  <span>/</span>
                  <span
                    className='text-hover-primary fw-semibold fs-14 cursor-pointer'
                    onClick={() => setFileIdsSelected([])}
                  >
                    Deselect All
                  </span>
                </div>

                <div className='fs-14 fw-semibold'>
                  Selected: <strong>{fileIdsSelected.length}</strong>/
                  <strong>{fileList?.length || 0}</strong>
                </div>
              </div>

              <div className='row g-16px'>
                {fileList?.map((el) => (
                  <div className='col-3' key={el.id}>
                    <FileItem
                      onClickItem={(id) => {
                        setFileIdsSelected((prev) =>
                          prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
                        )
                      }}
                      className={clsx([
                        'border w-100 cursor-pointer',
                        fileIdsSelected.includes(el.id) && 'border-primary',
                      ])}
                      isCheck={fileIdsSelected.includes(el.id)}
                      base64={el.base64}
                      id={el.id}
                      fileName={el.document_name}
                      size={+el.size || 0}
                      type='pdf'
                      onDeleteFile={() => { }}
                      showDeleteIcon={false}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className='d-flex justify-content-end gap-16px border-top border-gray-200 p-30px'>
          <Button
            className='btn-secondary'
            disabled={status === 'pending'}
            onClick={() => onClose('')}
          >
            Cancel
          </Button>
          <Button
            className='btn-primary'
            disabled={status === 'pending'}
            onClick={() => {
              const filesSelected = fileList.filter((f) => fileIdsSelected.includes(f.id))
              downloadFiles(filesSelected)
              setFileIdsSelected([])
            }}
          >
            Download File Selected
          </Button>
          <Button
            className='btn-primary'
            disabled={status === 'pending'}
            onClick={() => {
              downloadFiles(fileList)
              setFileIdsSelected([])
            }}
          >
            Download All
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ModalDownloadFile
