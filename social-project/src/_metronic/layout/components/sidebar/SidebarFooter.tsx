import { KTIcon } from "@/_metronic/helpers";
import { useAuth } from "@/components/context/AuthContext";
import { useSocket } from "@/components/context/SocketContext";
import { handleDisconnectSocket } from "@/components/utils";
import clsx from "clsx";
import Cookies from "js-cookie";
import { useState } from "react";

const SidebarFooter = () => {
  const { currentUser, logout } = useAuth();

  const { socket } = useSocket();

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className="app-sidebar-footer flex-column-auto"
      id="kt_app_sidebar_footer"
    >
      <div
        className="cursor-pointer"
        style={{
          zIndex: 1,
          pointerEvents: "all",
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          logout();
          Cookies.remove("FilterSession");

          handleDisconnectSocket(socket, {
            userId: currentUser?.user_id,
          });
        }}
      >
        <div
          className="d-flex align-items-center flex-column min-h-100px"
          style={{
            zIndex: 1,
            pointerEvents: "all",
          }}
        >
          <span className={clsx("menu-icon p-12px d-flex align-items-center justify-content-center p-12px rounded-16px w-60px h-60px position-relative", {
            hover: isHover,
          })}
            data-bs-toggle="tooltip"
            data-bs-title="Sign Out"
            data-bs-placement="right"
          >

            <KTIcon iconName={"exit-right"} iconType={isHover ? 'solid' : 'outline'} className="fs-2 tertiary-100" />
            {/* <span className="menu-title fs-14 fw-normal black-200 text-center">
              Sign Out
            </span> */}
          </span>
        </div>
      </div>

      {/* <span className="menu-icon me-0 d-flex align-items-center justify-content-start">
        <span className="menu-title fs-12 fw-normal black-200 text-center">
          &copy; BreezChat 2025
        </span>
      </span> */}
    </div>
  );
};

export { SidebarFooter };
