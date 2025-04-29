import { FC } from "react";
interface Props {
  children: JSX.Element | string;
}
const Warning: FC<Props> = ({ children }) => {
  return (
    <div className="padding-x max-width">
      <div className="home__error-container"> {children}</div>
    </div>
  );
};

export default Warning;
