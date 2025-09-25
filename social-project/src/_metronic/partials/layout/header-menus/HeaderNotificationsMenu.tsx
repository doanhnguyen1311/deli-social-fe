 


import request from '@/components/axios'
import { useStatus } from '@/components/hooks/useStatus'
import NoRecord from '@/components/no-records'
// import { CashInOutListing } from '@/components/types/cashbook'
import { logger } from '@/components/utils'
import clsx from 'clsx'
import { FC, useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import './style.scss'

type Props = {
  className?: string
  active?: boolean
}

const HeaderNotificationsMenu: FC<Props> = ({className, active}) => {
  // const [cashInOutListing, setCashInOutListing] = useState<CashInOutListing[]>([])
  const [status, setStatus] = useStatus('')

  useEffect(() => {
    if (active) {
      handleGetCashInOutPendingListing()
    }
  }, [active])

  const controller = useRef<AbortController>(null)

  async function handleGetCashInOutPendingListing() {
    try {
      setStatus('pending')
      controller?.current?.abort()
      controller.current = new AbortController()

      const {data} = await request.post('/cashbook/cash-in-out-pending')
      // setCashInOutListing(data?.data || [])
      setStatus('fulfilled')
    } catch (error) {
      setStatus('rejected')
      logger(error)
    }
  }

  return (
    <div className={clsx(['w-350px w-lg-375px card py-24px', className])}>
      <h3 className='fs-16 fw-bold px-24px pb-16px border-bottom border-gray-200'>Notifications</h3>

      <div
        className='d-flex flex-column overflow-auto'
        style={{
          maxHeight: '60vh',
        }}
      >
        {/* {status === 'pending' ? (
          <span className='fs-14 px-24px py-8px text-center'>Loading...</span>
        ) : status === 'rejected' || cashInOutListing?.length === 0 ? (
          <div className='pt-8px'>
            <NoRecord />
          </div>
        ) : (
          cashInOutListing.map((el, i) => {
            const isSafeBox = el.type?.startsWith('Safe Box')
            const isCashIn = el.type_transaction === 'Cash In'

            return (
              <>
                <div
                  className={clsx([
                    'notification-item border-gray-200 px-24px py-16px',
                    i > 0 && 'border-top',
                  ])}
                  key={el.id}
                >
                  <span className='fs-14 text-gray-700'>
                    Has{' '}
                    <strong>
                      {isCashIn ? el?.from_counter?.counter_name : el?.to_counter?.counter_name}
                    </strong>{' '}
                    received money from
                    {isSafeBox ? ' safe box' : ''}?
                  </span>

                  <div className='d-flex align-items-center gap-16px mt-12px'>
                    <Button className='btn-sm btn-light-danger'>Decline</Button>
                    <Button className='btn-sm btn-primary'>Approved</Button>
                  </div>
                </div>
              </>
            )
          })
        )} */}
      </div>
    </div>
  )
}

export { HeaderNotificationsMenu }
