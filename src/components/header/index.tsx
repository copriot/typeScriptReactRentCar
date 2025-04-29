import { Link } from "react-router-dom";
import Button from "../button";
import { FC } from "react";

const Header: FC = () => {
  return (
    <div className="w-full z-10">
      <div className="max-width flex justify-between items-center px-6 py-4">
        <Link to={"/"}>
          <img width={50} src="/bmw.png" />
        </Link>
        <Button title="Kaydol" designs="min-w-[130px]" />
      </div>
    </div>
  );
};

export default Header;
