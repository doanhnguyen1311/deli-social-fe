import { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/print/lib/styles/index.css";

export const PdfViewer = ({
  base64,
  defaultScale = 1.0,
}: {
  base64: string;
  defaultScale: number;
}) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const layoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const pdfContentType = "application/pdf";
    const base64toBlob = (data: string) => {
      const cleanBase64 = data.replace(/^data:application\/pdf;base64,/, "");
      const bytes = atob(cleanBase64);
      const length = bytes.length;
      const out = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        out[i] = bytes.charCodeAt(i);
      }
      return new Blob([out], { type: pdfContentType });
    };
    setPdfUrl(URL.createObjectURL(base64toBlob(base64)));
  }, [base64]);

  if (!base64) {
    return <div>Please wait...</div>;
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
        {pdfUrl && (
          <Viewer
            fileUrl={pdfUrl}
            defaultScale={defaultScale}
            plugins={[layoutPluginInstance]}
          />
        )}
      </Worker>
    </div>
  );
};
