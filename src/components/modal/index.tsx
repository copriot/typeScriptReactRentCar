import { FC } from "react";
import { Car } from "../../utils/types";
import Images from "../images/Images";
import formatData from "../../utils/formatData";
import { p } from "motion/react-client";

interface Props {
  isOpen: boolean;
  close: () => void;
  car: Car;
}

const Modal: FC<Props> = ({ isOpen, close, car }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] grid place-items-center z-20">
        <div className="bg-white p-6 relative max-w-lg max-h-[90vh] rounded-2xl flex flex-col gap-5 shadow-xl overflow-auto">
          <button
            onClick={close}
            className="cursor-pointer p-1 absolute end-1 top-1 z-10 bg-white rounded-full"
          >
            <img src="/close.svg" alt="" />
          </button>

          {/* Pictures */}
          <Images car={car} />

          {/* informations */}
          {formatData(car).map(([key, value], i) => (
            <p key={i} className="flex justify-between gap-20">
              <span className="capitalize">{key}</span>
              <span className="font-semibold capitalize">
                {value === "Y" ? "Var" : value === "N" ? "Yok" : value || "-"}
              </span>
            </p>
          ))}
        </div>
      </div>
    )
  );
};

export default Modal;
