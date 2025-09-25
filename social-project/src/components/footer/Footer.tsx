


import { useEffect } from 'react'
import { ILayout } from '../../_metronic/layout/core'
import clsx from 'clsx'
import { useLayout } from '@/components/core'

const Footer = () => {
  const { config } = useLayout()
  useEffect(() => {
    updateDOM(config)
  }, [config])
  return (
    <div className="d-flex w-100 justify-content-center align-items-center gap-8px tertiary-100">
      <span className="menu-title fs-12 fw-normal text-center">
        Copyright &copy; 2025 BreezChat. All rights Reserved
      </span>
      {/* {"-"}
      <span className="menu-title fs-12 fw-normal text-center">
        Powered by Breezdoc
      </span> */}
    </div>
  )
}

const updateDOM = (config: ILayout) => {
  {
    if (config.app?.footer?.fixed?.desktop) {
      document.body.classList.add('data-kt-app-footer-fixed', 'true')
    }

    if (config.app?.footer?.fixed?.mobile) {
      document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true')
    }
  }
}

export { Footer }
