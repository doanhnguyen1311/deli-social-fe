import clsx from "clsx";
import { FC } from "react";
import { Spinner } from "react-bootstrap";
import logo from "@/components/images/main-logo.png";
import "./style.scss";

type Props = {
  showText?: boolean;
  className?: string;
  textClassName?: string;
  textDefault?: string;
};

const Loading: FC<Props> = ({
  showText = true,
  className,
  textClassName = "dark-gray-500",
  textDefault = "Loading... Please wait",
}) => {
  return (
    <div
      className={clsx([
        "d-flex flex-column align-items-center gap-8px justify-content-center w-100 h-100",
        className,
      ])}
      style={{ zIndex: "999" }}
    >
      <div className='d-flex align-items-center gap-24px mb-12px loading-image'>
        <img src={logo} alt="main-logo" className='w-60px' />
        <h1 className='title primary-500 d-flex align-items-center gap-8px mb-0'>
          BREEZ
          <span className='h-50px w-2px' style={{
            opacity: .6,
            background: 'linear-gradient(180deg, rgba(187, 20, 26, 0.00) 0%, #2EA5F5 50%, rgba(187, 20, 26, 0.00) 100%)',
          }} />
          CHAT
        </h1>
      </div>
      {showText && (
        <span className={clsx("fs-6 fw-semibold loading-image", textClassName)}>
          {textDefault}
        </span>
      )}
    </div>
  );
};

export default Loading;

// import React, {FC} from 'react'
// import clsx from 'clsx'
// import './style.scss'

// type Props = {
//   className?: string
// }

// const Loading: FC<Props> = ({className}) => {
//   return (
//     // <div className={clsx(['loading-container', className])}>
//     //   <div className='dot-wave'>
//     //     <span></span>
//     //     <span></span>
//     //     <span></span>
//     //     <span></span>
//     //   </div>
//     // </div>
//     <div className={clsx(['loading-container', className])}>
//       <div className='loader'></div>
//     </div>
//   )
// }

// export default Loading
