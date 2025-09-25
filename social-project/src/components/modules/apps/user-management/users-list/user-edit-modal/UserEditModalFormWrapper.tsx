import { isNotEmpty, QUERIES } from '@/_metronic/helpers'
import { logger } from '@/components/utils'
import { useQuery } from 'react-query'
import { getUserById } from '../core/_requests'
import { useListView } from '../core/ListViewProvider'
import { UserEditModalForm } from './UserEditModalForm'

const UserEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getUserById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (e) => {
        setItemIdForUpdate(undefined)
        logger(e, 'error')
      },
    }
  )

  if (!itemIdForUpdate) {
    return <UserEditModalForm isUserLoading={isLoading} user={{id: undefined}} />
  }

  if (!isLoading && !error && user) {
    return <UserEditModalForm isUserLoading={isLoading} user={user} />
  }

  return null
}

export { UserEditModalFormWrapper }

