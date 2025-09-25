import { checkIsActive, KTIcon, WithChildren } from '@/_metronic/helpers'
import { useLayout } from '@/components/core'
import { Tooltip } from 'bootstrap'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

type Props = {
  to: string;
  title: string;
  tooltip?: string;
  icon?: any;
  fontIcon?: string;
  hasBullet?: boolean;
  disabled?: boolean;
  isSvg?: boolean
  Icon?: any;
  IconSolid?: any
}

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  disabled = false,
  tooltip = "",
  isSvg = false,
  Icon,
  IconSolid
}) => {

  const { pathname } = useLocation()

  const [isHover, setIsHover] = useState(false)

  const isActive = checkIsActive(pathname, to)

  const { config } = useLayout()

  const { app } = config

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipInstances: Tooltip[] = []

    const handleClick = (tooltip: Tooltip) => () => tooltip.hide()

    tooltipTriggerList.forEach((el) => {
      const tooltip = new Tooltip(el)
      tooltipInstances.push(tooltip)

      const clickHandler = handleClick(tooltip)
      el.addEventListener('click', clickHandler)

        // Save the handler so we can remove it later if needed
        ; (el as any)._clickHandler = clickHandler
    })

    return () => {
      tooltipTriggerList.forEach((el) => {
        const handler = (el as any)._clickHandler
        if (handler) {
          el.removeEventListener('click', handler)
        }
      })
      tooltipInstances.forEach((tooltip) => tooltip.dispose())
    }
  }, [])

  return (
    <div className={clsx(
      'menu-item mb-8px mx-0 p-0',
      isActive && 'menu-item-active',
      disabled && 'menu-item-disabled'
    )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link
        aria-label={'link'}
        className={clsx(
          'menu-link without-sub justify-content-center p-12px rounded-16px w-60px h-60px position-relative',
          { active: isActive, hover: isHover, disabled: disabled }
        )}
        to={to}
        data-bs-toggle="tooltip"
        data-bs-title={title}
        data-bs-placement="right"
      >
        {isActive && (
          <div
            className={clsx(
              "position-absolute top-20px start-0 w-4px h-20px",
              isActive && "bg-primary",
            )}
            style={{ borderRadius: "0px 4px 4px 0px" }}
          />
        )}
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {!isSvg && icon && app?.sidebar?.default?.menu?.iconType === "svg" && (
          <span className={clsx("menu-icon me-0", isActive || isHover ? "primary-500": "tertiary-100")}
          >
            {" "}
            <KTIcon
              iconName={icon}
              iconType={isActive || isHover ? "solid" : "outline"}
              className="fs-2"
            />
          </span>
        )}
        {isSvg && Icon && IconSolid &&
          <span className={clsx("menu-icon me-0", isActive || isHover ? "primary-500": "tertiary-100")}>
            {isActive || isHover ? IconSolid : Icon}
          </span>
        }
        {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
          <i className={clsx('bi fs-3', fontIcon)}></i>
        )}
        {/* {title && (
          <span className='menu-title fs-13 fw-normal black-brand-300'>{title}</span>
        )} */}
      </Link>
      {children}
    </div>
  )
}

export { SidebarMenuItem }

