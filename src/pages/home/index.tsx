import { FC } from "react";
import Header from "../../components/header";
import Hero from "../../components/hero";
import Filter from "../../components/filter";
import List from "../../components/list";

const Home: FC = () => {
  return (
    <div className="bg-black-100 min-h-screen text-white">
      <Header />
      <Hero />
      <Filter />
      <List />
    </div>
  );
};

export default Home;
