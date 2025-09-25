import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../checkbox";
import Button from "../button/Button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState<boolean>(false);

  const call = useCall();

  if (!call) {
    throw new Error("Call not found");
  }

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera?.disable();
      call?.microphone?.disable();
    } else {
      call?.camera?.enable();
      call?.microphone?.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);

  return (
    <div className="d-flex h-100 w-100 align-items-center justify-content-center flex-column gap-8px">
      <div className="d-flex flex-column gap-12px">
        <div className="fs-30 fw-bold text-gray-500 text-center">Setup</div>
        <div className="d-flex w-100 align-items-center jsutify-content-center">
          <VideoPreview />
        </div>
        <div className="w-100 d-flex align-items-center justify-content-center flex-row gap-12px">
          <div className="d-flex flex-row gap-8px">
            <Checkbox
              name="toggle"
              onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
              label="Join with mic and camera off"
              value={isMicCamToggleOn as any}
            />
          </div>
          <div style={{ backgroundColor: "white", color: "black" }}>
            <DeviceSettings />
          </div>
        </div>
      </div>
      <Button
        className="btn-primary"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
