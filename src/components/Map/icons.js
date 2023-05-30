//custom icons for leaflet.js maps
"use client";
import { Icon } from "leaflet";

const pinIcon = new Icon({
  iconUrl: "/icons/pin-location-icon.svg",
  iconSize: [36, 36]
});

const flagRed = new Icon({
  iconUrl: "/icons/flag-red-icon.svg",
  iconSize: [24, 24],
  iconAnchor: [5, 20]
});

const flagGreen = new Icon({
  iconUrl: "/icons/flag-green-icon.svg",
  iconSize: [24, 24],
  iconAnchor: [5, 20]
});

const busStop = new Icon({
  iconUrl: "/icons/bus-stop.png",
  iconSize: [24, 24]
});

const trainStop = new Icon({
  iconUrl: "/icons/rail.png",
  iconSize: [24, 24]
});

const endTrainStop = new Icon({
  iconUrl: "/icons/end_rail_stop.png",
  iconSize: [24, 24]
});

const endBusStop = new Icon({
  iconUrl: "/icons/end_bus_stop.png",
  iconSize: [24, 24]
});

export {
  pinIcon,
  flagRed,
  flagGreen,
  busStop,
  trainStop,
  endBusStop,
  endTrainStop
};
