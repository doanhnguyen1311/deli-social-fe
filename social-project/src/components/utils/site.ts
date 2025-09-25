import { swalToast } from '../swal-notification'

export async function openFileBase64({ base64, type }: { base64: string; type: string }) {
  try {
    let fullBase64: string;

    if (!base64.startsWith('data:')) {
      if (type === 'pdf') {
        fullBase64 = `data:application/pdf;base64,${base64}`;
      } else if (type === 'csv') {
        fullBase64 = `data:text/csv;base64,${base64}`;
      } else {
        fullBase64 = `data:image/${type};base64,${base64}`;
      }
    } else {
      fullBase64 = base64;
    }

    const blob = await fetch(fullBase64).then(res => res.blob());
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, '_blank');
  } catch (error) {
    console.error('Error opening the file:', error);
    swalToast.fire({
      icon: 'error',
      title: 'An error occurred while opening the file.',
    });
  }
}

export function removeMimeType(base64String: string) {
  const mimeRegex = /^data:application\/(pdf|jpeg|png);base64,/

  if (mimeRegex.test(base64String)) {
    return base64String.replace(mimeRegex, '')
  } else {
    return base64String
  }
}

export async function openFileWithBase64({ base64, type }: { base64: string; type: string }) {
  const blob = await fetch(base64).then((res) => res.blob())
  const blobUrl = URL.createObjectURL(blob)

  if (type === 'application/pdf' || type.startsWith('image/')) {
    window.open(blobUrl, '_blank')
  } else {
    swalToast.fire({
      icon: 'error',
      title: 'Preview not supported for this file type.',
    })
  }
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}