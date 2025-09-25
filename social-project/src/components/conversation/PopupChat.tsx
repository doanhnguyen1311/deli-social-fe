import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useAuth } from "../context/AuthContext";
import { KTIcon } from "@/_metronic/helpers";
import sendIcon from "@/components/images/send-btn.png";
import avatarDefault from "@/components/images/avatar-default.jpg";
import moment from "moment";
import sentIcon from "@/components/images/sent-message.png";
import { getFullName } from "../utils";
import { Message, Transaction } from "../types";
import { useSocket } from "../context/SocketContext";
import request from "../axios";
import { swalToast } from "../swal-notification";

interface MessageSocket {
  id: number;
  transaction_id: string;
  user_id: number;
  content: string;
  created_at: string;
  user_notify: Usernotify;
}
interface Usernotify {
  user_id: number;
  user_created: number;
  user_in_conversation: Array<number>;
}

type Props = {
  onClose: () => void;
  data: Transaction;
};

const PopupChat = ({ onClose, data }: Props) => {
  const { currentUser } = useAuth();
  const { socket } = useSocket();
  const [dataMessage, setDataMessage] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState<string>("");

  useEffect(() => {
    document.getElementById("message-chat").scrollTo({
      top: document.getElementById("message-chat").scrollHeight,
      behavior: "smooth",
    });
  }, [dataMessage]);

  useEffect(() => {
    if (!socket) return;

    const handleLoadMessage = (data: any) => {
      if (data?.user_id?.includes(currentUser?.user_id)) {
        handleGetMessage();
      }
    };
    socket.on("conversationUpdate", handleLoadMessage);

    return () => {
      socket.off("conversationUpdate", handleLoadMessage);
    };
  }, [socket]);

  async function handleGetMessage() {
    try {
      const { data: message } = await request.post(
        `/conversation/get-messages`,
        {
          transaction_id: +data?.id,
        }
      );
      setDataMessage(message?.data);
    } catch (error) {}
  }

  useEffect(() => {
    if (!data) {
      swalToast.fire({
        icon: "error",
        title: "Transaction not found",
      });
    }

    handleGetMessage();
  }, [data?.id]);

  async function handleCreateMessage() {
    try {
      const payload = {
        transaction_id: +data?.id,
        content: messageContent,
      };

      await request.post("/conversation/create", payload);
      setMessageContent("");
      handleGetMessage();
    } catch (error) {}
  }

  return (
    <div className="popup-chat">
      <div className="d-flex flex-column">
        <div className="p-24px w-100 d-flex align-items-center justify-content-between border-bottom border-gray-200">
          <span className="fs-16 fw-semibold dark-gray-500">Conversation</span>
          <div
            className="cursor-pointer p-0 m-0 black-300-hover"
            onClick={onClose}
          >
            <KTIcon className="fs-1 black-300-hover" iconName="cross" />
          </div>
        </div>
        <div
          className="p-24px pb-0px overflow-auto d-flex flex-column gap-4px h-430px"
          id="message-chat"
        >
          {dataMessage.map((item) => {
            const isOwnMessage = item.user_id === currentUser?.user_id;
            return (
              <div
                key={item.id}
                className={`d-flex flex-row gap-8px ${
                  isOwnMessage
                    ? "align-items-end justify-content-end"
                    : "align-items-start justify-content-start"
                }`}
              >
                <div
                  className={`d-flex flex-row items-end gap-8px ${
                    isOwnMessage ? "flex-row-reverse" : ""
                  }`}
                >
                  <img
                    src={item.avatar ? item.avatar : avatarDefault}
                    alt={item.name}
                    className="avatar-sender"
                  />

                  <div className="d-flex flex-column gap-4px">
                    <div
                      className={`fs-12 fw-noral dark-gray-500 ${
                        isOwnMessage
                          ? "text-end align-self-end"
                          : "text-start align-self-start"
                      }`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`mw-300px ${
                        isOwnMessage ? "mine-message" : "another-message"
                      }`}
                    >
                      <div className="">{item.content}</div>
                    </div>
                    <div
                      className={`d-flex flex-row gap-4px fs-12 fw-normal ${
                        isOwnMessage
                          ? "align-items-end justify-content-end"
                          : ""
                      }`}
                      style={{ color: "#B9B3C2" }}
                    >
                      <img
                        src={sentIcon}
                        alt=""
                        style={{
                          width: "12px",
                          height: "12px",
                          objectFit: "cover",
                          marginBottom: "2px",
                        }}
                      />
                      <span>Sent</span>
                      <span>{item?.created_at}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-8px w-100 d-flex align-items-center justify-content-between gap-24px chat-area-style">
          <textarea
            style={{ border: "none", width: "85%", resize: "none" }}
            className="fs-14 fw-normal dark-gray-500 p-14px"
            placeholder="Enter message"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleCreateMessage();
              } else if (e.key === "Enter" && e.shiftKey) {
              }
            }}
          />
          <div className="p-16px" onClick={handleCreateMessage}>
            <img
              src={sendIcon}
              alt=""
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupChat;
