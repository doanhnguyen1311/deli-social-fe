import {
  CallControls,
  CallParticipantListing,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import clsx from "clsx";
import React, { useState } from "react";

type CallLayout = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayout>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };
  return (
    <section className="d-flex position-relative w-100 overflow-hidden">
      <div className="d-flex position-relative w-100 align-items-center justify-content-center">
        <div className="mw-50 align-items-center justify-content-center">
          <CallLayout />
        </div>
        <div
          className={clsx("d-flex h-100", { "show-block": showParticipants })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="d-flex position-fixed w-100 align-items-center justify-content-center">
        <CallControls />
      </div>
    </section>
  );
};

export default MeetingRoom;
