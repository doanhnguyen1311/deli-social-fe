import successIcon from '@/components/images/check-circle.png';
import errorIcon from '@/components/images/information-3.png';
import timeUpload from "@/components/images/time-upload.png";
import Swal from 'sweetalert2';
import './styles.scss';

const base64 = "data:image/png;base64,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"

export const swalToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  showCloseButton: true,
  customClass: {
    title: 'fs-4',
    closeButton: 'order-5',
  },
})

export const swalToastCustom = Swal.mixin({
  toast: true,
  position: 'top-end',
  allowOutsideClick: false,
  allowEscapeKey: false,
  allowEnterKey: false,
  showConfirmButton: false,
  showCloseButton: false,
  showClass: {
    popup: 'p-0px swal-toast-custom',
    backdrop: 'w-400px p-0px bg-transparent',
  },
  customClass: {
    title: 'fs-4',
    closeButton: 'order-5',
  },
})

export const swalConfirm = Swal.mixin({
  icon: 'warning',
  iconHtml: `<img src="${base64}" alt="warning" class="w-60px h-60px" />`,
  buttonsStyling: false,
  showCancelButton: true,
  confirmButtonText: 'Delete',
  cancelButtonText: 'No',
  focusCancel: true,
  customClass: {
    title: 'dark-gray-500 fs-20-line-30 fw-bold mb-4px',
    htmlContainer: 'fs-3 d-flex flex-column gap-4px black-brand-300 fw-semibold p-0',
    confirmButton: 'order-0 fs-5 btn btn-lg btn-primary fs-14 m-0 flex-grow-1 px-16px py-14px rounded-8px d-inline-flex align-items-center justify-content-center',
    cancelButton: 'btn btn-lg order-1 fs-5 btn-secondary fs-14 m-0 flex-grow-1 px-16px py-14px rounded-8px',
    actions: 'd-flex justify-content-center w-100 gap-16px m-0 mt-24px',
  },
})

export const swalSuccess = Swal.mixin({
  icon: 'success',
  iconHtml: `<img src=${successIcon} alt="success" class="w-60px h-60px" />`,
  buttonsStyling: false,
  showCancelButton: true,
  focusCancel: true,
  customClass: {
    popup: 'px-24px pt-32px pb-24px',
    title: 'dark-gray-500 fs-20-line-30 fw-bold mb-4px',
    htmlContainer: 'fs-3 d-flex flex-column gap-4px black-brand-300 fw-semibold p-0',
    cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary fs-14 m-0 flex-grow-1 px-16px py-14px rounded-8px',
    confirmButton: 'order-1 fs-5 btn btn-lg btn-primary fs-14 m-0 flex-grow-1 px-16px py-14px rounded-8px d-inline-flex align-items-center justify-content-center',
    actions: 'd-flex justify-content-center w-100 gap-16px m-0 mt-24px',
  },
})

export const swalFail = Swal.mixin({
  icon: 'warning',
  iconHtml: `<img src="${base64}" alt="warning" class="w-60px h-60px" />`,
  buttonsStyling: false,
  focusCancel: true,
  customClass: {
    popup: 'p-24px',
    title: 'dark-gray-500 fs-20-line-30 fw-bold mb-4px',
    htmlContainer: 'fs-3 d-flex flex-column gap-4px black-brand-300 fw-semibold p-0',
    cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary fs-14 m-0 flex-grow-1 px-16px py-14px rounded-8px',
    confirmButton: 'order-1 fs-5 btn btn-lg btn-primary fs-14 m-0 flex-grow-1 px-16px py-14px rounded-8px d-inline-flex align-items-center justify-content-center',
    actions: 'd-flex justify-content-center w-100 gap-16px m-0 mt-24px',
  },
})

export const swalUncoverable = Swal.mixin({
  icon: 'warning',
  buttonsStyling: false,
  showCancelButton: true,
  confirmButtonText: 'Confirm',
  focusCancel: true,
  customClass: {
    popup: 'p-24px',
    htmlContainer: 'fs-3 overflow-hidden',
    cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary fs-14 m-0 flex-grow-1',
    confirmButton: 'order-1 fs-5 btn btn-lg btn-danger fs-14 m-0 flex-grow-1',
    actions: 'd-flex justify-content-center w-100 gap-16px m-0 mt-24px',
  },
})

export const swalConfirmCancel = Swal.mixin({
  icon: 'warning',
  buttonsStyling: false,
  showCancelButton: true,
  confirmButtonText: 'Yes',
  cancelButtonText: 'No, return',
  focusCancel: true,
  customClass: {
    htmlContainer: 'fs-3 d-flex flex-column gap-4px black-brand-300 fw-semibold',
    cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary fs-14 m-0 flex-grow-1',
    confirmButton: 'order-1 fs-5 btn btn-lg btn-danger fs-14 m-0 flex-grow-1',
    actions: 'd-flex justify-content-center w-100 gap-16px m-0 mt-24px',
  },
})
