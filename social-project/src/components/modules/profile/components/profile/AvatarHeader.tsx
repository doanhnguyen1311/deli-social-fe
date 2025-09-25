import { WithChildren } from '@/_metronic/helpers'
import AvatarUploadOverlay from '@/components/avatar/AvatarUploadOverlay'
import { deleteAvatarUser, uploadAvatarUser } from '@/components/axios/request'
import { DEFAULT_MSG_ERROR } from '@/components/constants'
import { useAuth } from '@/components/context/AuthContext'
import { swalToast } from '@/components/swal-notification'
import { handleImageUpload } from '@/components/utils'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import './style.scss'

interface AvatarProfile {
  avatar: string
}

type Props = {
  classNameWrapper?: string
  className?: string
}

const AvatarHeader: FC<Props & WithChildren> = (props) => {

  const { classNameWrapper, className } = props

  const { currentUser, getUser } = useAuth()

  const [avatarUpload, setAvatarUpload] = useState<string | null>(currentUser?.avatar || null)

  const [loading, setLoading] = useState<boolean>(false)

  const formik = useFormik<AvatarProfile>({
    initialValues: {
      avatar: currentUser?.avatar || '',
    },
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmitForm,
  })

  const { values, setFieldValue } = formik

  useEffect(() => {
    if (values.avatar && values.avatar != currentUser?.avatar) {
      handleSubmitForm()
    }
  }, [values.avatar])

  async function handleDeleteImage() {
    if (!currentUser) return
    setLoading(true)
    try {
      setAvatarUpload(null)
      setFieldValue('avatar', '')
      await deleteAvatarUser()
      swalToast.fire({
        title: 'Your Avatar successfully deleted',
        icon: 'success',
      })
    } catch (error) {
      swalToast.fire({
        title: DEFAULT_MSG_ERROR,
        icon: 'error',
      })
    } finally {
      getUser()
      setLoading(false)
    }
  }

  async function handleSubmitForm() {
    if (!currentUser) return
    setLoading(true)
    try {
      const valuesFormik: AvatarProfile = {
        avatar: values.avatar,
      }
      await uploadAvatarUser(valuesFormik)
      swalToast.fire({
        title: 'Your Avatar successfully updated',
        icon: 'success',
      })
    } catch (error) {
      swalToast.fire({
        title: DEFAULT_MSG_ERROR,
        icon: 'error',
      })
    } finally {
      getUser()
      setLoading(false)
    }
  }

  let avatarInitials = ''

  if (currentUser?.first_name && currentUser?.last_name) {
    avatarInitials = `${currentUser?.last_name[0].toUpperCase()}${currentUser?.first_name[0].toUpperCase()}`
  }

  return (
    <div className={clsx('position-relative', classNameWrapper)}>
      <div
        className={clsx('avatar-header-overview', className)}
        style={{ backgroundColor: 'rgb(192, 192, 192)', zIndex: '2' }}
      >

        {loading ? (
          <div className='fs-14 fw-normal image-name-user rounded-20px'>Please wait...</div>
        ) : (
          <>
            {!avatarUpload && (
              <div className='avatar-text image-name-user rounded-20px'>{avatarInitials}</div>
            )}
            {avatarUpload && (
              <>
                <img
                  src={currentUser ? `${values.avatar}` : avatarUpload}
                  alt='User Avatar'
                  width={160}
                  height={160}
                  className='mw-100 h-auto rounded-100px position-relative avatar rounded-circle'
                  style={{ objectFit: 'cover' }}
                />
                {/* <div
                  className={clsx("d-flex cursor-pointer position-absolute text-hover-danger rounded-circle border bg-white p-8px")}
                  style={{ top: '-30px', right: '-30px', zIndex: '10', boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)' }}
                  onClick={handleDeleteImage}
                >
                  <AiOutlineClose className='icon black-brand-300 fs-3' />
                </div> */}
              </>
            )}
          </>
        )}
        <AvatarUploadOverlay
          classNameWrapper='rounded-100px'
          handleImageUpload={(e) => handleImageUpload(e, { formik, setAvatarUpload, actions: {}, formikField: 'avatar' })}
        />
      </div>
    </div>
  )
}

export default AvatarHeader
