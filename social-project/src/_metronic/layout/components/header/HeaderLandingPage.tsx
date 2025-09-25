import { KTIcon } from '@/_metronic/helpers'
import clsx from 'clsx'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '@/components/images/logo.png'
import Button from '@/components/button/Button'
import { useAuth } from '@/components/context/AuthContext'
import mainLogo from '@/components/images/logo.png'

const HeaderLandingPage = () => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()

  const { currentUser } = useAuth()

  const checkActive = (pathname: string, keyword: string): string => {
    return pathname.includes(keyword) ? 'text-primary' : ''
  }

  return (
    <div id='kt_app_header' className='app-header'>
      <div
        style={{
          zIndex: 99,
          background: 'rgba(255, 255, 255, 0.74)',
          boxShadow: '0px 2px 36px rgba(0, 0, 0, 0.04)',
          borderBottom: '1.40px rgba(212, 93, 146, 0.16) solid',
          backdropFilter: 'blur(32px)',
        }}
        id='kt_app_header_container'
        className={clsx('app-container position-fixed top-0 left-0 right-0 px-160px py-16px')}
      >
        <div className='d-flex align-items-center'>
          <Link aria-label={'home'} to='/dashboard' className='d-flex align-items-end me-32px'>
            <>
              {/* <img
                alt='Logo'
                src={logo}
                className='h-56px w-54px me-7px app-sidebar-logo-default theme-light-show'
              /> */}
              <div className='h-100 d-flex flex-column align-self-end align-items-start fs-4 fw-bold black-brand-500'>
                <img
                  src={mainLogo}
                  alt=''
                  className='d-flex align-items-end'
                  style={{ height: '55px', gap: '7px' }}
                />
              </div>
            </>
          </Link>
          <div className='w-100 d-flex align-items-center justify-content-between'>
            <div className='d-flex flex-row gap-64px px-32px'>
              {[
                { label: 'Home', keyword: 'home', path: '/home' },
                { label: 'About Us', keyword: 'about-us', path: '/about-us' },
                { label: 'News', keyword: 'news', path: '/news' },
                { label: 'Our Vision', keyword: 'our-vision', path: '/our-vision' },
                { label: 'Our Mission', keyword: 'our-mission', path: '/our-mission' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={clsx('fs-16 fw-semibold cursor-pointer text-hover-primary', {
                    'text-primary': checkActive(location.pathname, item.keyword),
                    'black-brand-500': !checkActive(location.pathname, item.keyword),
                  })}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </div>
              ))}
            </div>
            <div className='d-flex flex-row gap-12px'>
              <div
                className='p-16px black-brand-500 fw-semibold fs-16 cursor-pointer'
                onClick={() => {
                  currentUser ? navigate('/dashboard') : navigate('/login')
                }}
              >
                Login
              </div>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>

        <div id='kt_app_header_wrapper' className='d-flex justify-content-end ms-auto'></div>
      </div>
    </div>
  )
}

export default HeaderLandingPage
