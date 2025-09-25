import React from 'react'
import { Overview } from './Overview'
import clsx from 'clsx'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const AccountPage: React.FC = () => {

    const { pathname } = useLocation();

    const navigate = useNavigate();

    return (
        <div className='d-flex flex-column h-100 p-16px'>
            <div className='row overflow-y-auto px-xl-50px px-xxl-160px pt-160px'>
                <div className='col-12 col-lg-4 d-flex flex-column'>
                    <Overview />
                    <div className='card info-nav text-start d-flex flex-row d-lg-none my-16px rounded-16px overflow-x-auto'>
                        <div
                            className={clsx('m-4px me-8px p-12px rounded-8px cursor-pointer fs-14 d-flex align-items-center justify-content-center', pathname === '/account/overview' ? ' bg-blue-50 blue-500' : 'dark-gray-500')}
                            onClick={() => navigate('/account/overview')}
                        >
                            <span className='text-nowrap'>User Information</span>
                        </div>
                        {/* <div
                            className={clsx('m-4px mx-0px p-12px rounded-8px cursor-pointer fs-14 d-flex align-items-center justify-content-center', pathname === '/account/company' ? ' bg-blue-50 blue-500' : 'dark-gray-500')}
                            onClick={() => navigate('/account/company')}
                        >
                            <span className='text-nowrap'>Company Information</span>
                        </div> */}
                    </div>
                </div>
                <div className='col-12 col-lg-8 d-flex flex-column'>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default AccountPage
