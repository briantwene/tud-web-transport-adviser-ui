import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { pinIcon } from "./icons";

export const Map = () => {
  const customIcon = new Icon({
    iconUrl: "icons/pin-location-icon.svg",
    iconSize: [48, 48]
  });

  return (
    <MapContainer
      className="z-0 w-full h-full"
      center={[53.35602258141889, -6.281886398719359]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[53.35602258141889, -6.281886398719359]}
        icon={pinIcon}
      />
    </MapContainer>
  );
};
