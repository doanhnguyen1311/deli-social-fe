import {Link} from 'react-router-dom'
import React from 'react'
import './style.scss'
import { KTIcon } from '@/_metronic/helpers'

type Level = {
  title: string
  url: string
}

type Props = {
  level1: Level
  level2?: Level
  level3?: Level
}

const TitlePage: React.FC<Props> = ({ level1, level2, level3 }) => {
  return (
    <div className='d-flex align-items-center page-title-component' >
      {/* Level 1 */}
      <Link to={level1.url} className='main-title cursor-pointer'>
        {level1.title}
      </Link>

      {/* Separator for Level 1 */}
      {level2 && (
        <>
            <KTIcon iconName='right' className='sub-title dark-gray-500 mx-4px'/>
          {/* Level 2 */}
          <Link to={level2.url} className='sub-title black-200 cursor-pointer text-truncate text-hover-primary'>
            {level2.title}
          </Link>
        </>
      )}

      {/* Separator for Level 2 */}
      {level3 && level3.title && (
        <>
            <KTIcon iconName='right' className='sub-title dark-gray-500 mx-4px'/>
          {/* Level 3 */}
          <div className='sub-title black-200 text-truncate'>{level3.title}</div>
        </>
      )}
    </div>
  )
}

export default TitlePage
