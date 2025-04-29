import { FC } from "react";
import Button from "../button";
import { motion } from "framer-motion";
const Hero: FC = () => {
  return (
    <div className="hero">
      <div className="pt-16 padding-x flex-1 max-h-[920px]">
        <h1 className="hero__title">Özgürlüğü Hisset Yolculuğa Başla</h1>
        <p className="hero__subtitle">
          Altın standartta hizmetle unutulmaz bir yolculuğa hazır mısın ? Ara. kiralama
          deneyimini Altın Seçenekleri ile taçlandırarak her anını özel kılabilirsin.
        </p>
        <Button title="Arabaları Keşfet" designs="mt-10" />
      </div>
      <div className="flex justify-center">
        <motion.img
          initial={{ translateX: 250, scale: 0.6 }}
          animate={{ translateX: 0, scale: 1 }}
          transition={{ duration: 1 }}
          //!** */ whileTap {translateX ...} tıklandıgında whileInView sayfa scroola geldiginde whileHover mouse üzerine geldiginde  whileFocus odaklandıgında input gibi yerlerde***!!!!
          src="/hero.png"
          alt=" gray bmw car"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
