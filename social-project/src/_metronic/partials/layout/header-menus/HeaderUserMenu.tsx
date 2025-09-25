import { useAuth } from "@/components/context/AuthContext";
import Avatar from "@/components/modules/profile/components/profile/Avatar";
import {Link} from 'react-router-dom'
import { FC, useMemo } from "react";
import { KTIcon } from "@/_metronic/helpers";
import { useSocket } from "@/components/context/SocketContext";
import iconExitRight from "@/components/images/exit-right.png";
import { getFullName, handleDisconnectSocket } from "@/components/utils";
import "./style.scss";
import Cookies from "js-cookie";

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth();

  const { socket } = useSocket();

  const isAdminSystem = useMemo(
    () => (currentUser?.company_id === 1 ? true : false),
    [currentUser]
  );

  return (
    <>
      <div className="d-flex p-20px flex-row gap-8px mw-300px">
        <div className="symbol symbol-50px">
          <Avatar style={{ width: 50, height: 50 }} />
        </div>
        <div className="d-flex flex-column align-self-center text-truncate">
          <div className="fw-semibold text-gray-900 d-flex align-items-center fs-16 text-truncate">
            {getFullName(currentUser)}
          </div>
          <span className="fw-normal dark-gray-500 fs-13 two-line d-block text-truncate">
            {currentUser?.email}
          </span>
        </div>
      </div>

      <div className="separator"></div>

      <div className="menu d-flex flex-column p-10px w-100">
        <div className="p-10px me-0 w-100 hover-title-menu-item hover-profile-menu-item rounded-6px">
          <Link
            aria-label={"account settings"}
            to="/account/overview"
            className="d-flex align-self-center"
          >
            <KTIcon iconName="profile-circle" className="fs-18 me-10px"/>
            <span className="w-100 fs-13 fw-normal">
              My Profile
            </span>
          </Link>
        </div>
        {isAdminSystem && (
          <div className="p-10px me-0 w-100 hover-title-menu-item hover-profile-menu-item rounded-6px">
            <Link
              aria-label={"account settings"}
              to="/settings"
              className="d-flex align-self-center"
            >
              <KTIcon iconName="setting-2" className="fs-18 me-10px"/>
              <span className="w-100 fs-13 fw-normal">
                Settings
              </span>
            </Link>
          </div>
        )}
      </div>

      <div className="separator"></div>

      <div className="p-10px w-100">
        <div className="p-10px pt-0 w-100 ">
          <div
            className="w-100 dark-gray-500 border rounded-8px h-48px d-flex align-items-center justify-content-center align-self-center logout-style-menu-item"
            onClick={() => {
              logout();
              Cookies.remove("FilterSession");
              handleDisconnectSocket(socket, {
                userId: currentUser?.user_id,
              });
            }}
          >
            <img src={iconExitRight} className="w-20px h-20px me-6px" alt="" />
            <span className="fs-13 fw-normal dark-gray-500">
              Sign Out
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeaderUserMenu;
