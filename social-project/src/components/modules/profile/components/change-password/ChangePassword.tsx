import { KTIcon } from "@/_metronic/helpers";
import { updatePasswordCurrentUser } from "@/components/axios/request";
import Button from "@/components/button/Button";
import { useAuth } from "@/components/context/AuthContext";
import { useSocket } from "@/components/context/SocketContext";
import { Input } from "@/components/input";
import { swalToast } from "@/components/swal-notification";
import { UpdatePasswordInfo } from "@/components/types";
import {
  formatMsgError,
  handleDisconnectSocket,
  passwordValidationSchema,
  xorScramble,
} from "@/components/utils";
import { FormikHelpers, useFormik } from "formik";
import { FC, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

type Props = {
  show: boolean;
  ignoreOldPassword?: boolean;
  id: number;
  onClose: () => void;
};

type ValuesChangePassword = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

const initialValues = {
  new_password: "",
  confirm_new_password: "",
  old_password: "",
};

const passwordFormValidationSchema = Yup.object().shape({
  new_password: passwordValidationSchema()
    .required("New Password is required"),
  confirm_new_password: Yup.string()
    .required("Confirm New Password is required")
    .oneOf([Yup.ref("new_password")], "Confirm New Password must match"),
});

const oldPasswordValidationSchema = Yup.object().shape({
  old_password: Yup.string().required("Current Password is required"),
});

const ChangePassword: FC<Props> = ({
  show,
  onClose,
  ignoreOldPassword = false,
  id,
}) => {
  const [loading, setLoading] = useState(false);

  const { currentUser, logout } = useAuth();

  const { socket } = useSocket();

  const validationSchema = useMemo(() => {
    const schema = passwordFormValidationSchema;
    if (!ignoreOldPassword) return schema.concat(oldPasswordValidationSchema);

    return schema;
  }, [ignoreOldPassword]);

  const { touched, errors, resetForm, getFieldProps, handleSubmit } =
    useFormik<ValuesChangePassword>({
      initialValues,
      validationSchema,
      onSubmit: handleChangePassword,
    });

  function handleChangePassword(
    values: ValuesChangePassword,
    config: FormikHelpers<ValuesChangePassword>
  ) {
    const { old_password, new_password } = values;

    if (!ignoreOldPassword) {
      onUpdatePasswordCurrentUser(
        {
          id,
          old_password,
          new_password,
        },
        config
      );
    } else {
      // change user password when current user has role super admin or admin
    }
  }

  function onClosePopup() {
    resetForm();
    onClose();
  }

  async function onUpdatePasswordCurrentUser(
    updatePasswordInfo: UpdatePasswordInfo,
    { setStatus }: FormikHelpers<ValuesChangePassword>
  ) {
    setLoading(true);
    try {
      const scrambledPayload = xorScramble(JSON.stringify(updatePasswordInfo));
      await updatePasswordCurrentUser(scrambledPayload);

      swalToast.fire({
        icon: "success",
        title: "Password successfully changed. Please login again.",
      });
      setTimeout(() => {
        onClosePopup();
        logout();
        handleDisconnectSocket(socket, {
          userId: currentUser?.user_id,
        });
      }, 2000);
    } catch (error: any) {
      const message = formatMsgError(error);
      swalToast.fire({
        icon: "error",
        title: message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-600px rounded-20px"
      contentClassName="rounded-20px mw-600px"
      show={show}
      onHide={onClosePopup}
      animation={true}
    >
      <div className="modal-header d-flex align-items-center justify-content-between p-24px border-bottom-0">
        <h2 className="mb-0 fs-20-line-30 fw-medium dark-gray-500">
          Change password
        </h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onClosePopup}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body p-24px">
        <div className="row gy-4">
          {!ignoreOldPassword && (
            <div className="col-12">
              <div className="fv-row mb-0">
                <label
                  htmlFor="old_password"
                  className="form-label fs-14 dark-gray-500 fw-normal mb-8px required"
                >
                  Current password
                </label>
                <Input
                  autoComplete="off"
                  type="password"
                  className="form-control form-control-lg form-control-solid p-14px"
                  id="old_password"
                  placeholder="Enter current password"
                  error={errors.old_password}
                  touched={touched.old_password}
                  {...getFieldProps("old_password")}
                />
              </div>
            </div>
          )}

          <div className="col-12">
            <div className="fv-row mb-0">
              <label
                htmlFor="new_password"
                className="form-label fs-14 dark-gray-500 fw-normal mb-8px required"
              >
                Password
              </label>
              <Input
                autoComplete="off"
                type="password"
                className="form-control form-control-lg form-control-solid p-14px"
                id="new_password"
                placeholder="Enter new password"
                error={errors.new_password}
                touched={touched.new_password}
                {...getFieldProps("new_password")}
              />
            </div>
          </div>

          <div className="col-12">
            <div className="fv-row mb-0">
              <label
                htmlFor="confirm_new_password"
                className="form-label fs-14 dark-gray-500 fw-normal mb-8px required"
              >
                Confirm password
              </label>
              <Input
                autoComplete="off"
                type="password"
                className="form-control form-control-lg form-control-solid p-14px"
                id="confirm_new_password"
                placeholder="Enter confirm password"
                error={errors.confirm_new_password}
                touched={touched.confirm_new_password}
                {...getFieldProps("confirm_new_password")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer p-24px border-top-0">
        <div className="d-flex justify-content-end gap-8px w-100 w-lg-auto">
          <Button
            className="btn-secondary w-100 w-lg-auto min-h-48px max-h-48px border-black-50 bg-white dark-gray-500 align-self-center me-6px px-16px py-13px rounded-8px fs-14-line-14"
            onClick={onClosePopup}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            className="btn btn-primary w-100 w-lg-auto min-h-48px max-h-48px align-self-center px-16px py-13px rounded-8px fs-14-line-14"
            onClick={() => handleSubmit()}
            disabled={loading}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePassword;
