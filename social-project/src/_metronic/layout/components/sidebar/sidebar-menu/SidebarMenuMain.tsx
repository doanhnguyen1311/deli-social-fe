/* eslint-disable react/jsx-no-target-blank */
import { useAuth } from "@/components/context/AuthContext";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { UserRole } from "@/components/types/enum";
import UserSolidIcon from '@/components/images/users-solid.svg?react';
import UserIcon from '@/components/images/users.svg?react';

const SidebarMenuMain = () => {
  const { currentUser } = useAuth();

  let items = [];

  switch (currentUser?.role) {
    case UserRole.ADMIN:
      items = [
        {
          to: "/dashboard",
          icon: "home",
          title: "Dashboard",
          fontIcon: "bi-layers",
        },
        {
          to: "/users",
          icon: "users",
          title: "Users",
          fontIcon: "bi-layers",
          isSvg: true,
          Icon: <UserIcon className="w-22px h-22px fill-tertiary-100" />,
          IconSolid: <UserSolidIcon className="w-22px h-22px fill-primary-500" />,
        },
        {
          to: "/documents",
          icon: "document",
          title: "Documents",
          fontIcon: "bi-layers",
        },
        {
          to: "/activity-logs",
          icon: "archive",
          title: "Activity Logs",
          fontIcon: "bi-layers",
        },
        {
          to: "/chat-logs",
          icon: "messages",
          title: "Chat Logs",
          fontIcon: "bi-layers",
        },
      ];
      break;
    case UserRole.CUSTOMER:
      items = [
        // {
        //   to: "/dashboard",
        //   icon: "home",
        //   title: "Dashboard",
        //   fontIcon: "bi-layers",
        // },
        {
          to: "/documents",
          icon: "document",
          title: "Documents",
          fontIcon: "bi-layers",
        },
      ];
      break;
    default:
      break;
  }

  return (
    <>
      {items.map(({ to, icon, title, fontIcon, disabled, tooltip, isSvg, Icon, IconSolid }) => (
        <SidebarMenuItem
          key={to}
          to={to}
          icon={icon}
          title={title}
          fontIcon={fontIcon}
          disabled={disabled}
          tooltip={tooltip}
          isSvg={isSvg}
          Icon={Icon}
          IconSolid={IconSolid}
        />
      ))}
    </>
  );
};

export { SidebarMenuMain };
