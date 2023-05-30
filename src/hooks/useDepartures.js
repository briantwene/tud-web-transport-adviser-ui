import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useDepartures = (stopId) => {
  console.log(stopId);
  const url = `/api/departures/byStop?stop_id=${stopId}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    departures: data,
    isLoading,
    isError: error
  };
};
