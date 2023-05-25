import { getTimeDiff, getTripDuration } from "@/utils/dateTimeFunctions";
import { RiArrowRightSLine } from "react-icons/ri";
import React from "react";

const TransportCard = ({
  route: { route, agency, startStop, endStop, startStopTime, endStopTime }
}) => {
  const { arrive, depart, elapsed } = getTripDuration(
    startStopTime.departure_time,
    endStopTime.arrival_time,
    0,
    0
  );
  return (
    <div className="flex flex-row items-center p-4 transition-all border-y">
      <div className="flex flex-col gap-4 grow">
        <div className="">
          <span className="mr-2 text-black bg-yellow-300 badge badge-lg">
            {route.short_name}
          </span>
        </div>
        <div>
          {depart} - {arrive}
        </div>
        <div className="text-sm">
          {startStop.name} <RiArrowRightSLine /> {endStop.name}
        </div>
      </div>
      <div>{elapsed} min</div>
    </div>
  );
};

export default TransportCard;
