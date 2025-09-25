

import { useEffect } from 'react'
import bgE from '../../images/bgErrors.jpg'
import { Outlet } from 'react-router-dom'

const BODY_CLASSES = ['bgi-size-cover', 'bgi-position-center', 'bgi-no-repeat']
const ErrorsLayout = () => {
  useEffect(() => {
     {
      BODY_CLASSES.forEach((c) => document.body.classList.add(c))

      return () => {
        BODY_CLASSES.forEach((c) => document.body.classList.remove(c))
        document.body.style.backgroundImage = 'none'
      }
    }
  }, [])

  return (
    <div
      style={{
        backgroundImage: `url(${bgE})`,
      }}
      className='d-flex flex-column flex-root'
    >
      <div className='d-flex flex-column flex-center flex-column-fluid'>
        <div className='d-flex flex-column flex-center text-center p-10'>
          <div className='card card-flush  w-lg-650px py-5'>
            <div className='card-body py-15 py-lg-20'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ErrorsLayout }
