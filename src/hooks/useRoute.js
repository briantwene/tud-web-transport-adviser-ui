import { fetcher } from "../utils/fetcher";
import useSWR, { Fetcher } from "swr";

export const useRoute = (origin, destination) => {
  console.log(origin, destination);
  const url = `/api/route?origin=${origin}&destination=${destination}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    routes: data,
    isLoading,
    isError: error
  };
};
