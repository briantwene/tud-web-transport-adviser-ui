import { getTimeDiff, getTripDuration } from "@/utils/dateTimeFunctions";
import { Badge, Card, Tag } from "antd";
import React from "react";
import {
  agencyHexColor,
  getAgencyColor,
  getAgencyColorHex
} from "@/utils/agencyEnum";

//transport card components
const TransportCard = ({
  route: {
    route,
    agency,
    startStop,
    endStop,
    startStopTime,
    endStopTime,
    realStart,
    realEnd
  }
}) => {
  //calculate the live arrival, departure and journey time
  const { arrive, depart, elapsed } = getTripDuration(
    startStopTime.departure_time,
    endStopTime.arrival_time,
    realStart,
    realEnd
  );
  return (
    <Card className="mx-4">
      <div className="flex flex-col gap-4 grow">
        <div className="flex justify-between">
          <Tag
            className={`${getAgencyColor(
              agency.name,
              route.short_name
            )} text-base`}
          >
            {route.short_name}
          </Tag>
          <div>{elapsed} min</div>
        </div>
        <div>
          {depart} - {arrive}
        </div>
        <div className="text-sm">
          {startStop.name} - {endStop.name}
        </div>
      </div>
    </Card>
  );
};

export default TransportCard;
