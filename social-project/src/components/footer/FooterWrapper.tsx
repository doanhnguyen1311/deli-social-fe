import clsx from 'clsx'
import {Footer} from './Footer'
import {FC} from 'react'
import {useLayout} from '@/components/core'

type Props = {
  className?: string
}

const FooterWrapper: FC<Props> = ({className}) => {
  const {config} = useLayout()
  
  if (!config.app?.footer?.display) {
    return null
  }

  return (
    <div className='app-footer w-100 h-40px' id='kt_app_footer'>
      {config.app.footer.containerClass ? (
        <div
          className={clsx(
            'app-container justify-content-start text-start w-100',
            config.app.footer.container === 'fixed' ? '' : 'container-fluid',
            className
          )}
        >
          <Footer />
        </div>
      ) : (
        <Footer />
      )}
    </div>
  )
}

export {FooterWrapper}
