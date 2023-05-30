//leaflet map component

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { pinIcon } from "./icons";

//pass in props from other pages
export const Map = ({
  startStopMarkers = [],
  endStopMarkers = [],
  routeMarker = [],
  mapPath = null
}) => {
  const customIcon = new Icon({
    iconUrl: "icons/pin-location-icon.svg",
    iconSize: [48, 48]
  });

  console.log(mapPath);

  //return map component
  return (
    <MapContainer
      className="z-0 w-full h-full"
      center={[53.35602258141889, -6.281886398719359]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[53.35602258141889, -6.281886398719359]}
        icon={pinIcon}
        eventHandlers={{
          click: (e) => {
            console.log(e);
          }
        }}
      />
      {/* display markers passed in from props */}
      {...startStopMarkers} {...endStopMarkers} {...routeMarker}
      {/* if mapPath is not null then render the line out */}
      {mapPath && mapPath}
    </MapContainer>
  );
};
