import request from "@/components/axios";
import { useAuth } from "@/components/context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { MenuItem } from "./MenuItem";
import { UserRole } from "@/components/types/enum";
import clsx from "clsx";

type Props = {
  isMobile?: boolean;
};

export function MenuInner({
  isMobile = false,
}: Props) {
  const { currentUser } = useAuth();

  return (
    <>
        <>
          <MenuItem
            hasDropdown={true}
            title="Settings"
            to={"/settings"}
            icon={"setting-2"}
            showTooltip={true}
          />
          <MenuItem
            classNameWrapper={clsx(isMobile ? "me-0" : "me-8px")}
            classNameIcon={clsx(isMobile ? "px-4px py-14px" : "p-14px")}
            hasDropdown={true}
            title="Notifications"
            to="#"
            icon={"notification-bing"}
          />
        </>
    </>
  );
}
