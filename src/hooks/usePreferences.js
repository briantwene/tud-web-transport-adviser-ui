import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const usePreferences = (stopId, route) => {
  console.log(stopId, route);
  const url = `/api/preferences/stops?stopId=${stopId}&routeId=${route}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    stops: data,
    isLoading,
    isError: error
  };
};
