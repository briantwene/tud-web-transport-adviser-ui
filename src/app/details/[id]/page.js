"use client";
import Map from "@/components/Map";
import RouteItem from "@/components/details/RouteItem";
import { useTripStore } from "@/zustandStore/tripStore";
import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Details = ({ params }) => {
  const { id } = params;
  const { trips } = useTripStore();
  console.log(trips);

  const trip = trips?.find((trip) => trip.trip.id === id);
  console.log(trip);

  const pathNodes = trip.routeNodes.map((node) => (
    <>
      <RouteItem node={node} />
    </>
  ));

  return (
    <div className="container flex flex-col min-h-screen mx-auto ">
      <div className="h-1/2">
        <Map />
      </div>
      <div className="w-full h-1/2">
        <div className="p-4 border-b">
          <span className="mr-2 text-black bg-yellow-300 badge badge-lg">
            {trip.route.short_name}
          </span>
        </div>
        <ul class="events">{pathNodes}</ul>
      </div>
    </div>
  );
};

export default Details;
