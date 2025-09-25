import { getApplicationStatusValue } from '@/components/utils'

const UserStatusTeam = ({ UserStatus }: any) => {
  const borderStyle = '1px solid'

  let badgeClass = ''
  if (UserStatus === 0) {
    badgeClass = 'badge-light-warning'
  } else if (UserStatus === 1) {
    badgeClass = 'badge-light-success'
  } else if (UserStatus === 2) {
    badgeClass = 'badge-light-danger'
  }

  return (
    <div
      className={`badge ${badgeClass}`}
      style={{
        border: borderStyle,
        borderRadius: '30px',
        padding: '7px 10px',
      }}
    >
      ● {getApplicationStatusValue(UserStatus)}
    </div>
  )
}

export default UserStatusTeam
