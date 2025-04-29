import { FC } from "react";
import { Car } from "../../utils/types";
import generateImage from "../../utils/generateImage";
interface Props {
  car: Car;
}
const Images: FC<Props> = ({ car }) => {
  return (
    <div className="flex-1 flex-col gap-3">
      <div className="w-full h-40">
        <img
          src={generateImage(car, undefined, true)}
          className="h-full mx-auto object-cover rounded-md"
        />
      </div>
      <div className="flex gap-3 my-3">
        <div className="rounded flex-1 flex relative h-24 bg-primary-blue-100">
          <img
            src={generateImage(car, "25")}
            alt=""
            className="mx-auto object-contain min-w[140px]"
          />
        </div>
        <div className="rounded flex-1 flex relative h-24 bg-primary-blue-100">
          <img
            src={generateImage(car, "27")}
            alt=""
            className="mx-auto object-contain min-w[140px]"
          />
        </div>
        <div className="rounded flex-1 flex relative h-24 bg-primary-blue-100">
          <img
            src={generateImage(car, "17")}
            alt=""
            className="mx-auto object-contain min-w[140px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Images;
