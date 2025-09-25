import Button from '@/components/button/Button'
import Modal from '@/components/modal/Modal'
import { swalToast } from '@/components/swal-notification'
import { Dispatch, FC, MutableRefObject, SetStateAction, useRef } from 'react'
// import SignatureCanvas from 'react-signature-canvas'

type Props = {
  setSignatureBase64: Dispatch<
    SetStateAction<{
      guarantor: string
      borrower: string
    }>
  >
  onClose: () => void
  data: any
  loading: boolean
}

const CreateSignatureModal: FC<Props> = ({data, loading, onClose, setSignatureBase64}) => {
  const signatureRef = useRef<any>({})
  const signatureGuarantorRef = useRef<any>({})

  function clearSignature(ref: MutableRefObject<any>) {
    ref?.current?.clear()
  }

  function handlePreviewContract() {
    if (
      signatureRef.current?.isEmpty() ||
      (data?.guarantor_identification_no && signatureGuarantorRef.current?.isEmpty())
    ) {
      return swalToast.fire({
        icon: 'error',
        title: `Please create ${
          data?.guarantor_identification_no ? 'all signatures' : 'signature'
        }`,
      })
    }

    const base64Signature = signatureRef?.current?.getTrimmedCanvas()?.toDataURL('image/png')
    const base64SignatureGuarantor =
      signatureGuarantorRef?.current?.getTrimmedCanvas &&
      signatureGuarantorRef?.current?.getTrimmedCanvas()?.toDataURL('image/png')
    setSignatureBase64({
      guarantor: base64SignatureGuarantor || '',
      borrower: base64Signature || '',
    })
  }

  return (
    <Modal onClose={onClose} dialogClassName='w-700px' show={true} title='Create Signature'>
      <div className='overflow-auto p-30px'>
        <div className='d-flex flex-column gap-24px'>
          <div>
            <h3 className='fs-16 fw-medium mb-12px'>Create your signature below (for Borrower):</h3>

            <div className='d-flex justify-content-between align-items-end gap-16px'>
              {/* <SignatureCanvas
                ref={signatureRef}
                penColor='black'
                canvasProps={{
                  width: 450,
                  height: 150,
                  className: 'border border-gray-600 card',
                }}
              /> */}

              <Button className='btn-secondary' onClick={() => clearSignature(signatureRef)}>
                Clear
              </Button>
            </div>
          </div>

          {data?.guarantor_identification_no && (
            <div>
              <h3 className='fs-16 fw-medium mb-12px'>Create your signature below (for Surety):</h3>

              <div className='d-flex align-items-end  justify-content-between gap-16px'>
                {/* <SignatureCanvas
                  ref={signatureGuarantorRef}
                  penColor='black'
                  canvasProps={{
                    width: 450,
                    height: 150,
                    className: 'border border-gray-600 card',
                  }}
                /> */}

                <Button
                  className='btn-secondary'
                  onClick={() => clearSignature(signatureGuarantorRef)}
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='border-top border-gray-200 p-30px gap-3'>
        <div className='d-flex align-items-center justify-content-end gap-8px'>
          {/* <Button
            className='btn-light btn-active-light-primary'
            disabled={loading}
            onClick={clearSignature}
          >
            Clear
          </Button> */}
          <Button disabled={loading} loading={loading} onClick={handlePreviewContract}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateSignatureModal
