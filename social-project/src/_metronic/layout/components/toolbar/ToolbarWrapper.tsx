import clsx from 'clsx'
import {PageTitleWrapper} from './page-title'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Button from '@/components/button/Button'
import Icons from '@/components/icons'

interface IProps {}

const ToolbarWrapper = ({}: IProps) => {
  const pathname = useLocation()
  const navigate = useNavigate()

  return (
    <div>
      {pathname.pathname.includes('/application/edit') ? (
        <div className='d-flex flex-row align-items-center justify-content-between pt-6 pb-6'>
          <PageTitleWrapper />
          <Link aria-label={'create new application'} to='/application/create'>
            <Button
              className='btn-primary align-self-center ms-4 fs-6 text-white h-45px'
              disabled={false}
            >
              <Icons name={'AddIcon'} />
              Add New Application
            </Button>
          </Link>
        </div>
      ) : pathname?.pathname.split('/')?.[2] === 'details' &&
        pathname?.pathname.split('/')?.[1] === 'customers' ? (
        <></>
      ) : (
        <PageTitleWrapper />
      )}
    </div>
  )
}

export {ToolbarWrapper}
