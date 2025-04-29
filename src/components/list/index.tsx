import { FC, useState, useEffect } from "react";
import { Car } from "../../utils/types";
import Warning from "../warning";
import Card from "../card";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchCars } from "../../utils/fetchCars";

const List: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "0");
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const make = searchParams.get("make") || undefined;
        const model = searchParams.get("model") || undefined;
        const year = searchParams.get("year") || undefined;
        const page = parseInt(searchParams.get("page") || "0");

        const data = await fetchCars({
          make,
          model,
          year,
          page,
          limit: itemsPerPage,
        });

        setCars(data.results);
        setTotalPages(Math.ceil(data.total_count / itemsPerPage));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected;
    setCurrentPage(newPage);

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    navigate(`?${params.toString()}`);
  };

  if (loading) return <Warning>Yükleniyor...</Warning>;
  if (error) return <Warning>{error}</Warning>;
  if (!cars.length) return <Warning>Veri bulunamadı...</Warning>;

  return (
    <div className="space-y-4">
      {/* Araç Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car: Car) => (
          <Card car={car} key={car.id} />
        ))}
      </div>

      {/* Sayfalama Kontrolleri */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="İleri"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="Geri"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center gap-2 mt-4 flex-wrap"
        pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
        activeClassName="bg-blue-500 text-white"
        previousClassName="px-3 py-1 border rounded hover:bg-gray-100"
        nextClassName="px-3 py-1 border rounded hover:bg-gray-100"
        disabledClassName="opacity-50 cursor-not-allowed"
        forcePage={currentPage}
      />
    </div>
  );
};

export default List;
