import { KTIcon } from '@/_metronic/helpers'
import { useAuth } from '@/components/context/AuthContext'
import { UsersListFilter } from '@/components/modules/apps/user-management/users-list/components/header/UsersListFilter'
import { TableConfig } from '@/components/types'
import { useMemo } from 'react'

type Props = {
  config: TableConfig
  handleAddNew: () => void
}

const ToolBar = ({config, handleAddNew}: Props) => {
  const {settings} = config
  const {currentUser} = useAuth()
  const {buttonAddNew, showFilter, showAddNewButton = true}: any = settings

  const checkNewButton = useMemo(() => {
    if (
      settings?.endPointGetListing === '/config/branch' 
      // &&
      // currentUser?.priority !== UserStatus['SUPER-ADMIN']
    ) {
      return false
    }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {showFilter && <UsersListFilter />}

      {checkNewButton && showAddNewButton && (
        <button onClick={handleAddNew} type='button' className='btn btn-primary fs-6'>
          <KTIcon iconName='plus' className='fs-2' />
          {buttonAddNew}
        </button>
      )}
    </div>
  )
}

export default ToolBar
