import { useLocalStorage } from "@/hooks/useLocalStorage";
import { formatTime } from "@/utils/dateTimeFunctions";
import { Step } from "rc-steps";
import React from "react";

//item component for the details page timeline taking the time and stop name form the node
const RouteItem = ({ node: { arrivalTime, name } }) => {
  return (
    <li>
      <time dateTime={arrivalTime}>{formatTime(arrivalTime)}</time>
      <span>
        <strong>{name}</strong> On time
      </span>
    </li>
  );
};

export default RouteItem;
