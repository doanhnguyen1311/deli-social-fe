import React, { useState } from "react";
import { UserRound, Play, UsersRound, MonitorDot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/imgs/Avatar.png';
import { useAuth } from "../../hooks/useAuth";
import styles from "./index.module.css";

interface SidebarItem {
  label: string;
  icon: React.ReactElement;
  path: string;
}

interface SidebarProps {
  className?: string;
  onNavigate?: (path: string) => void;
}

const sidebarItems: SidebarItem[] = [
  { label: "Feeds", icon: <MonitorDot size={18} />, path: "/feeds" },
  { label: "Watch", icon: <Play size={18} />, path: "/watch" },
  { label: "People", icon: <UserRound size={18} />, path: "/people" },
  { label: "Groups", icon: <UsersRound size={18} />, path: "/groups" },
];

const Sidebar: React.FC<SidebarProps> = ({ className, onNavigate }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState<string>("Feeds");

  const handleItemClick = (item: SidebarItem): void => {
    setActiveItem(item.label);
    navigate(item.path);

    if (onNavigate) {
      onNavigate(item.path);
    }
  };

  return (
    <div className={`card ${className ?? ""}`}>
      <div className="card-body p-4">
        <div className="mb-4 text-center">
          <div className="avatar h-72px w-72px mb-2 mb-[16px]">
            <img src={logo} alt="Logo" className="" style={{ width: "72px", borderRadius: "50%" }} />
          </div>
          <p className="fw-bold mb-0">{user?.fullName ?? "X_AE_C-921"}</p>
          <p className="text-muted mb-0">@{user?.username ?? "xtheobliterator"}</p>
          <p className="fs-7 text-gray-600">Osaka, Japan 🎌</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
