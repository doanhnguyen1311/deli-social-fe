import clsx from "clsx";
import { FC } from "react";
import { Checkbox } from "../checkbox";
import "./style.scss";

interface Props {
  id: number;
  type: string;
  fileName: string;
  className?: string;
  isCheck?: boolean;
  onDeleteFile?: (id: number) => void;
  onClickItem?: (id: number) => void;
  showDeleteIcon?: boolean;
  showSize?: boolean;
}
const ItemSelected: FC<Props> = ({
  id,
  type,
  fileName,
  className,
  isCheck = false,
  showDeleteIcon,
  onDeleteFile = () => {},
  onClickItem = () => {},
}) => {
  return (
    <div
      onClick={(e) => {
        const isClickedInsideIcon = (e.target as any)?.closest(
          ".icon-open-file"
        );

        if (!isClickedInsideIcon) {
          onClickItem(id);
        }
      }}
      className={clsx([
        "d-flex flex-row position-relative h-100 rounded-12px hover-document selected-id",
        className,
      ])}
      style={{ border: "1px solid #dbdfe9" }}
    >
      <div className="d-flex justify-content-center align-items-start">
        {isCheck && (
          <div className="position-absolute d-flex align-items-end justify-content-end end-0 top-0 border-primary">
            <Checkbox
              name="check"
              checked
              onChange={() => {}}
              new_class_share={true}
              className="border-primary"
              classNameWrap="border-primary"
              new_style={true}
            />
          </div>
        )}
      </div>
      <div className="pt-4px d-flex justify-content-center align-items-center flex-column w-100">
        <p
          className={`p-0 m-0 w-100 text-center fw-normal fs-16 text-break`}
          style={{ color: "#2B2730" }}
        >
          {fileName}
        </p>
      </div>
    </div>
  );
};

export default ItemSelected;
