// tell next to use client side rendering for this part
"use client";
import Map from "@/components/Map";
import RouteItem from "@/components/details/RouteItem";
import { useTripStore } from "@/zustandStore/tripStore";
import { Badge, Space, Tag, Timeline } from "antd";
import React from "react";
import { formatTime } from "@/utils/dateTimeFunctions";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getAgencyColor } from "@/utils/agencyEnum";
import { Marker, Polyline } from "react-leaflet";
import { usePreferences } from "@/hooks/usePreferences";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { busStop, flagGreen, flagRed, trainStop } from "@/components/Map/icons";

const Details = ({ params }) => {
  // get the trip passed from the main page
  const { id } = params;

  //access the trips that were fetched in the store
  const { trips } = useTripStore();

  // get preferences from localStorage
  const [preferences, setPreferences] = useLocalStorage(
    "web-transport-prefs",
    {}
  );

  // get the starting stop and the ending stop from preferences
  const { start, end } = preferences;

  // get the selected trip based on the trip id
  const trip = trips?.find((trip) => trip.trip.id === id);

  //render the items for the timeline from the stops
  const pathNodes = trip?.routeNodes.map(({ arrivalTime, name }) => ({
    label: <span>{formatTime(arrivalTime)}</span>,
    children: (
      <span>
        <strong>{name}</strong>
      </span>
    )
  }));

  // create the stops that a user will pass as markers
  const stopMarkers = trip.routeNodes.map((stop) => (
    <Marker
      key={stop.stopId}
      position={[stop.latitude, stop.longitude]}
      stop={stop}
      icon={
        start.type === "BUS"
          ? busStop
          : start.type === "LIGHT_RAIL" || start.type === "RAIL"
          ? trainStop
          : null
      }
    />
  ));

  // create starting and finishing flags
  const startMarker = start && (
    <Marker position={[start?.lat, start?.lon]} icon={flagGreen} />
  );
  const endMarker = end && (
    <Marker position={[end?.lat, end?.lon]} icon={flagRed} />
  );

  //render
  return (
    <div className="container flex flex-col h-full mx-auto ">
      <PanelGroup>
        <Panel maxSize={75}>
          <Map
            startStopMarkers={stopMarkers}
            routeMarker={[startMarker, endMarker]}
            mapPath={<Polyline positions={trip.mapPath} />}
          />
        </Panel>
        <PanelResizeHandle
          className="flex items-center justify-center h-8 border-b"
          children={
            <div className="w-8 h-2 my-2 bg-gray-300 rounded-full"></div>
          }
        />
        <Panel className="flex flex-col" maxSize={75}>
          <div className="h-20 p-4 border-b">
            <Space>
              <Tag
                className={`${getAgencyColor(
                  trip.agency.name
                )} text-base font-semibold`}
              >
                {trip.route.short_name}
              </Tag>
              <span className="font-semibold">{trip.trip.headsign}</span>
            </Space>
          </div>
          <div className="w-full h-full ml-4 timeline_container">
            <Timeline
              className="h-full px-4 overflow-hidden overflow-y-scroll"
              mode="left"
              items={pathNodes}
            />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Details;
