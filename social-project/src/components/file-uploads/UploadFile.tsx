import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

const UploadFileAI = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Các định dạng được phép (video và audio)
  const allowedTypes = [
    "video/mp4",
    "video/mpeg",
    "video/x-msvideo",
    "video/quicktime",
    "video/x-matroska", // MKV
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/mp4",
  ];

  const allowedExtensions = [
    "mp4",
    "mpeg",
    "avi",
    "mov",
    "mkv",
    "mp3",
    "wav",
    "ogg",
    "aac",
  ];

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: File[] = [];

    for (const file of Array.from(files)) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const isValidFile =
        allowedTypes.includes(file.type) ||
        (fileExtension && allowedExtensions.includes(fileExtension));

      if (!isValidFile) {
        Swal.fire({
          title: "File type not allowed.",
          text: "Please upload a valid video or audio file.",
          icon: "warning",
        });
        continue;
      }

      newFiles.push(file);
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  return { uploadedFiles, handleChangeFile };
};

export default UploadFileAI;
