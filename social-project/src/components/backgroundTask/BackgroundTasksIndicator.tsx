import { useBatchOperations } from "@/hooks/useBatchOperations";
import React, { useState } from "react";

const BackgroundTasksIndicator = () => {
  const { pendingBatches } = useBatchOperations();
  const [isExpanded, setIsExpanded] = useState(false);

  if (pendingBatches.length === 0) return null;

  return (
    <div className="background-tasks fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-2 z-50 d-none"></div>
  );
};

export default BackgroundTasksIndicator;
