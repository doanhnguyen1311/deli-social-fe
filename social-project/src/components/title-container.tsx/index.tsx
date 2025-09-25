import {Link} from 'react-router-dom'
import { ReactNode } from 'react'
import './styles.scss'

type Props = {
  data: {
    title: string
    link: {
      to: string
      titleLink: string
    }[]
    render: string[]
    linkWhite?: {
      to: string
      titleLink: string
    }[]
  }
  children?: ReactNode
  symbolSeparator?: string
}

const TitleContainer = ({data, symbolSeparator = '-', children}: Props) => {
  return (
    <div className='w-100 d-flex justify-content-between align-items-center py-32px'>
      <div className='flex-grow-1 wrapper-title-container'>
        <div className='wrapper bg-transparent d-flex flex-column align-items-start py-8px py-md-0'>
          <h1 className='page-heading d-flex dark-gray-500 fw-semibold fs-24 my-0 flex-column justify-content-center'>
            {data.title}
          </h1>
          <div className='d-flex justify-content-center align-items-center '>
            {data?.link.map((el, i) => {
              return (
                <div key={i} className='d-flex justify-content-center align-items-center '>
                  <Link
                    aria-label={'link'}
                    to={el?.to}
                    className='text-muted text-hover-primary fs-7 fw-semibold'
                  >
                    {el.titleLink}
                  </Link>
                  <div className='px-2'>{symbolSeparator}</div>
                </div>
              )
            })}
            {(data?.linkWhite || []).map((el, i) => {
              return (
                <div key={i} className='d-flex justify-content-center align-items-center '>
                  <Link aria-label={'link'} to={el?.to} className='fs-7 fw-semibold'>
                    {el?.titleLink}
                  </Link>
                  <div className='px-2'>{symbolSeparator}</div>
                </div>
              )
            })}
            {data?.render.map((e, i) => {
              return (
                <div key={i} className='d-flex justify-content-center align-items-center '>
                  <p className='breadcrumb-item text-dark p-0 m-0 fs-7 fw-semibold'>{e}</p>
                  {i + 1 < data?.render.length && <div className='px-2'>{symbolSeparator}</div>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default TitleContainer
