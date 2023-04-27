import { FC, memo } from "react";
interface buttonProps {
  label: string;
  disable?: boolean;
  color?: string;
  background?: string;
  size?: number;
  onClick?: () => void;
  customStyle?: Record<string, unknown>;
}

const ButtonComponent: FC<buttonProps> = ({
  label,
  disable,
  color,
  onClick,
  background,
  size,
}) => {
  return (
    <button
      style={{
        color: `${color ? color : "#fff"}`,
        backgroundColor: `${background ? background : "#7522DE"}`,
        borderRadius: "5px",
        border: "1px solid #7522DE",
        padding: "8px 22px",
        fontSize: `${size}px`,
        fontFamily: "HelveticaBold",
      }}
      disabled={disable}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default memo(ButtonComponent);
