import { FC } from "react";

interface Props {
  title: string;
  type?: "submit" | "button";
  designs?: string;
  disabled?: boolean;
  fn?: () => void;
}

const Button: FC<Props> = ({ title, type, designs, disabled, fn }) => {
  return (
    <button
      disabled={disabled}
      className={`custom-btn bg-primary-blue rounded-full hover:bg-blue-800 transition ${designs}`}
      type={type}
      onClick={fn}
    >
      {title}
    </button>
  );
};

export default Button;
