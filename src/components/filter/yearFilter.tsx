import { FC, useState, useEffect } from "react";
import ReactSelect from "react-select";
import { useFilter } from "../../utils/filterContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const YearFilter: FC = () => {
  const { filterByYear, selectedYear } = useFilter();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [year, setYear] = useState<string | null>(null);

  // URL'den başlangıç değerini al
  useEffect(() => {
    const yearParam = searchParams.get("year");
    if (yearParam) {
      setYear(yearParam);
      filterByYear(yearParam);
    }
  }, []);

  // Filtreler sıfırlandığında select kutusunu boşalt
  useEffect(() => {
    if (!selectedYear) {
      setYear(null);
    }
  }, [selectedYear]);

  const handleYearChange = (selectedOption: { label: string; value: string } | null) => {
    const newYear = selectedOption ? selectedOption.value : null;
    setYear(newYear);
    filterByYear(newYear);
    updateUrl(newYear);
  };

  const updateUrl = (year: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (year) {
      params.set("year", year);
    } else {
      params.delete("year");
    }
    navigate(`?${params.toString()}`);
  };

  // 2000'den 2024'e kadar olan yılları oluştur
  const yearOptions = Array.from({ length: 25 }, (_, i) => {
    const year = 2024 - i;
    return { label: year.toString(), value: year.toString() };
  });

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="year">Yıl</label>
      <div className="w-full">
        <ReactSelect
          className="w-full text-black"
          placeholder="Yıl Seçin"
          name="year"
          id="year"
          options={yearOptions}
          value={year ? { label: year, value: year } : null}
          onChange={handleYearChange}
        />
      </div>
    </div>
  );
};

export default YearFilter;
