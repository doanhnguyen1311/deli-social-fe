import Modal from "@/components/modal/Modal";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import phoneImg from "@/components/images/email-templates.png";
import { Input } from "@/components/input";
import Button from "@/components/button/Button";
import ErrorMessage from "@/components/error/ErrorMessage";
import request from "../axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { swalConfirm, swalToast } from "@/components/swal-notification";
import { formatMsgError } from "@/components/utils";
import { DataResponse, ModalStepContactProps } from "../types";
import SimpleCountdown from "../countdown/CountDown";
import { useAuth } from "../context/AuthContext";

const ModalOTP: FC<ModalStepContactProps> = ({
  otp,
  otpExpire,
  setOtpExpire,
  showModal,
  onSendOtp,
  data,
  setOtp,
  service_id,
  onRefreshData,
  handleGetData,
  sendOTP,
  setSendOTP,
}) => {
  const [error, setError] = useState<string>("");
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const { currentUser } = useAuth();
  const [canResend, setCanResend] = useState<boolean>(false);

  useEffect(() => {
    if (!otp || !otpExpire || otpExpire <= 0) return;

    const timer = setInterval(() => {
      setOtpExpire((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [otpExpire]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanResend(true);
    }, 300000);

    return () => clearTimeout(timer);
  }, []);

  const inputs: React.RefObject<HTMLInputElement>[] = Array.from(
    { length: 6 },
    () => useRef(null)
  );

  const handleInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(-1);

    setOtpValues(newOtpValues);

    if (value && index < inputs.length - 1) {
      inputs[index + 1].current?.focus();
    }

    if (!value && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: any) => {
    const pasteData = e.clipboardData.getData("Text");
    const digits = pasteData.replace(/\D/g, "")?.slice(0, 6);

    if (digits.length === 6) {
      const newOtpValues = digits.split("");
      setOtpValues(newOtpValues);

      inputs.forEach((input, index) => {
        if (input.current) {
          input.current.value = digits[index] || "";
        }
      });

      inputs[5].current?.focus();
    }
  };

  async function handleResendOTP() {
    try {
      await onSendOtp();

      inputs.forEach((inputRef) => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      });

      setError(null);

      // Focus first input
      if (inputs.length > 0 && inputs[0].current) {
        inputs[0].current.focus();
      }
    } catch (error) {
      setError("Can't resend otp yet. Please try again.");
    }
  }

  async function handleVerifyOTP() {
    try {
      const otpVerify = inputs.reduce((otpString, inputRef) => {
        if (inputRef.current) {
          return otpString + inputRef.current.value;
        }
        return otpString;
      }, "");

      if (!otpExpire || otpVerify.length !== 6) {
        setError("The OTP does not match. Please try again or resend again.");
        return;
      }

      const payload = {
        otp_info: otp,
        otp_verify: otpVerify,
      };

      const { data } = await request.post<DataResponse<any>>(
        "/config/verify-otp",
        payload
      );

      if (data.error) {
        throw new Error(data.message);
      }

      showModal();
      swalConfirm.fire({
        icon: "success",
        html: "OTP Verification Was Successful!",
        text: "Upgrade service in processing...",
        width: "unset",
        showCancelButton: false,
        confirmButtonText: "OK",
        customClass: {
          htmlContainer:
            "fs-3 d-flex flex-column gap-4px text-gray-900  fw-semibold",
          cancelButton: "btn btn-lg order-0 fs-5 btn-secondary",
          confirmButton: "order-1 fs-5 btn btn-lg btn-primary",
          actions: "d-flex justify-content-center w-100",
        },
      });
      handleUpgradePlan();
    } catch (error) {
      setError(formatMsgError(error));
    } finally {
      setOtp("");
    }
  }

  async function handleUpgradePlan() {
    try {
      const payload = {
        company_id: data?.current_service?.company_id,
        service_update_id: service_id,
      };

      await request.post("/package/upgrade-payment", payload);
      swalToast.fire({
        icon: "success",
        title: "Upgrade service successfully!",
      });
      onRefreshData();
      handleGetData(data?.current_service?.company_id);
    } catch (error: any) {
      swalToast.fire({
        icon: "error",
        title: error.response.data.message || "Something went wrong",
      });
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        inputs[index - 1].current?.focus();

        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = "";
        setOtpValues(newOtpValues);
      }
    }
  };

  return (
    <Modal
      dialogClassName="w-800px"
      show={true}
      onClose={showModal}
      title="Validation OTP"
    >
      <div className="d-flex flex-column align-items-center w-100 p-30px overflow-auto">
        <div className="d-flex flex-column align-items-center w-fit-content">
          <img
            src={phoneImg}
            alt="phone"
            className="w-140px object-fit-cover d-block"
          />

          <div className="body d-flex flex-column gap-24px text-center mt-24px">
            <h1 className="fs-2tx m-0">Verification Email</h1>
            <div>
              <p className="fw-semibold m-0 fs-16">
                OTP will expire after{" "}
                <span className="text-danger fw-bold">
                  <SimpleCountdown expired={otpExpire} />
                </span>{" "}
                seconds
              </p>
              <span className="text-gray-600 fw-semibold fs-14">
                Enter the verification code we sent to: {currentUser?.email}
              </span>
            </div>
          </div>

          <div className="place-control align-self-center d-flex flex-column gap-16px my-24px w-fit-content">
            <h3 className="fs-16 fw-semibold mt-16px">
              Type Your 6 Digit Verification Code
            </h3>

            <div className="d-flex align-items-center gap-12px">
              {inputs.map((inputRef, index) => (
                <Input
                  classInputWrap="input-otp"
                  className="w-60px h-60px text-align-center text-center flex-shrink-0"
                  key={index}
                  type="number"
                  maxLength={1}
                  ref={inputRef}
                  value={otpValues[index]}
                  onPaste={(e) => handlePaste(e)}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            {error && <ErrorMessage message={error} />}
          </div>

          <span className="medium-gray-500 fw-semibold fs-14">
            Haven't received the verification code?{" "}
            <span
              className={
                !canResend ? "text-gray-500" : "text-secondary cursor-pointer"
              }
              onClick={handleResendOTP}
            >
              Resend OTP
            </span>
          </span>
        </div>
      </div>

      <div className="d-flex justify-content-end p-30px border-top border-gray-200">
        <div className="d-flex align-items-center justify-content-center gap-8px">
          <Button
            className="btn-secondary fs-6"
            onClick={() => {
              showModal();
              setSendOTP(!sendOTP);
              setOtp("");
            }}
          >
            Cancel
          </Button>
          <Button className="fs-6 btn-primary" onClick={handleVerifyOTP}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalOTP;
