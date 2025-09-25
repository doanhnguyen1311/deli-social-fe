

import request from '@/components/axios'
import { useAuth } from '@/components/context/AuthContext'
import { DataResponse } from '@/components/types'
import { hashEmail, hashPhoneNumber } from '@/components/utils'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import numeral from 'numeral'
import { useEffect, useState } from 'react'

export interface element_config {
  key: string
  value: string
  img?: boolean
  Component?: any
  dollars?: string
  elBehind?: string
  date?: boolean
  number?: boolean
  fileNameIdentity?: string
}

type Props = {
  title?: string
  config?: any
  data?: any
}

function TableRender({title, config = [], data}: Props) {
  const [isHashPhone1, setIsHashPhone1] = useState<boolean>(true)
  const [isHashPhone2, setIsHashPhone2] = useState<boolean>(true)
  const [isHashEmail1, setIsHashEmail1] = useState<boolean>(true)
  const [isHashEmail2, setIsHashEmail2] = useState<boolean>(true)
  const [isHashHomePhone, setIsHashHomePhone] = useState<boolean>(true)
  const {currentUser} = useAuth()

  const [applicationNo, setApplicationNo] = useState<string>('')
  const [applicationId, setApplicationId] = useState<number>(1)

  const applicationIdEdit = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await request.get<DataResponse<any & {[key: string]: any}>>(
          `/application/detail/${applicationIdEdit}`
        )

        setApplicationNo(data?.data?.application?.application_no)
        setApplicationId(data?.data?.application?.id)
      } catch (error) {
        console.error('Error fetching data or logging action:', error)
      }
    }

    fetchData()
  }, [applicationIdEdit])

  async function handleRemoveHashPhone1() {
    const newIsHashPhone1 = !isHashPhone1
    setIsHashPhone1(newIsHashPhone1)

    if (!newIsHashPhone1) {
      await request.post('/action-log/update-log', {
        user_id: +currentUser?.user_id,
        actions: `View mask Phone Number 1 of Surety in application: ${applicationNo}`,
        application_id: +applicationId,
      })
    }
  }

  async function handleRemoveHashPhone2() {
    const newIsHashPhone2 = !isHashPhone2
    setIsHashPhone2(newIsHashPhone2)

    if (!newIsHashPhone2) {
      await request.post('/action-log/update-log', {
        user_id: +currentUser?.user_id,
        actions: `View mask Phone Number 2 of Surety in application: ${applicationNo}`,
        application_id: +applicationId,
      })
    }
  }

  async function handleRemoveHashEmail1() {
    const newIsHashEmail1 = !isHashEmail1
    setIsHashEmail1(newIsHashEmail1)

    if (!newIsHashEmail1) {
      await request.post('/action-log/update-log', {
        user_id: +currentUser?.user_id,
        actions: `View mask Email of Surety in application: ${applicationNo}`,
        application_id: +applicationId,
      })
    }
  }

  async function handleRemoveHashEmail2() {
    const newIsHashEmail2 = !isHashEmail2
    setIsHashEmail2(newIsHashEmail2)

    if (!newIsHashEmail2) {
      await request.post('/action-log/update-log', {
        user_id: +currentUser?.user_id,
        actions: `View mask Alternate Email of Surety in application: ${applicationNo}`,
        application_id: +applicationId,
      })
    }
  }

  async function handleRemoveHashHomePhone() {
    const newIsHashHomePhone = !isHashHomePhone
    setIsHashHomePhone(newIsHashHomePhone)

    if (!newIsHashHomePhone) {
      await request.post('/action-log/update-log', {
        user_id: +currentUser?.user_id,
        actions: `View mask Home Phone of Surety in application: ${applicationNo}`,
        application_id: +applicationId,
      })
    }
  }

  return (
    <div className='p-0 h-100' style={{border: '1px solid #D4D4D4'}}>
      {!!title && (
        <h1
          className='pt-8px pb-8px ps-24px pe-24px fw-semibold m-0 fs-14 text-gray-700'
          style={{
            background: '#D4D4D4',
          }}
        >
          {title}
        </h1>
      )}
      <div className='p-24px d-flex flex-column gap-16px'>
        {config?.map((children_config: element_config[], index: number) => {
          return (
            <div
              key={index}
              className='d-flex w-100 justify-content-between align-items-start gap-16px'
            >
              {children_config?.map((element_config: element_config, indx) => {
                const {Component} = element_config

                if (element_config.key === 'legal_actions_against') {
                  return (
                    <div className='w-100' style={{marginLeft: '-35px'}} key={indx}>
                      <div className='d-flex flex-column p-0'>
                        <h2
                          className='p-0 fs-12 fw-semibold text-B5B5C3 m-0'
                          style={{whiteSpace: 'nowrap'}}
                        >
                          Do you currently have any legal actions pending against you?
                        </h2>
                        <div
                          className='pt-4px pt-0 px-0 m-0 fs-14 fw-semibold text-gray-900 text-break'
                          style={{textAlign: 'start'}}
                        >
                          <div className='d-flex flex-row gap-4px'>
                            {+data.legal_actions_against === 0 ? 'No' : 'Yes'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                if (element_config.key === 'phone_1') {
                  return (
                    <div className='w-100' key={indx}>
                      <div className='d-flex flex-column p-0 align-items-start justify-content-start'>
                        <h2
                          className='p-0 fs-12 fw-semibold text-B5B5C3 m-0'
                          style={{whiteSpace: 'nowrap'}}
                        >
                          Phone Number 1
                        </h2>
                        <div
                          className='pt-4px pt-0 px-0 m-0 fs-14 fw-semibold text-gray-900 text-break'
                          style={{textAlign: 'start'}}
                        >
                          <div className='d-flex flex-row gap-4px'>
                            <div>
                              {!!isHashPhone1 === true && data?.phone_1
                                ? hashPhoneNumber(data?.phone_1)
                                : data?.phone_1}
                            </div>
                            {data?.phone_1 && (
                              <div
                                onClick={() => handleRemoveHashPhone1()}
                                className='cursor-pointer'
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                if (element_config.key === 'phone_2') {
                  return (
                    <div className='w-100' key={indx}>
                      <div className='d-flex flex-column p-0 align-items-start justify-content-start'>
                        <h2
                          className='p-0 fs-12 fw-semibold text-B5B5C3 m-0'
                          style={{whiteSpace: 'nowrap'}}
                        >
                          Phone Number 2
                        </h2>
                        <div
                          className='pt-4px pt-0 px-0 m-0 fs-14 fw-semibold text-gray-900 text-break'
                          style={{textAlign: 'start'}}
                        >
                          <div className='d-flex flex-row gap-4px'>
                            <div>
                              {!!isHashPhone2 === true && data?.phone_2
                                ? hashPhoneNumber(data?.phone_2)
                                : data?.phone_2}
                            </div>
                            {data?.phone_2 && (
                              <div
                                onClick={() => handleRemoveHashPhone2()}
                                className='cursor-pointer'
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                if (element_config.key === 'email') {
                  return (
                    <div className='w-100' key={indx}>
                      <div className='d-flex flex-column p-0 align-items-start justify-content-start'>
                        <h2
                          className='p-0 fs-12 fw-semibold text-B5B5C3 m-0'
                          style={{whiteSpace: 'nowrap'}}
                        >
                          Email
                        </h2>
                        <div
                          className='pt-4px pt-0 px-0 m-0 fs-14 fw-semibold text-gray-900 text-break'
                          style={{textAlign: 'start'}}
                        >
                          <div className='d-flex flex-row gap-4px'>
                            <div>
                              {!!isHashEmail1 === true && data?.email
                                ? hashEmail(data?.email)
                                : data?.email}
                            </div>
                            {data?.email && (
                              <div
                                onClick={() => handleRemoveHashEmail1()}
                                className='cursor-pointer'
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                if (element_config.key === 'email_alternate') {
                  return (
                    <div className='w-100' key={indx}>
                      <div className='d-flex flex-column p-0 align-items-start justify-content-start'>
                        <h2
                          className='p-0 fs-12 fw-semibold text-B5B5C3 m-0'
                          style={{whiteSpace: 'nowrap'}}
                        >
                          Alternate Email
                        </h2>
                        <div
                          className='pt-4px pt-0 px-0 m-0 fs-14 fw-semibold text-gray-900 text-break'
                          style={{textAlign: 'start'}}
                        >
                          {/* {hashPhoneNumber(data?.email)} */}
                          <div className='d-flex flex-row gap-4px'>
                            <div>
                              {!!isHashEmail2 === true && data?.email_alternate
                                ? hashEmail(data?.email_alternate)
                                : data?.email_alternate}
                            </div>
                            {data?.email_alternate && (
                              <div
                                onClick={() => handleRemoveHashEmail2()}
                                className='cursor-pointer'
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                if (element_config.key === 'phone_home') {
                  return (
                    <div className='w-100' key={indx}>
                      <div className='d-flex flex-column p-0 align-items-start justify-content-start'>
                        <h2
                          className='p-0 fs-12 fw-semibold text-B5B5C3 m-0'
                          style={{whiteSpace: 'nowrap'}}
                        >
                          Home
                        </h2>
                        <div
                          className='pt-4px pt-0 px-0 m-0 fs-14 fw-semibold text-gray-900 text-break'
                          style={{textAlign: 'start'}}
                        >
                          {/* {hashPhoneNumber(data?.email)} */}
                          <div className='d-flex flex-row gap-4px'>
                            <div>
                              {!!isHashHomePhone === true && data?.phone_home
                                ? hashPhoneNumber(data?.phone_home)
                                : data?.phone_home}
                            </div>
                            {data?.phone_home && (
                              <div
                                onClick={() => handleRemoveHashHomePhone()}
                                className='cursor-pointer'
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <div key={indx} className='w-100'>
                    <div
                      className='d-flex flex-column p-0'
                      style={{
                        justifyContent: !!element_config.img ? 'center' : 'start',
                        alignItems: !!element_config.img ? 'center' : 'start',
                      }}
                    >
                      {!element_config.img && (
                        <h2
                          className='p-0 fs-12 fw-semibold text-B5B5C3 m-0'
                          style={{
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {element_config.value}
                        </h2>
                      )}
                      {!!Component ? (
                        <Component
                          data={data}
                          config={element_config}
                          fileType={element_config?.fileNameIdentity}
                        />
                      ) : (
                        <>
                          {!!element_config.img && (
                            <img
                              className='mw-100px p-8px'
                              style={{
                                borderRadius: '5px',
                                border: '1px dashed #D4D4D4',
                                objectFit: 'cover',
                              }}
                              src={data[element_config.key] || ''}
                              alt={data[element_config.key] || ''}
                            />
                          )}
                          <p
                            className='pt-4px pt-0 px-0 m-0 fs-14 fw-semibold text-gray-900 text-break'
                            style={{
                              textAlign: !!element_config.img ? 'center' : 'start',
                            }}
                          >
                            {!!element_config?.dollars &&
                              !!data[element_config.key] &&
                              element_config?.dollars}
                            {element_config.key === 'bankrupted'
                              ? !!data[element_config.key] === false
                                ? 'No'
                                : 'Yes'
                              : element_config.key === 'bankrupt_plan'
                              ? !!data[element_config.key] === false
                                ? 'No'
                                : !!data[element_config.key] === true
                                ? 'Yes'
                                : ''
                              : element_config.date
                              ? moment(data[element_config.key]).isValid()
                                ? moment(data[element_config.key]).format('DD MMM, YYYY')
                                : ''
                              : !!element_config?.number
                              ? numeral(+data[element_config.key]).format('0,0.00')
                              : data[element_config.key]}{' '}
                            {!!element_config?.elBehind && element_config?.elBehind}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TableRender
