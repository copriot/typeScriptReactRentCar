import { FC, useState } from "react";
import { Car } from "../../utils/types";
import calcPrice from "../../utils/calcPrice";
import Info from "../list/info";
import Button from "../button";
import { motion } from "motion/react";
import Modal from "../../components/modal";
import generateImage from "../../utils/generateImage";
interface Props {
  car: Car;
}
const Card: FC<Props> = ({ car }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    // car name
    <div className="car-card group mt-6">
      <h2 className=" car-card__content-title">
        {car.make} {car.model}
      </h2>
      {/* car Price */}
      <div className="flex mt-6 text-[19px]">
        <span className="font-semibold">₺</span>
        <span className="text-[32px]">{calcPrice(car)}</span>
        <span className="font-semibold self-end">/gün</span>
      </div>
      {/* car picture */}
      <div>
        <img
          className="w-full h-full object-contain min-h-[200px]"
          src={generateImage(car)}
          alt="car-picture"
        />
      </div>
      {/* main information */}
      <div className="w-full">
        <div className="group-hover:hidden">
          <Info car={car} />
        </div>
        <motion.div
          initial={{ scale: 0.5 }}
          transition={{ duration: 0.4 }}
          whileInView={{ scale: 1 }}
          className="hidden group-hover:block"
        >
          <Button
            title="Daha Fazla"
            designs="w-full text-white mt-[0.5px]"
            fn={() => setIsOpen(true)}
          />
        </motion.div>
      </div>
      <Modal isOpen={isOpen} car={car} close={() => setIsOpen(false)} />
    </div>
  );
};

export default Card;
