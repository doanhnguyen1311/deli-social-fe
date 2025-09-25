/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "@/components/context/AuthContext";
import { useSocket } from "@/components/context/SocketContext";
import { useLayout } from "@/components/core";
import sidebarIcon from "@/components/images/sidebar-responsive.png";
import TitlePage from "@/components/title-page/TitlePage";
import { UserRole } from "@/components/types/enum";
import { getFullName } from "@/components/utils";
import clsx from "clsx";
import { createStore, useStateMachine } from "little-state-machine";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { SidebarFooter } from "../sidebar/SidebarFooter";
import { SidebarLogo } from "../sidebar/SidebarLogo";
import { SidebarMenu } from "../sidebar/sidebar-menu/SidebarMenu";
import { Header } from "./Header";
import Navbar from "./Navbar";
import { updateAccouraCompany } from "./config";
import { Search } from "./header-menus/Search";
import "./style.scss";
import { clearUserState } from "@/pages/users/listing/config";
import { clearDocumentState, updateDocumentState } from "@/pages/documents/admin/config";

export function HeaderWrapper() {
  const { config, classes } = useLayout();

  const { pathname } = useLocation()

  const { currentUser } = useAuth()

  const { actions, state } = useStateMachine({ actions: { updateAccouraCompany, clearUserState, clearDocumentState, updateDocumentState } });

  const userId = currentUser?.user_id;

  const { socket } = useSocket();

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const [isBigMonitor, setIsBigMonitor] = useState<boolean>(
    window.document.documentElement.clientWidth > 992
  );


  const sidebarRef = useRef<HTMLDivElement>(null);

  const pageTitles: { [key: string]: string } = {
    "/dashboard": "BreezChat Platform",
    "/documents": "Document Management",
    "/documents/details": "Document Details",
    "/reports": "Report Management",
    "/settings": "System Settings",
    "/modules": "Modules",
    "/companies": "Company Management",
    "/companies/details": "Company Details",
    "/companies/create": "Create Company",
    "/accountant": "Accountant Management",
    "/services": "Services Packages",
    "/logs": "Log Management",
    "/users": "User Management",
    "/chat-logs": "Chat Logs",
    "/account/overview": "My Profile",
    "/account/company": "My Company",
    "/error/404": "404 Not Found",
    "/error/500": "500 Internal Server Error",
    "/activity-logs": "Activity Logs",
  };

  // Get base path (without /details or /create)
  const segments = pathname.split("/").filter(Boolean); // removes empty strings
  const basePath = segments.length > 0 ? `/${segments[0]}` : "";
  const level2Path = segments.length > 1 ? `/${segments[0]}/${segments[1]}` : "";
  const skipLevel2 =
    currentUser?.role !== UserRole?.USER &&
    [
      "/account/overview",
      "/account/company",
      "/error/404",
      "/error/500",
    ].includes(pathname);

  const baseTitle = pageTitles[basePath] || "";
  const fullTitle = pageTitles[level2Path] || "";
  const pageTitle = fullTitle || baseTitle || "Untitled Page";

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth;
      setIsBigMonitor(clientWidth > 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      setIsBigMonitor(true);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

  }, [socket, currentUser, userId]);

  useEffect(() => {

  }, [socket]);

  function handleShowSidebar() {
    setShowSidebar(!showSidebar);
  }

  useEffect(() => {
    if (basePath !== "/users") actions.clearUserState();
    if (basePath !== "/documents") actions.clearDocumentState();
  }, [basePath])

  useEffect(() => {
    if (level2Path !== "/documents/details") {
      actions.updateDocumentState({ transactionFilter: { searchValue: "", statusUpload: "All", } });
    }
  }, [level2Path])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    actions.updateAccouraCompany(
      {
        company_id: event.target.value
      }
    );
  };

  return (
    <>
      {isBigMonitor ? (
        <div id="kt_app_header" className="app-header">
          <div
            style={{
              zIndex: 99,
              background: "#fff",
            }}
            id="kt_app_header_container"
            className={clsx(
              "app-container aimpathy-header position-fixed top-0 end-0 start-95px p-16px",
              classes.headerContainer.join(" "),
              config.app?.header?.default?.containerClass,

            )}
          >

            <div className="h-100 d-flex flex-column align-self-center fs-20 fw-semibold dark-gray-500">
              <span className="site-text text-capitalize mb-4px">{pageTitle}</span>

              {pathname.includes("dashboard") && (
                <span className="sub-site-text fs-12 fw-normal dark-gray-200">
                  Hi {getFullName(currentUser)}, welcome back!
                </span>
              )}
              {(currentUser?.role !== UserRole.CUSTOMER)
                && (!pathname.includes("dashboard")) && (
                  <TitlePage
                    level1={{ title: "Dashboard", url: "/dashboard", }}
                    level2={
                      skipLevel2
                        ? undefined
                        : { title: baseTitle, url: basePath }
                    }
                    level3={
                      skipLevel2
                        ? { title: pageTitle, url: pathname }
                        : level2Path && pathname !== basePath
                          ? { title: fullTitle, url: pathname }
                          : undefined
                    }
                  />
                )}
              {(currentUser?.role === UserRole.CUSTOMER)
                && (!pathname.includes("dashboard")) && (
                  <TitlePage
                    level1={skipLevel2
                      ? undefined
                      : { title: baseTitle, url: basePath }}
                    level2={skipLevel2
                      ? { title: pageTitle, url: pathname }
                      : level2Path && pathname !== basePath
                        ? { title: fullTitle, url: pathname }
                        : undefined}
                  />
                )}
            </div>
            <div
              id="kt_app_header_wrapper"
              className="d-flex justify-content-end ms-auto"
            >
              <div className="d-flex align-items-center position-relative me-16px">
                <Search />
              </div>
              <div className="app-header-menu app-header-mobile-drawer">
                <Header  />
              </div>
              <Navbar />
            </div>
          </div>
        </div>
      ) : (
        <div id="kt_app_header" className="app-header">
          {/* Header */}
          <div
            style={{
              zIndex: 99,
            }}
            id="kt_app_header_container"
            className={clsx(
              "app-container position-fixed top-0 start-0 end-0 px-24px py-16px mh-80px",
              classes.headerContainer.join(" "),
              config.app?.header?.default?.containerClass
            )}
          >
            {/* Header Content */}
            <div className="d-flex align-items-center">
              <div className="d-flex flex-row gap-14px h-100">
                <div
                  className="h-100 d-flex align-self-center justify-content-center align-items-center cursor-pointer"
                  onClick={handleShowSidebar}
                >
                  <img src={sidebarIcon} alt="" className="w-18px h-18px" />
                </div>
                <Link
                  aria-label={"home"}
                  to="/dashboard"
                  className="d-flex align-items-end align-self-center"
                >
                  <>
                    <div
                      className={clsx(
                        "h-100 d-flex flex-column align-self-end align-items-start dark-gray-500",
                        isBigMonitor ? "fs-4" : "fs-20"
                      )}
                    >
                      <span className="site-text fw-semibold text-capitalize">
                        {pageTitle}
                      </span>

                      {pathname.includes("dashboard") && (
                        <span className="sub-site-text fs-12 fw-normal dark-gray-200">
                          Hi {getFullName(currentUser)}, welcome back!
                        </span>
                      )}
                    </div>
                  </>
                </Link>
              </div>
            </div>

            <div
              id="kt_app_header_wrapper"
              className="d-flex justify-content-end ms-auto"
            >
              <div className="app-header-menu ">
                <Header
                  isMobile={true}
                />
              </div>
              <Navbar />
            </div>
          </div>

          {/* Sidebar with Overlay */}
          <div
            className="sidebar-overlay"
            style={{ visibility: showSidebar ? "visible" : "hidden" }}
            onClick={handleShowSidebar}
          >
            <div
              className={clsx(
                "sidebar-responsive",
                showSidebar ? "show" : ""
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                onClick={handleShowSidebar}
                className="d-flex flex-column overflow-auto justify-content-between h-100 w-100"
                style={{ height: "calc(100vh - 10px)" }}
              >
                <div className="app-sidebar-menu">
                  <div
                    className="sidebar-menu position-fixed top-0 start-0 h-100 d-flex flex-column min-w-180px mw-180px py-24px px-20px"
                    style={{
                      zIndex: 99,
                      background: "#fff",
                    }}
                  >
                    <SidebarLogo sidebarRef={sidebarRef} />
                    <SidebarMenu />
                    <SidebarFooter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
