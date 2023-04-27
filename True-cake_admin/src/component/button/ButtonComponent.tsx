import React, { FC } from "react";
import "./style.css";
interface ButtonComponentProps {
  id?: number;
  title: string;
  customStyles?: React.CSSProperties | undefined;
  isPadding?: boolean;
  onClick?: () => void;
  type: "submit" | "button";
  customClass?: any;
  disabled?: boolean;
  onclose?: any;
}
const ButtonComponent: FC<ButtonComponentProps> = ({
  id,
  title,
  customStyles,
  onClick,
  type,
  customClass,
  isPadding,
  disabled,
  onclose,
}) => {
  return (
    <button
      className={`${customClass ?? "common-button"} ${
        isPadding ? "button-padding" : ""
      }`}
      style={customStyles}
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
export default ButtonComponent;
