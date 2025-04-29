import { FC, useState, useEffect } from "react";
import ReactSelect from "react-select";
import { makes } from "../../utils/constants";
import { useFilter } from "../../utils/filterContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchModelsByMake } from "../../utils/fetchCars";

const SearchBar: FC = () => {
  const { filterByBrand, filterByModel, selectedBrand, selectedModel } = useFilter();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [brand, setBrand] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [modelOptions, setModelOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // URL'den başlangıç değerlerini al
  useEffect(() => {
    const makeParam = searchParams.get("make");
    const modelParam = searchParams.get("model");

    if (makeParam) {
      setBrand(makeParam);
      filterByBrand(makeParam);
      loadModels(makeParam);
    }

    if (modelParam) {
      setModel(modelParam);
      filterByModel(modelParam);
    }
  }, []);

  // Filtreler sıfırlandığında select kutularını boşalt
  useEffect(() => {
    if (!selectedBrand) {
      setBrand(null);
      setModel(null);
      setModelOptions([]);
    }
    if (!selectedModel) {
      setModel(null);
    }
  }, [selectedBrand, selectedModel]);

  const loadModels = async (make: string) => {
    setLoading(true);
    try {
      const models = await fetchModelsByMake(make);
      const options = models.map((model) => ({
        label: model,
        value: model,
      }));
      setModelOptions(options);
    } catch (error) {
      console.error("Modeller yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandChange = async (
    selectedOption: { label: string; value: string } | null
  ) => {
    const newBrand = selectedOption ? selectedOption.value : null;
    setBrand(newBrand);
    setModel(null);
    setModelOptions([]);

    if (newBrand) {
      await loadModels(newBrand);
      filterByBrand(newBrand);
    } else {
      filterByBrand(null);
    }

    updateUrl(newBrand, null);
  };

  const handleModelChange = (selectedOption: { label: string; value: string } | null) => {
    const newModel = selectedOption ? selectedOption.value : null;
    setModel(newModel);
    filterByModel(newModel);
    updateUrl(brand, newModel);
  };

  const updateUrl = (make: string | null, model: string | null) => {
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    navigate(`?${params.toString()}`);
  };

  return (
    <form className="flex searchbar__container items-center justify-center gap-4">
      <div className="items-end">
        <div className="searchbar__item w-full flex gap-4">
          <label htmlFor="make">Marka</label>
          <ReactSelect
            className="w-full text-black"
            placeholder="Marka"
            name="make"
            id="make"
            options={makes.map((make) => ({ label: make, value: make }))}
            value={brand ? { label: brand, value: brand } : null}
            onChange={handleBrandChange}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <label htmlFor="model">Model</label>
        <div className="w-full flex searchbar__item">
          <ReactSelect
            className="w-full text-black"
            placeholder={loading ? "Yükleniyor..." : "Model"}
            name="model"
            id="model"
            options={modelOptions}
            value={model ? { label: model, value: model } : null}
            onChange={handleModelChange}
            isDisabled={!brand || loading}
          />
        </div>
      </div>
    </form>
  );
};
export default SearchBar;
