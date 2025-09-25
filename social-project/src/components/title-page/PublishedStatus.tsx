
type Props = {
  value: number
}

const PublishStatus = ({value}: Props) => {
  const badgeClass = value === 1 ? 'badge-light-success' : 'badge-light-warning'
  const statusText = value === 1 ? 'Published' : 'Unpublished'

  return (
    <div
      className={`badge ${badgeClass}`}
      style={{
        border: '1px solid',
        borderRadius: '30px',
        padding: '7px 10px',
      }}
    >
      ● {statusText}
    </div>
  )
}

export default PublishStatus
