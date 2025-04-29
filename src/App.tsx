import { FC } from "react";
import Home from "./pages/home";
import { FilterProvider } from "./utils/filterContext";
import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <FilterProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </FilterProvider>
  );
};

export default App;
