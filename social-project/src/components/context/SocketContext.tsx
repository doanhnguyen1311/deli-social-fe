import { DefaultEventsMap } from "@socket.io/component-emitter";
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { logger } from "../utils";
import { useAuth } from "./AuthContext";
import { WithChildren } from "../types";

export type SocketCustom = Socket<DefaultEventsMap, DefaultEventsMap> | null;

type SocketContextProps = {
  socket: SocketCustom;
  setSocket: Dispatch<SetStateAction<SocketCustom>>;
  setupSocket: () => void;
  isConnected: boolean;
};

const initSocketContextPropsState: SocketContextProps = {
  socket: null,
  setSocket: () => {}, // Placeholder function
  setupSocket: () => {}, // Placeholder function
  isConnected: false,
};

const SocketContext = createContext<SocketContextProps>(
  initSocketContextPropsState
);

export const useSocket = () => useContext(SocketContext);

const SocketProvider: FC<WithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<SocketCustom>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { currentUser } = useAuth();

  const setupSocket = () => {
    const token = Cookies.get("token");
    if (token && !socket) {
      const newSocket = io(import.meta.env.VITE_REACT_APP_URL, {
        autoConnect: false,
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      newSocket.on("connect", () => {
        setIsConnected(true);
        console.log("Socket connected successfully");

        if (currentUser) {
          newSocket.emit("login", {
            userId: currentUser.user_id,
            username: currentUser.username,
          });
        }
      });

      newSocket.on("connect_error", (error: any) => {
        logger("Socket connection error:", error.message);
        setIsConnected(false);
      });

      newSocket.on("error", (error) => {
        logger("Socket error:", error);
      });

      newSocket.on("disconnect", (reason) => {
        logger(`Socket disconnected: ${reason}`);
        setIsConnected(false);
      });

      newSocket.on("private_message", (data) => {
        logger("Received private message:", data);
      });

      newSocket.connect();
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    if (currentUser && !socket) {
      setupSocket();
    }

    if (!currentUser && socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }, [currentUser, socket]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    };
  }, [socket]);

  const contextValue = useMemo(
    () => ({
      socket,
      setSocket,
      setupSocket,
      isConnected,
    }),
    [socket, isConnected]
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
