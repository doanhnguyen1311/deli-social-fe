import { KTIcon } from "@/_metronic/helpers";
import { updateInfoUser } from "@/components/axios/request";
import { DEFAULT_MSG_ERROR } from "@/components/constants";
import { useAuth } from "@/components/context/AuthContext";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { swalToast } from "@/components/swal-notification";
import { updateUserInfo } from "@/components/types";
import { USER_TITLE, getUserTitle, xorScramble } from "@/components/utils";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import ChangePassword from "../change-password/ChangePassword";
import { emailValidationSchema } from "@/components/utils";

const profileDetailsSchema = Yup.object().shape({
  firstname: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z\s"-]+$/,
      "First name must not contain special characters"
    )
    .required("First name is required")
    .max(255, "First name maximum 255 characters"),
  lastname: Yup.string()
    .trim()
    .required("Last name is required")
    .max(255, "Last name maximum 255 characters"),
  email: emailValidationSchema(),
  title: Yup.string().required("Title is required"),
});

interface UserProfile {
  user_id: number;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  username?: string;
}

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [editFields, setEditFields] = useState({
    title: false,
    firstName: false,
    lastName: false,
    email: false,
  });

  const [isShowResetPassword, setIsShowResetPassword] =
    useState<boolean>(false);

  const [originalData, setOriginalData] = useState<UserProfile | null>(null);

  const { currentUser, getUser } = useAuth();

  const {
    values,
    handleChange,
    setValues,
    handleSubmit,
    resetForm,
    touched,
    errors,
    handleBlur,
    isSubmitting,
  } = useFormik<UserProfile>({
    initialValues: {
      firstname: currentUser?.first_name || "",
      lastname: currentUser?.last_name || "",
      title: currentUser?.title || "",
      email: currentUser?.email || "",
      username: currentUser?.username || "",
      user_id: currentUser?.user_id || 0,
    },
    validationSchema: profileDetailsSchema,
    onSubmit: handleSubmitForm,
  });

  useEffect(() => {
    if (currentUser) {
      setOriginalData({
        firstname: currentUser.first_name || "",
        lastname: currentUser.last_name || "",
        title: currentUser.title || "",
        email: currentUser.email || "",
        username: currentUser.username || "",
        user_id: currentUser.user_id,
      });
    }
  }, [currentUser]);

  async function handleSubmitForm() {
    if (!currentUser) return;
    try {
      setLoading(true);
      const valuesFormik: updateUserInfo = {
        first_name: values.firstname,
        last_name: values.lastname,
        title: values.title,
        email: values.email,
        user_id: currentUser.user_id,
        avatar: currentUser.avatar,
        role: currentUser.role,
      };

      const scrambledData = xorScramble(JSON.stringify(valuesFormik));
      await updateInfoUser(scrambledData);

      resetForm({ values });
      getUser();
      swalToast.fire({
        title: `Your profile successfully updated`,
        icon: "success",
      });
    } catch (error) {
      swalToast.fire({
        title: DEFAULT_MSG_ERROR,
        icon: "error",
      });
    } finally {
      setLoading(false);
      setEditFields({
        title: false,
        firstName: false,
        lastName: false,
        email: false,
      });
    }
  }

  function toggleResetPassword() {
    setIsShowResetPassword(!isShowResetPassword);
  }

  function handleDiscardChanges() {
    if (originalData) {
      setValues(originalData);
      setEditFields({
        title: false,
        firstName: false,
        lastName: false,
        email: false,
      });
    }
  }

  function handleEditField(field: keyof typeof editFields) {
    setEditFields((prev) => ({ ...prev, [field]: true }));
  }

  const EditIcon = ({ field }) => (
    <div
      className="ms-auto cursor-pointer"
      onClick={() => handleEditField(field)}
    >
      <KTIcon
        iconName="pencil"
        className="fs-3 primary-500 primary-500-hover primary-500-active"
      />
    </div>
  );

  return (
    <>
      {currentUser && isShowResetPassword && (
        <ChangePassword
          id={currentUser.user_id}
          onClose={toggleResetPassword}
          show={isShowResetPassword}
        />
      )}
      <div className="card mb-xl-16px rounded-20px theme-card-shadow mb-16px mb-xl-0px">
        <div className="card-header px-24px pt-24px pb-12px d-flex border-bottom-0 flex-wrap">
          <div className="card-title m-0">
            <h3 className="fw-semibold fs-20-line-30 m-0 dark-gray-500">
              User Information
            </h3>
          </div>
          {editFields.title ||
          editFields.firstName ||
          editFields.lastName ||
          editFields.email ? (
            <div className="button-group d-flex m-0 fs-14 d-none d-lg-block">
              <button
                disabled={isSubmitting}
                type="button"
                className="btn btn-secondary min-h-48px max-h-48px border-black-brand-50 bg-white dark-gray-500 align-self-center me-6px px-16px py-14px rounded-8px fs-14"
                onClick={handleDiscardChanges}
              >
                <KTIcon
                  iconName="arrows-loop"
                  className="w-20px dark-gray-500"
                />
                Reset
              </button>
              <button
                type="submit"
                className="btn btn-primary min-h-48px max-h-48px align-self-center px-16px py-14px rounded-8px fs-14"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
              >
                {!loading && "Save "}
                {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...{" "}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          ) : null}
        </div>

        <div className={clsx("card-body py-16px px-24px border-bottom")}>
          <div className="row p-0 align-items-center">
            <label className="col-12 col-sm-3 py-0 col-form-label fw-normal fs-14 medium-gray-500 mb-10px mb-sm-0px">
              Title
            </label>
            <div className="col-12 col-sm-9 fv-row">
              {editFields.title ? (
                <Select
                  onBlur={handleBlur}
                  name={"title"}
                  className={`border-tertiary-50 w-100 ${
                    values?.title === "" ? "black-200" : "dark-gray-500"
                  }`}
                  value={values["title"] || ""}
                  error={errors["title"]}
                  options={USER_TITLE}
                  onChange={handleChange}
                  touched={!!touched["title"]}
                  isSearchable={false}
                />
              ) : (
                <div className="d-flex align-items-center w-100 h-100">
                  <span className="fw-normal fs-14 dark-gray-500">
                    {getUserTitle(currentUser)}
                  </span>
                  <EditIcon key={"title"} field={"title"} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={clsx("card-body py-16px px-24px border-bottom")}>
          <div className="row p-0 align-items-center">
            <label className="col-12 col-sm-3 py-0 col-form-label fw-normal fs-14 medium-gray-500 mb-10px mb-sm-0px">
              First name
            </label>
            <div className="col-12 col-sm-9 fv-row">
              {editFields.firstName ? (
                <Input
                  onBlur={handleBlur}
                  name={"firstname"}
                  transparent={false}
                  classInputWrap="border-tertiary-50 fs-14 fw-normal dark-gray-500"
                  className="p-14px"
                  value={values["firstname"] || ""}
                  error={errors["firstname"]}
                  onChange={handleChange}
                  touched={!!touched["firstname"]}
                />
              ) : (
                <div className="d-flex align-items-center w-100 h-100">
                  <span className="fw-normal fs-14 dark-gray-500">
                    {currentUser?.first_name}
                  </span>
                  <EditIcon key={"firstName"} field={"firstName"} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={clsx("card-body py-16px px-24px border-bottom")}>
          <div className="row p-0 align-items-center">
            <label className="col-12 col-sm-3 py-0 col-form-label fw-normal fs-14 medium-gray-500 mb-10px mb-sm-0px">
              Last name
            </label>
            <div className="col-12 col-sm-9 fv-row">
              {editFields.lastName ? (
                <Input
                  onBlur={handleBlur}
                  name={"lastname"}
                  transparent={false}
                  classInputWrap="border-tertiary-50 fs-14 fw-normal dark-gray-500"
                  className="p-14px"
                  value={values["lastname"] || ""}
                  error={errors["lastname"]}
                  onChange={handleChange}
                  touched={!!touched["lastname"]}
                />
              ) : (
                <div className="d-flex align-items-center w-100 h-100">
                  <span className="fw-normal fs-14 dark-gray-500">
                    {currentUser?.last_name}
                  </span>
                  <EditIcon key={"lastName"} field={"lastName"} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={clsx("card-body py-16px px-24px")}>
          <div className="row p-0 align-items-center">
            <label className="col-12 col-sm-3 py-0 col-form-label fw-normal fs-14 medium-gray-500 mb-10px mb-sm-0px">
              Email
            </label>

            <div className="col-12 col-sm-9 fv-row">
              {editFields.email ? (
                <Input
                  onBlur={handleBlur}
                  name={"email"}
                  transparent={false}
                  classInputWrap="border-tertiary-50 fs-14 fw-normal dark-gray-500"
                  className="p-14px"
                  value={values["email"] || ""}
                  error={errors["email"]}
                  onChange={handleChange}
                  touched={!!touched["email"]}
                />
              ) : (
                <div className="d-flex align-items-center w-100 h-100">
                  <span className="fw-normal fs-14 dark-gray-500">
                    {currentUser?.email}
                  </span>
                  <EditIcon key={"email"} field={"email"} />
                </div>
              )}
            </div>
          </div>
        </div>

        {editFields.title ||
        editFields.firstName ||
        editFields.lastName ||
        editFields.email ? (
          <div className="py-16px px-24px d-flex m-0 fs-14 d-block d-lg-none w-100">
            <button
              disabled={isSubmitting}
              type="button"
              className="w-100 btn btn-secondary min-h-48px max-h-48px border-black-brand-50 bg-white dark-gray-500 align-self-center  me-6px px-16px py-14px rounded-8px fs-14"
              onClick={handleDiscardChanges}
            >
              <KTIcon iconName="arrows-loop" className="w-20px dark-gray-500" />
              Reset
            </button>
            <button
              type="submit"
              className="w-100 btn btn-primary min-h-48px max-h-48px align-self-center px-16px py-14px rounded-8px fs-14"
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
            >
              {!loading && "Save "}
              {loading && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        ) : null}
      </div>

      <div className="card rounded-20px theme-card-shadow h-100">
        <div className="card-header d-flex flex-wrap px-24px pt-24px pb-12px border-0">
          <div className="card-title m-0">
            <h3 className="fw-semibold fs-20-line-30 m-0 dark-gray-500">
              Security
            </h3>
          </div>
        </div>
        <div className="card-body px-30px pb-30px pt-12px">
          <div className="row p-0 align-items-center">
            <label className="col-12 col-sm-3 py-0 col-form-label fw-normal fs-14 medium-gray-500 mb-10px mb-sm-0px">
              Password
            </label>
            <div className="col-12 col-sm-9 fv-row">
              <div className="d-flex align-items-center w-100 h-100">
                <span className="d-flex align-items-base fw-normal fs-14 dark-gray-500">
                  ••••••••••••
                  <KTIcon
                    iconName="eye-slash"
                    className="w-16px black-brand-300 ms-8px"
                  />
                </span>
                <div
                  className="ms-auto cursor-pointer primary-500 primary-500-hover primary-500-active fs-13-line-20"
                  onClick={toggleResetPassword}
                >
                  Reset password
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Settings };
