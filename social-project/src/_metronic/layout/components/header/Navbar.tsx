/// <reference types='vite-plugin-svgr/client' />

import clsx from 'clsx'
import { HeaderNotificationsMenu } from '../../../partials'
import { AiOutlineSetting } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { KTIcon } from '../../../helpers'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Avatar from '@/components/modules/profile/components/profile/Avatar'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/context/AuthContext'
import HeaderUserMenu from '@/_metronic/partials/layout/header-menus/HeaderUserMenu'
import './style.scss'
import { getFullName, getUserRole, logger } from '@/components/utils'
import { useLayout } from '@/components/core'
import { UserStatus } from '@/components/types/enum'
import CashBookIcon from '@/components/images/cashbook.svg?react'
import { useStatus } from '@/components/hooks/useStatus'
import { DataResponse, PayloadGetListing } from '@/components/types'
import { AnyObject } from 'yup'
import request from '@/components/axios'

import { useSocket } from '@/components/context/SocketContext'

import logoutIcon from '@/components/images/logoutIcon.png'

const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px'
const btnIconClass = 'fs-2'

const Navbar = () => {
  const [isBigMonitor, setIsBigMonitor] = useState<boolean>(
    document.documentElement.clientWidth > 992
  )

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth
      setIsBigMonitor(clientWidth >= 992)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      setIsBigMonitor(true)
    }
  }, [document.documentElement.clientWidth > 992])

  const userAvatarClass = 'w-100'

  const userAvatarClassMobile = 'w-100 p-16px'

  const { logout, currentUser } = useAuth()
  const [dropDownAccount, setDropDownAccount] = useState(false)

  const handleMouseEnter = () => {
    setDropDownAccount(true)
  }

  const handleMouseLeave = () => {
    setDropDownAccount(false)
  }

  return (
    <div className='d-flex app-navbar mw-200px mw-2xxl-250px'>
      <div className='app-navbar-item mw-200px mw-2xxl-250px'>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className='app-navbar-item mw-200px mw-2xxl-250px'
        >
          <div
            className={clsx(
              'cursor-pointer symbol',
              isBigMonitor ? userAvatarClass : userAvatarClassMobile
            )}
          >
            <div className='navbar-user-custom-non-metronic p-4px pe-8px d-flex algign-items-center gap-16px rounded-100px bg-light-gray-300'>
              <Avatar
                style={{
                  width: 42,
                  height: 42,
                }}
              />
              <div className="d-flex flex-column align-self-center text-truncate">
                <div className="fw-semibold dark-gray-500 fs-14 d-block text-truncate">
                  {getFullName(currentUser)}
                </div>
                <span
                  className="fw-normal light-gray-700 text-hover-primary fs-12 d-block text-truncate"
                >
                  {getUserRole(currentUser?.role)}
                </span>
              </div>
              <KTIcon
                  iconName="down"
                  className="fs-18 primary-500"
                />
              {dropDownAccount && (
                <div className='dropdown-fixed fs-6 w-300px dropdown-menu-application app-header-menu border-user-menu'>
                  <HeaderUserMenu />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className='d-flex h-100 align-self-center text-white align-items-center cursor-pointer gap-8px'
        onClick={logout}
      >
        <div>Logout</div>
        <img src={logoutIcon} alt='' />
      </div> */}
    </div>
  )
}

export default Navbar
