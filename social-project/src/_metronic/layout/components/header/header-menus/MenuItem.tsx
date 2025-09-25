import { KTIcon, checkIsActive } from "@/_metronic/helpers";
import request from "@/components/axios";
import { useAuth } from "@/components/context/AuthContext";
import { useSocket } from "@/components/context/SocketContext";
import { swalFail, swalToast } from "@/components/swal-notification";
import { Tooltip } from "bootstrap";
import clsx from "clsx";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style.scss";
import { MenuNotification } from "./MenuNotifications";

type Props = {
  to: string;
  title?: string;
  icon?: string;
  fontIcon?: string;
  hasArrow?: boolean;
  hasBullet?: boolean;
  hasDropdown?: boolean;
  isRedirectWhenClick?: boolean;
  classNameIcon?: string;
  classNameWrapper?: string;
  showTitle?: boolean;
  showTooltip?: boolean;
};

const MenuItem: FC<Props> = ({
  to,
  title,
  icon,
  fontIcon,
  hasArrow = false,
  hasBullet = false,
  hasDropdown,
  isRedirectWhenClick = true,
  classNameIcon = "p-14px",
  classNameWrapper = "me-8px",
  showTitle = false,
  showTooltip = false,
}) => {

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [dropDownNotification, setDropDownNotification] = useState(false);

  const [newNotification, setNewNotification] = useState<boolean>(false);

  const [notificationLength, setNotificationLength] = useState<number>(0);

  const { socket } = useSocket();

  const { currentUser, logout } = useAuth();

  const [socketDisableUser, setSocketDisableUser] = useState<any>();

  useEffect(() => {
    if (!socket) return;

    const handleDisableUser = (data: any) => {
      setSocketDisableUser(data);
      if (data?.user_id === currentUser.user_id) {
        Cookies.remove("token");
        navigate("/login");

        swalToast.fire({
          title: "Your account has been disabled",
          icon: "error",
        });
      }
    };

    const handleNewNotify = (data: any) => {
      if (Array.isArray(data?.user_id)
        ? data.user_id.includes(currentUser?.user_id)
        : data?.user_id === currentUser?.user_id) {
        setNewNotification(true);
        handleGetNotificationListing();
      }
    };

    socket.on("disableUser", handleDisableUser);
    socket.on("notificationUser", handleNewNotify);

    return () => {
      socket.off("disableUser", handleDisableUser);
      socket.off("notificationUser", handleNewNotify);
    };
  }, [socket]);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipInstances: Tooltip[] = [];

    const handleClick = (tooltip: Tooltip) => () => tooltip.hide();

    tooltipTriggerList.forEach((el) => {
      const tooltip = new Tooltip(el);
      tooltipInstances.push(tooltip);

      const clickHandler = handleClick(tooltip);
      el.addEventListener("click", clickHandler);

      // Save the handler so we can remove it later if needed
      (el as any)._clickHandler = clickHandler;
    });

    return () => {
      tooltipTriggerList.forEach((el) => {
        const handler = (el as any)._clickHandler;
        if (handler) {
          el.removeEventListener("click", handler);
        }
      });
      tooltipInstances.forEach((tooltip) => tooltip.dispose());
    };
  }, []);

  const handleMouseEnter = () => {
    if (icon === "notification-bing") {
      setDropDownNotification(true);
    }
  };

  const handleMouseLeave = () => {
    if (icon === "notification-bing") {
      setDropDownNotification(false);
    }
  };


  useEffect(() => {
    handleGetNotificationListing();
  }, []);

  async function handleGetNotificationListing() {
    try {
      const { data } = await request.get("/notification/list-notification");
      const uniqueNotif = new Set(data?.data);
      const unread = Array.from(uniqueNotif).filter((item: any) => item?.is_read === 0);
      setNotificationLength(unread?.length || 0);
      setNewNotification(unread?.length > 0);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx("d-block menu-item p-0", classNameWrapper)}
      style={{
        position: "relative",
      }}
    >
      <Link
        aria-label={"link"}
        className={clsx(
          "menu-link d-block w-100 rounded-100px p-0  bg-primary-50-hover tertiary-100 primary-500-hover",
          checkIsActive(`/${pathname.split("/")?.[1]}`, to)
            ? "active menu-here bg-primary-50"
            : "bg-light-gray-300",
          {
            "hover-notification":
              title !== "Team Rooms" &&
              title !== "Team Room" &&
              title !== "News",
          }
        )}
        data-bs-toggle={showTooltip ? "tooltip" : ""}
        data-bs-title={title}
        data-bs-placement="bottom"
        to={isRedirectWhenClick && to ? to : ""}
      >
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot"></span>
          </span>
        )}

        {icon && (
          <span
            className={`menu-icon align-self-center w-100 m-0 ${classNameIcon}`}
          >
            {newNotification && icon === "notification-bing" ? (
              <div className="d-flex flex-column">
                <div
                  className="position-absolute bg-primary-500 text-white fs-bold w-20px h-20px fs-12 d-flex align-items-center justify-content-center rounded-circle"
                  style={{ right: 0, top: -5 }}
                >
                  {notificationLength > 9 ? "9+" : notificationLength}
                </div>
                <KTIcon iconName={icon} className="fs-2" />
              </div>
            ) : (
              <KTIcon iconName={icon} className="fs-2" />
            )}
          </span>
        )}

        {/* {icon && !isAdminSystem && (
          <span
            className={`menu-icon align-self-center w-100 m-0 ${classNameIcon} black-brand-500 primary-500-hover`}
          >
            {!userReadNotification ? (
              <div className="d-flex flex-column">
                <div
                  className="position-absolute"
                  style={{ right: 14, top: 8 }}
                >
                  <img
                    src={dotIcon}
                    style={{ width: "10px", height: "10px" }}
                  />
                </div>
                <KTIcon iconName={icon} className="fs-2" />
              </div>
            ) : (
              <KTIcon iconName={icon} className="fs-2" />
            )}
          </span>
        )} */}

        {fontIcon && (
          <span className={`menu-icon black-brand-500 p-14px`}>
            <i className={clsx("bi fs-3", fontIcon)}></i>
          </span>
        )}

        {showTitle && title && (
          <span className="menu-title d-block fs-16 w-100">{title}</span>
        )}

        {hasArrow && <span className="menu-arrow"></span>}
      </Link>

      {hasDropdown && dropDownNotification && (
        <div className="dropdown-fixed-notification py-4 fs-6 w-400px dropdown-menu-application">
          <MenuNotification
            notificationLength={notificationLength}
            setNotificationLength={setNotificationLength}
            setNewNotification={setNewNotification}
          />
        </div>
      )}
    </div>
  );
};

export { MenuItem };
