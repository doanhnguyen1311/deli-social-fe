import { KTIcon } from "@/_metronic/helpers";
import request from "@/components/axios";
import NotiIcon from "@/components/images/notification-on.png";
import readedIcon from "@/components/images/readed-notification.png";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.scss";

const MenuNotification: FC<{
  notificationLength: number;
  setNotificationLength: (length: number) => void;
  setNewNotification: (newNotification: boolean) => void;
}> = ({
  notificationLength,
  setNotificationLength,
  setNewNotification,
}) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [notification, setNotification] = useState<any[]>([]);

    const [visibleCount, setVisibleCount] = useState(5);

    useEffect(() => {
      handleGetNotificationListing();
    }, []);

    const handleViewMore = () => {
      setVisibleCount((prev) => prev + 5);
    };

    async function handleGetNotificationListing() {
      try {
        const { data } = await request.get("/notification/list-notification");
        const uniqueNotif = new Set(data?.data);
        const unread = Array.from(uniqueNotif).filter((item: any) => item?.is_read === 0);
        setNotificationLength(unread?.length || 0);
        setNewNotification(unread?.length > 0);
        setNotification(data?.data || []);
      } catch (error) { }
    }

    async function handleRedirectToNotification(noti: any) {
      const str = noti?.notification;
      const match = str.match(/#\w+/);
      const result = match ? match[0] : null;
      if (result) {
        const endCodeTransaction = encodeURIComponent(result);
        navigate(`/documents/details/${endCodeTransaction}/${noti?.redirect_id}`);
        await request.post("/notification/make-readed-notification", {
          id: noti?.id,
        });
        handleGetNotificationListing();
      }
    }

    async function handleClearAll() {
      setLoading(true);
      try {
        await request.post("/notification/make-readed-all-notification", {
          ids: notification.map((noti: any) => noti?.id),
        });
        handleGetNotificationListing();
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    return (
      <>
        <div className="loan-menu">
          <div className="dropdown-menu-application">
            <div className="p-20px fs-16 text-gray-900 fw-semibold border-bottom border-gray-200 w-100 d-flex align-items-center">
              Notification

              {notificationLength > 9 && (
                <span onClick={() => handleClearAll()} className="fs-14 fw-semibold text-primary cursor-pointer ms-auto">{loading ? "Clearing..." : "Clear All"}</span>
              )}
            </div>
            {notification.length ? (
              <div className="dropdown-fixed-loan mh-500px overflow-auto">
                {notification.slice(0, visibleCount).map((noti, i) => {
                  return (
                    <div
                      className={`'d-flex flex-column p-10px`}
                      key={i}
                      onClick={() => handleRedirectToNotification(noti)}
                    >
                      <div className="d-flex flex-row gap-10px px-10px py-12px hover-notification">
                        <img
                          src={noti?.is_read === 1 ? readedIcon : NotiIcon}
                          className="w-20px h-20px d-flex align-items-center align-self-center"
                        />
                        <div className="d-flex w-100 align-items-center justify-content-between cursor-pointer">
                          <div className="d-flex flex-column">
                            <div
                              className={`fs-14 fw-semibold ${noti?.is_read === 1
                                ? "medium-gray-500"
                                : "dark-gray-500"
                                }`}
                            >
                              {noti?.notification}
                            </div>
                            <div
                              className={`fs-13 fw-normal ${noti?.is_read === 1
                                ? "medium-gray-500"
                                : "dark-gray-500"
                                }`}
                            >
                              {moment(noti?.created_at).format(
                                "HH:mm • DD MMM, YYYY"
                              )}
                            </div>
                          </div>
                          <div>
                            <KTIcon
                              iconName="right"
                              className={`fs-16 ${"black-brand-500"}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {visibleCount < notification.length && (
                  <div
                    className="w-100 fs-12 fw-semibold d-flex align-items-center justify-content-center p-12px text-hover-primary cursor-pointer"
                    onClick={handleViewMore}
                  >
                    View More
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center font-italic py-16px">
                No record to show
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

export { MenuNotification };
