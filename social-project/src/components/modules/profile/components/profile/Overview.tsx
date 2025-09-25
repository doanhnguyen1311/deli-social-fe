
import { KTIcon } from '@/_metronic/helpers';
import { useAuth } from '@/components/context/AuthContext';
import ClockIcon from '@/components/images/clock-icon.png';
import logoDefault from "@/components/images/logo.png";
import { getCountryName, getFullName, getUserRole, getUserTitle } from '@/components/utils';
import clsx from 'clsx';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import AvatarHeader from './AvatarHeader';
import RoleBadge from './RoleBadge';

export const Overview: React.FC = () => {

  const { currentUser } = useAuth()

  const { pathname } = useLocation()

  const navigate = useNavigate()

  return (
    <>
      <div className='card account-profile rounded-20px bg-white flex-column gap-12px h-100'>
        <div className='card-body px-12px pt-110px pb-12px'>
          <div className='avatar d-flex justify-content-center position-absolute top-0 bottom-0 start-0 end-0 h-0 w-100'>
            <AvatarHeader
              classNameWrapper='avatar-border p-20px bottom-100px h-200px w-200px'
              className='rounded-90px position-relative'
            />
          </div>
          <div className='info p-12px d-flex flex-column align-items-center'>
            <div className='role text-center mb-12px'>
              <span className='fs-11 fw-semibold grey-600'>
                <RoleBadge
                  classNameWrapper='border-primary-100'
                  className='primary-500'
                  role={getUserRole(currentUser?.role) as string} />
              </span>
            </div>
            <div className='name text-center mb-4px'>
              <span className='fs-24 fw-semibold dark-gray-500 text-capitalize'>
                {getUserTitle(currentUser)} {getFullName(currentUser)}
              </span>
            </div>
            <div className='email text-center mb-24px'>
              <span className='fs-12 fw-normal medium-gray-500'>
                {currentUser?.email}
              </span>
            </div>
            <div className='company-border border rounded-100px p-4px pe-24px d-flex min-w-200px min-h-60px mb-24px'>
              <div className='d-flex'>
                <div className='company-logo me-12px rounded-100px object-fit-contain border'>
                  <img
                    src={logoDefault}
                    alt='logo'
                    className='w-60px h-60px object-fit-contain p-5px'

                  />
                </div>
                <div className='company-info d-flex flex-column align-items-start justify-content-center'>
                  <div className='company-name text-center fs-14 fw-normal dark-gray-500'>
                    BreezChat Plaform
                  </div>
                  <div className='company-address text-center fs-12 fw-normal medium-gray-500'>
                    {getCountryName(currentUser?.country_id)}
                  </div>
                </div>
              </div>
            </div>
            <div className='info-nav text-center d-none d-lg-block'>
              <div
                className={clsx('nav-item cursor-pointer mb-12px fs-12 d-flex align-items-center justify-content-center', pathname === '/account/overview' ? 'primary-500' : 'dark-gray-500')}
                onClick={() => navigate('/account/overview')}
              >
                <span className='me-4px'>User Information</span>
                <KTIcon iconName='right' className={clsx('fs-12 fw-normal', pathname === '/account/overview' ? 'primary-500' : 'dark-gray-500')} />
              </div>
              {/* <div
                className={clsx('nav-item cursor-pointer mb-12px fs-12 d-flex align-items-center justify-content-center', pathname === '/account/company' ? 'primary-500' : 'dark-gray-500')}
                onClick={() => navigate('/account/company')}
              >
                <span className='me-4px'>Company Information</span>
                <KTIcon iconName='right' className={clsx('fs-12 fw-normal', pathname === '/account/company' ? 'primary-500' : 'dark-gray-500')} />
              </div> */}
            </div>
          </div>
        </div>
        <div className='card-footer p-12px border-0'>
          <div className='p-12px'>
            <div className='border-top mb-24px'>
            </div>
            <div className='d-flex flex-row gap-8px mb-8px'>
              <img src={ClockIcon} alt='time' width={16} height={16} className='d-flex align-self-center size-icon' />
              <div className='medium-gray-500 fs-12 fw-normal'>
                Joined date
                <span className='fs-12 dark-gray-500 fw-normal ms-8px'>
                  {moment(currentUser?.created_at).format('DD MMM, YYYY')}
                </span>
              </div>
            </div>
            <div className='d-flex flex-row gap-8px'>
              <img src={ClockIcon} alt='time' width={16} height={16} className='d-flex align-self-center size-icon' />
              <div className='medium-gray-500 fs-12 fw-normal'>
                Updated date
                <span className='fs-12 dark-gray-500 fw-normal ms-8px'>
                  {moment(currentUser?.updated_at).format('DD MMM, YYYY')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
