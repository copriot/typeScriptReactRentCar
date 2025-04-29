import YearFilter from "./yearFilter";
import SearchBar from "../searchbar";
import { FC } from "react";
import { useFilter } from "../../utils/filterContext";
import { useNavigate } from "react-router-dom";

const Filter: FC = () => {
  const { resetFilters } = useFilter();
  const navigate = useNavigate();

  const handleReset = () => {
    resetFilters();
    navigate("/");
  };

  return (
    <div className="mt-12 padding-x padding-y max-width">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Araba Kataloğu</h1>
        <p>Beğenebileceğin arabaları keşfet</p>
      </div>
      <div className="home__filters">
        <SearchBar />

        <div className="home__filter-container">
          <YearFilter />
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
