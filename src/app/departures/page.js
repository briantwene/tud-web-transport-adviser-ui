//departures is client side so tell next to render on the client side
"use client";

import { stopsEnum } from "@/components/preferences/stopEnum";
import { useDepartures } from "@/hooks/useDepartures";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getAgencyColor } from "@/utils/agencyEnum";
import { Tag, List } from "antd";
import React from "react";
import Lottie from "lottie-react";
import loading from "../../utils/parallel-lines-animation.json";

const { Item } = List;
const Departures = () => {
  //get preferences
  const [preferences, setPreferences] = useLocalStorage(
    "web-transport-prefs",
    {}
  );
  // get the starting stop
  const { start } = preferences;

  //use this to fetch departures from the API if avaliable
  const { departures, isLoading, isError } = useDepartures(start?.stopId);

  // based off the fixed stops get the current stop selected
  const currentStop = stopsEnum.find(({ stopId }) => stopId === start?.stopId);
  // and from that get all the routes, map them into tags
  const routeBadges = currentStop?.routes?.map((route) => (
    <Tag className={`${getAgencyColor(route.agency)}`}>{route.route}</Tag>
  ));
  return (
    <main className="container flex flex-col h-full mx-auto">
      <div className="flex flex-col w-full p-4 border-b">
        <div className="text-base font-semibold">{start?.name}</div>
        <span className="text-base font-semibold">{routeBadges}</span>
      </div>
      <div>
        {/* check if the fetcher is loading if it is play animation, else deal with it depending on if there is no preferences or not */}
        {isLoading ? (
          <Lottie animationData={loading} loop={true} />
        ) : Object.keys(preferences ?? {}).length === 0 ? (
          <NoPrefs />
        ) : (
          <List
            dataSource={departures}
            grid={{ gutter: 2, column: 1 }}
            itemLayout="vertical"
            renderItem={(item) => <Item key={item.trip}></Item>}
          />
        )}
      </div>
    </main>
  );
};

export default Departures;
