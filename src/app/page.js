"use client";
import Image from "next/image";

import { useRoute } from "@/hooks/useRoute";

import Lottie from "lottie-react";
import loading from "../utils/parallel-lines-animation.json";

import { LoadingAnimation } from "@/utils/Animations";
import Link from "next/link";

import { useEffect, useState } from "react";
import { List } from "antd";
import TransportCard from "@/components/route/TransportCard";
import NoPrefs from "@/components/route/NoPrefs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTripStore } from "@/zustandStore/tripStore";

const { Item } = List;

// home page
export default function Home() {
  const [preferences, setPreferences] = useLocalStorage(
    "web-transport-prefs",
    {}
  );

  // get the routes/trips from the API
  const { routes, isLoading, isError } = useRoute(
    preferences?.start?.stopId,
    preferences?.end?.id
  );

  // store them in the state container for later use
  const setTrips = useTripStore((state) => state.setTrips);
  setTrips(routes);

  return (
    <main className="container flex flex-col h-full mx-auto ">
      <div className="flex items-center justify-center w-full h-16">
        <h1 className="text-2xl font-bold">Routes</h1>
      </div>

      <div className="w-full">
        <>
          {/* if loading then display animation and after if there is no preferences set give a prompt to do so */}
          {isLoading ? (
            <Lottie animationData={loading} loop={true} />
          ) : Object.keys(preferences ?? {}).length === 0 ? (
            <NoPrefs />
          ) : (
            // or render the list of trips
            <List
              dataSource={routes}
              grid={{ gutter: 2, column: 1 }}
              itemLayout="vertical"
              renderItem={(item) => (
                <Item key={item.trip.id}>
                  <Link href={`/details/${item.trip.id}`}>
                    <TransportCard route={item} />
                  </Link>
                </Item>
              )}
            />
          )}
        </>
      </div>
    </main>
  );
}
