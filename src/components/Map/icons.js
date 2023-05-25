import { Icon } from "leaflet";

const pinIcon = new Icon({
  iconUrl: "icons/pin-location-icon.svg",
  iconSize: [36, 36]
});

const flagRed = new Icon({
  iconUrl: "icons/flag-red-icon.svg",
  iconSize: [36, 36]
});

const flagGreen = new Icon({
  iconUrl: "icons/flag-green-icon.svg",
  iconSize: [36, 36]
});

const busStop = new Icon({
  iconUrl: "icons/bus-stop.png",
  iconSize: [36, 36]
});

const trainStop = new Icon({
  iconUrl: "icons/rail.png",
  iconSize: [36, 36]
});

export { pinIcon, flagRed, flagGreen, busStop, trainStop };
