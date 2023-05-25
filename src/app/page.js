"use client";
import Image from "next/image";

import { useRoute } from "@/hooks/useRoute";

import Lottie from "lottie-react";
import loading from "../utils/parallel-lines-animation.json";

import { LoadingAnimation } from "@/utils/Animations";
import Link from "next/link";

import { useEffect, useState } from "react";

import TransportCard from "@/components/route/TransportCard";
import NoPrefs from "@/components/route/NoPrefs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTripStore } from "@/zustandStore/tripStore";

export default function Home() {
  const [preferences, setPreferences] = useLocalStorage(
    "web-transport-prefs",
    {}
  );

  const { routes, isLoading, isError } = useRoute(
    preferences?.start?.stopId,
    preferences?.end?.id
  );

  console.log("routes", routes);

  const setTrips = useTripStore((state) => state.setTrips);
  setTrips(routes);

  return (
    <main className="container flex flex-col min-h-screen mx-auto ">
      <div className="flex items-center justify-center w-full h-16">
        <h1 className="text-2xl font-bold">Routes</h1>
        {/* could add a start and destiantion selection there if wanted in the future */}

        {/* would put the cards that have the information on the route options */}
      </div>

      <div className="w-full">
        <>
          {isLoading ? (
            <Lottie animationData={loading} loop={true} />
          ) : Object.keys(preferences ?? {}).length === 0 ? (
            <NoPrefs />
          ) : (
            routes?.map((route, key) => (
              <Link href={`/details/${route.trip.id}`} key={route.trip.id}>
                <TransportCard route={route} />
              </Link>
            ))
          )}
        </>
      </div>
    </main>
  );
}
