import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutAPI } from "../../api";
import { useAuth } from "../../hooks/useAuth";
import clsx from "clsx";
import { KTIcon } from "../../_metronic/helpers";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showFriendRequest, setShowFriendRequest] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserActions, setShowUserActions] = useState(false);

  const friendRef = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const userMenuItems = [
    { label: "Profile", path: "/my-profile" },
    { label: "Friends", path: "/my-friends" },
    { label: "Groups", path: "/my-groups" },
    { label: "Notifications", path: "/notifications" },
    { label: "Messages", path: "/my-messages" },
    { label: "Settings", path: "/settings" },
    { label: "Log Out", path: "/logout" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (friendRef.current && !friendRef.current.contains(event.target as Node)) {
        setShowFriendRequest(false);
      }
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserActions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = async (path: string) => {
    setShowUserActions(false);
    const token = localStorage.getItem("token");

    if (path === "/logout") {
      try {
        const response = await fetch(LogoutAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (result.success) {
          navigate("/");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between py-2 px-4 bg-white shadow-sm">
      {/* Search */}
      <div className="d-flex align-items-center w-300px position-relative">
        <KTIcon iconName="magnifier" className="fs-2 text-gray-500 position-absolute ms-3" />
        <input
          type="text"
          className="form-control ps-10"
          placeholder="Search..."
        />
      </div>

      {/* Actions */}
      <div className="d-flex align-items-center gap-4">
        {/* Friend Requests */}
        <div ref={friendRef} className="position-relative">
          <div
            className="btn btn-icon btn-light-primary"
            onClick={() => setShowFriendRequest((prev) => !prev)}
          >
            <KTIcon iconName="user-add" className="fs-2" />
          </div>
          {showFriendRequest && (
            <div className="menu menu-sub menu-sub-dropdown show w-250px py-3">
              <div className="menu-item px-3">
                <div className="fw-bold text-gray-700">Friend requests</div>
              </div>
              <div className="menu-item px-3">
                <span className="text-muted fs-7">No friend request.</span>
              </div>
              <div className="menu-item px-3">
                <button className="btn btn-sm btn-light-primary w-100">All Requests</button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notiRef} className="position-relative">
          <div
            className="btn btn-icon btn-light-primary"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <KTIcon iconName="notification-status" className="fs-2" />
          </div>
          {showNotifications && (
            <div className="menu menu-sub menu-sub-dropdown show w-250px py-3">
              <div className="menu-item px-3">
                <div className="fw-bold text-gray-700">Notifications</div>
              </div>
              <div className="menu-item px-3">
                <span className="text-muted fs-7">No notifications found.</span>
              </div>
              <div className="menu-item px-3">
                <button className="btn btn-sm btn-light-primary w-100">All Notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div ref={userMenuRef} className="position-relative">
          <div
            className="d-flex align-items-center cursor-pointer"
            onClick={() => setShowUserActions((prev) => !prev)}
          >
            <div className="symbol symbol-35px me-2">
              <img src={user?.profile.avatarUrl} alt="User" />
            </div>
            <span className="fw-semibold">@{user?.username}</span>
          </div>

          {showUserActions && (
            <div className="menu menu-sub menu-sub-dropdown show w-200px py-3">
              {userMenuItems.map((item) => (
                <div
                  key={item.path}
                  className="menu-item px-3 py-2 cursor-pointer"
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
