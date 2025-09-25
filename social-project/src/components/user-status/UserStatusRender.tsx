import { getUserStatusValue } from "../utils";

type Props = {
  UserStatus: number;
};

const UserStatusRender = ({ UserStatus }: Props) => {
  const borderStyle = "1px solid";

  let badgeClass = "";
  if (UserStatus === 0) {
    badgeClass = "badge-light-warning";
  } else if (UserStatus === 1) {
    badgeClass = "badge-light-success";
  } else if (UserStatus === 2) {
    badgeClass = "badge-light-danger";
  }

  return (
    <div
      className={`badge ${badgeClass}`}
      style={{
        border: borderStyle,
        borderRadius: "30px",
        padding: "4px 8px",
        fontWeight: "500",
        fontSize: "11px",
      }}
    >
      {getUserStatusValue(UserStatus)}
    </div>
  );
};

export default UserStatusRender;
