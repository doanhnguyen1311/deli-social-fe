import React, { Dispatch, useCallback } from "react";
import useDrivePicker from "react-google-drive-picker";
import GoogleDriver from "@/components/images/GoogleDriver.png";

import clsx from "clsx";
import { convertSize } from "../utils";

type Props = {
  className?: string;
  uploadedFiles: any[];
  setUploadedFiles: Dispatch<React.SetStateAction<any[]>>;
};
declare global {
  interface Window {
    gapi: any;
  }
}
const GoogleDriverPicker = ({
  className,
  uploadedFiles,
  setUploadedFiles,
}: Props) => {
  const [openPicker, authResponse] = useDrivePicker();

  const fetchFileFromGoogleDrive = async (fileId, accessToken) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching file from Google Drive:", error);
      return null;
    }
  };

  const getBase64Size = (base64String) => {
    let padding = 0;
    if (base64String.endsWith("==")) padding = 2;
    else if (base64String.endsWith("=")) padding = 1;

    const base64Length = base64String.length;
    const sizeInBytes = (base64Length * 3) / 4 - padding;

    const sizeInKB = sizeInBytes / 1024;
    const sizeInMB = sizeInKB / 1024;

    return {
      bytes: sizeInBytes,
      kb: sizeInKB.toFixed(2),
      mb: sizeInMB.toFixed(2),
    };
  };

  const convertFileToBase64Drvie = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleOpenPicker = useCallback(() => {
    openPicker({
      clientId: import.meta.env.VITE_GOOGLE_DRIVER_CLIENT_ID,
      developerKey: import.meta.env.VITE_GOOGLE_DEV_API_KEY,
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: async (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
          return;
        }

        if (data.action === "picked" && data.docs && data.docs.length > 0) {
          try {
            const accessToken = authResponse?.access_token;

            if (!accessToken) {
              console.error("Access token not available");
              return;
            }

            const formattedFiles = await Promise.all(
              data.docs.map(async (doc) => {
                const fileBlob = await fetchFileFromGoogleDrive(
                  doc.id,
                  accessToken
                );

                if (!fileBlob) {
                  console.error("Could not fetch file:", doc.name);
                  return null;
                }

                const base64Data = await convertFileToBase64Drvie(fileBlob);

                return {
                  id: doc.name,
                  type: doc.mimeType,
                  file_name: doc.name,
                  size: doc?.sizeBytes || 0,
                  file_path: base64Data,
                };
              })
            );

            const validFiles = formattedFiles.filter((file) => file !== null);

            setUploadedFiles((prev) => [...prev, ...validFiles]);
          } catch (error) {
            console.error("Error processing selected files:", error);
          }
        }
      },
    });
  }, [openPicker, authResponse, setUploadedFiles]);
  return (
    <div
      className={clsx(["", className])}
      onClick={handleOpenPicker}
      style={{ cursor: "pointer" }}
    >
      <img
        src={GoogleDriver}
        alt="Google Drive"
        className="d-flex align-items-center"
      />
      <div className="fs-14 fw-semibold medium-gray-500">Google Drive</div>
    </div>
  );
};

export default GoogleDriverPicker;
