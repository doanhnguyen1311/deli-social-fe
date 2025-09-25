import { KTIcon } from "@/_metronic/helpers";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { Modal as ModalBootstrap } from "react-bootstrap";

interface Props {
  show?: boolean;
  title: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  dialogClassName?: string;
  onClose: () => void;
  onClickPrev?: () => void;
  onClickBack?: boolean;
}

const Modal: FC<Props> = ({
  show = true,
  title,
  children,
  contentClassName,
  dialogClassName,
  onClose,
  onClickPrev,
  onClickBack = true,
}) => {
  return (
    <ModalBootstrap
      id="kt_modal_create_app"
      tabIndex={-1}
      // aria-hidden='true'
      dialogClassName={clsx([
        "modal-dialog modal-dialog-centered h-100 m-24px overflow-hidden mw-100",
        dialogClassName ? dialogClassName : "w-1000px",
      ])}
      backdropClassName="vh-100 vw-100 overflow-hidden"
      className="d-flex align-items-center justify-content-center overflow-hidden"
      contentClassName={clsx([
        "d-flex flex-column h-fit-content mh-100 w-100 overflow-hidden rounded-20px",
        contentClassName,
      ])}
      show={show}
      onHide={onClickBack ? onClose : () => {}}
      style={{ zIndex: 99999 }}
      animation
    >
      <div className="modal-header d-flex align-items-center px-24px py-20px gap-3 justify-content-between ">
        <h2
          className={clsx([
            "text-truncate m-0 d-inline-flex gap-8px fs-20 dark-gray-500 align-items-center fw-semibold",
            onClickPrev && "cursor-pointer text-hover-primary",
          ])}
          onClick={typeof onClickPrev === "function" ? onClickPrev : undefined}
        >
          {typeof onClickPrev === "function" ? (
            <FontAwesomeIcon icon={faArrowLeft} />
          ) : (
            <></>
          )}
          {title}
        </h2>

        <div
          className="cursor-pointer p-0 m-0 black-300-hover"
          onClick={onClose}
        >
          <KTIcon className="fs-1 black-300-hover" iconName="cross" />
        </div>
      </div>

      <div
        className={`modal-body d-flex flex-column p-0 overflow-hidden`}
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {children}
      </div>
    </ModalBootstrap>
  );
};

export default Modal;
