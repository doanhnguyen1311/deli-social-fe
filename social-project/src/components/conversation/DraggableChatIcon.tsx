import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function DraggableChatIcon({
  chatIcon,
  handleShowMessage,
  lastReply,
  userLastReply,
}) {
  const { currentUser } = useAuth();
  const [position, setPosition] = useState(() => {
    const iconSize = 50;

    const saved = JSON.parse(localStorage.getItem("chatIconPosition"));

    if (saved && saved.x !== undefined && saved.y !== undefined) {
      return {
        x: Math.max(0, Math.min(saved.x, window.innerWidth - iconSize)),
        y: Math.max(0, Math.min(saved.y, window.innerHeight - iconSize)),
      };
    }

    return {
      x: window.innerWidth * 0.85,
      y: window.innerHeight * 0.85 - iconSize,
    };
  });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const clickPosition = useRef({ x: 0, y: 0 });
  const iconRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatIconPosition", JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    const handleResize = () => {
      const iconSize = 50;
      const maxX = window.innerWidth - iconSize;
      const maxY = window.innerHeight - iconSize;

      setPosition((prevPos) => {
        if (prevPos.x > maxX || prevPos.y > maxY) {
          return {
            x: Math.min(prevPos.x, window.innerWidth * 0.9 - iconSize),
            y: Math.min(prevPos.y, window.innerHeight * 0.9 - iconSize),
          };
        }
        return prevPos;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging.current) return;

      const iconSize = 50;
      const maxX = window.innerWidth - iconSize;
      const maxY = window.innerHeight - iconSize;

      const newX = Math.max(
        0,
        Math.min(e.clientX - clickPosition.current.x, maxX)
      );
      const newY = Math.max(
        0,
        Math.min(e.clientY - clickPosition.current.y, maxY)
      );

      setPosition({
        x: newX,
        y: newY,
      });
    };

    const handleMouseUp = () => {
      if (dragging.current) {
        dragging.current = false;
        document.body.style.cursor = "auto";
      }
    };

    const handleTouchMove = (e) => {
      if (!dragging.current) return;

      const touch = e.touches[0];
      const iconSize = 50;
      const maxX = window.innerWidth - iconSize;
      const maxY = window.innerHeight - iconSize;

      const newX = Math.max(
        0,
        Math.min(touch.clientX - clickPosition.current.x, maxX)
      );
      const newY = Math.max(
        0,
        Math.min(touch.clientY - clickPosition.current.y, maxY)
      );

      setPosition({
        x: newX,
        y: newY,
      });

      e.preventDefault();
    };

    const handleTouchEnd = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleMouseDown = (e) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    clickPosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    e.currentTarget.style.cursor = "grabbing";
    document.body.style.cursor = "grabbing";

    dragging.current = true;
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();

    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();

    clickPosition.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };

    dragging.current = true;
  };

  const handleClick = (e) => {
    if (!dragging.current) {
      handleShowMessage(e);
    }
  };

  return (
    <div
      ref={iconRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        cursor: "grab",
        zIndex: 9999,
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {lastReply && currentUser?.user_id === userLastReply && (
        <div
          style={{
            position: "absolute",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "red",
            top: -5,
            right: -5,
          }}
        ></div>
      )}
      <img
        src={chatIcon}
        alt="chat-icon"
        style={{
          width: "50px",
          height: "50px",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default DraggableChatIcon;
