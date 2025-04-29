import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { Car } from "./types";
import { fetchCars } from "./fetchCars";
import { useSearchParams } from "react-router-dom";

interface FilterContextType {
  cars: Car[];
  filteredCars: Car[];
  loading: boolean;
  error: string | null;
  filterByBrand: (brand: string | null) => void;
  filterByModel: (model: string | null) => void;
  filterByYear: (year: string | null) => void;
  filterByFuelType: (fuelType: string | null) => void;
  resetFilters: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedBrand: string | null;
  selectedModel: string | null;
  selectedYear: string | null;
  selectedFuelType: string | null;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<string | null>(null);

  // Başlangıçta tüm araçları çek
  useEffect(() => {
    const fetchAllCars = async () => {
      setLoading(true);
      try {
        const data = await fetchCars();
        if (data.results && data.results.length > 0) {
          setCars(data.results);
          setFilteredCars(data.results);
        } else {
          setError("Veri bulunamadı");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCars();
  }, []);

  // URL'den başlangıç değerlerini al
  useEffect(() => {
    const makeParam = searchParams.get("make");
    const modelParam = searchParams.get("model");
    const yearParam = searchParams.get("year");

    if (makeParam) setSelectedBrand(makeParam);
    if (modelParam) setSelectedModel(modelParam);
    if (yearParam) setSelectedYear(yearParam);
  }, []);

  // Filtreler değiştiğinde araçları filtrele
  useEffect(() => {
    if (cars.length === 0) return;

    const fetchFilteredCars = async () => {
      setLoading(true);
      try {
        const filters = {
          make: selectedBrand,
          model: selectedModel,
          year: selectedYear,
        };

        const data = await fetchCars(filters);
        setFilteredCars(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredCars();
  }, [selectedBrand, selectedModel, selectedYear]);

  // Arama terimi değiştiğinde araçları filtrele
  useEffect(() => {
    if (cars.length === 0) return;

    let filtered = [...cars];

    if (searchTerm) {
      filtered = filtered.filter(
        (car) =>
          car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCars(filtered);
  }, [searchTerm, cars]);

  const filterByBrand = (brand: string | null) => {
    setSelectedBrand(brand);
  };

  const filterByModel = (model: string | null) => {
    setSelectedModel(model);
  };

  const filterByYear = (year: string | null) => {
    setSelectedYear(year);
  };

  const filterByFuelType = (fuelType: string | null) => {
    setSelectedFuelType(fuelType);
  };

  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setSelectedFuelType(null);
    setSearchTerm("");
    setFilteredCars(cars);
  };

  return (
    <FilterContext.Provider
      value={{
        cars,
        filteredCars,
        loading,
        error,
        filterByBrand,
        filterByModel,
        filterByYear,
        filterByFuelType,
        resetFilters,
        searchTerm,
        setSearchTerm,
        selectedBrand,
        selectedModel,
        selectedYear,
        selectedFuelType,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
