import { Car } from "./types";

interface CarResponse {
  results: Car[];
  total_count: number;
}

interface FilterParams {
  make?: string;
  model?: string;
  year?: string;
  page?: number;
  limit?: number;
}

export const fetchCars = async (filters?: FilterParams): Promise<CarResponse> => {
  let url =
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records";

  const params = new URLSearchParams();

  // Pagination parametreleri
  const page = filters?.page || 0;
  const limit = filters?.limit || 10;
  params.append("offset", (page * limit).toString());
  params.append("limit", limit.toString());

  if (filters) {
    const whereConditions = [];

    if (filters.make) {
      whereConditions.push(`make="${filters.make}"`);
    }

    if (filters.model) {
      whereConditions.push(`model="${filters.model}"`);
    }

    if (filters.year) {
      whereConditions.push(`year=${filters.year}`);
    }

    if (whereConditions.length > 0) {
      params.append("where", whereConditions.join(" AND "));
    }
  }

  url += `?${params.toString()}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return { results: [], total_count: 0 };
  }

  return data;
};

export const fetchModelsByMake = async (make: string): Promise<string[]> => {
  const response = await fetch(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?where=make%3D%22${make}%22&select=model&group_by=model&limit=100`
  );
  const data = await response.json();
  return data.results.map((item: { model: string }) => item.model);
};

export const fetchYears = async (): Promise<string[]> => {
  const response = await fetch(
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=year&group_by=year&order_by=year%20desc&limit=100"
  );
  const data = await response.json();
  return data.results.map((item: { year: string }) => item.year);
};
