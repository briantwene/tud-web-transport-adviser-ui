import { formatTime } from "@/utils/dateTimeFunctions";
import { Step } from "rc-steps";
import React from "react";

const RouteItem = ({ node: { arrivalTime, name } }) => {
  return (
    <li>
      <time datetime={arrivalTime}>{formatTime(arrivalTime)}</time>
      <span>
        <strong>{name}</strong> On time
      </span>
    </li>
  );
};

export default RouteItem;
