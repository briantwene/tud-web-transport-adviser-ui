//telling next js to do client side rendering
"use client";
import React, { useEffect, useState } from "react";
import Map from "@/components/Map";
import PreferenceForm from "@/components/preferences/PreferenceForm";
import { Form, Select, Button, Tag } from "antd";
import { stopsEnum } from "@/components/preferences/stopEnum";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePreferences } from "@/hooks/usePreferences";
import {
  agencyHexColor,
  getAgencyColor,
  getAgencyColorHex
} from "@/utils/agencyEnum";
import { Marker } from "react-leaflet";
import {
  busStop,
  endBusStop,
  endTrainStop,
  trainStop
} from "@/components/Map/icons";
import { useRouter } from "next/navigation";
import { flagGreen } from "@/components/Map/icons";
import { flagRed } from "@/components/Map/icons";

// get subcomponents from main ant design components
const { Item } = Form;
const { Option } = Select;

const Preferences = () => {
  // state variables for managing form state
  const [startStop, setStartStop] = useState(null);
  const [endStop, setEndStop] = useState(null);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [fetchedStops, setFetchedStops] = useState([]);
  const [allMarkers, setAllMarkers] = useState([]);

  //get next js router
  const router = useRouter();
  //get preferences from the localStorage / initalise
  const [preferences, setPreferences] = useLocalStorage(
    "web-transport-prefs",
    {}
  );

  // create ant design form instance
  const [form] = Form.useForm();
  // destructre function for setting fields programmatically
  const { setFieldsValue } = form;

  // get stops from use preferences fetcher based on selected starting stop and route
  const { stops, isLoading, isError } = usePreferences(
    selectedStart?.stopId,
    selectedRoute?.route
  );

  // function for setting preferences
  const setPrefs = (prefs) => {
    //set the preferences
    setPreferences(prefs);

    // navigate to the main page
    router.push("/");
  };

  // on form submission set the preferences
  const onFinish = (values) => {
    setPrefs({ start: selectedStart, route: selectedRoute, end: selectedEnd });
  };

  // handler for the start field
  const onStartChange = (option) => {
    setSelectedStart(stopsEnum.find((stop) => stop.stopId === option));
    setSelectedRoute(null);
    setSelectedEnd(null);
    setFieldsValue({ route: undefined });
    setFieldsValue({ end: undefined });
    setFieldsValue({ end: { disabled: true } });
  };

  // handler for the route field
  const onRouteChange = (option) => {
    setSelectedRoute(
      selectedStart?.routes?.find((route) => route.route === option)
    );
    //then run the fetch function
    setSelectedEnd(null);
    setFieldsValue({ end: undefined });
    setFieldsValue({ end: { disabled: true } });
  };

  //handler for the end field
  const onEndChange = (option) => {
    setSelectedEnd(stops.find((stop) => stop.id === option));
  };

  //event handler for selecting stops on the map
  const onSelectStopMarker = ({
    target: {
      options: { stop }
    }
  }) => {
    // if the stop selected is an end stop
    // then keep record of that
    if (stops.includes(stop)) {
      setSelectedEnd(stop);
      setFieldsValue({ end: stop.id });
    } else {
      // otherwise its a starting stop so reset the other fields
      setSelectedStart(stop);
      setFieldsValue({ start: stop.stopId });
      setFieldsValue({ route: undefined });
      setFieldsValue({ end: undefined });
      setSelectedEnd(null);
      setSelectedRoute(null);
    }
  };

  // create an array of markers of the starting stops for the map
  const startStopMarkers = stopsEnum.map((stop) => (
    <Marker
      key={stop.stopId}
      position={[stop.lat, stop.lon]}
      stop={stop}
      icon={
        stop.type === "BUS"
          ? busStop
          : stop.type === "LIGHT_RAIL" || stop.type === "RAIL"
          ? trainStop
          : null
      }
      eventHandlers={{
        click: (e) => onSelectStopMarker(e)
      }}
    />
  ));

  // create an array of ending stops for the map
  const endStopMarkers = stops?.map((stop) => (
    <Marker
      key={stop.id}
      position={[stop.lat, stop.lon]}
      stop={stop}
      icon={
        selectedStart.type === "BUS"
          ? endBusStop
          : selectedStart.type === "LIGHT_RAIL" || selectedStart.type === "RAIL"
          ? endTrainStop
          : null
      }
      eventHandlers={{
        click: (e) => onSelectStopMarker(e)
      }}
    />
  ));

  // create starting point and ending point markers based on the stops that the user has selected
  const startMarker = selectedStart && (
    <Marker
      position={[selectedStart?.lat, selectedStart?.lon]}
      icon={flagGreen}
    />
  );
  const endMarker = selectedEnd && (
    <Marker position={[selectedEnd?.lat, selectedEnd?.lon]} icon={flagRed} />
  );

  //render with the necessary variables
  return (
    <main className="container flex flex-col h-full mx-auto ">
      <div className="grow">
        <Map
          startStopMarkers={startStopMarkers}
          endStopMarkers={endStopMarkers}
          routeMarker={[startMarker, endMarker]}
        />
      </div>
      <div
        className="flex flex-col items# 
       m-4 h-2/5"
      >
        <div>
          <Form form={form} onFinish={onFinish}>
            <Item name="start">
              <Select
                placeholder="select stop"
                value={selectedStart?.stopId}
                onChange={onStartChange}
              >
                {stopsEnum.map(({ name, stopId }) => (
                  <Option key={stopId} value={stopId}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Item>

            <Item name="route">
              <Select
                disabled={!selectedStart}
                placeholder="select route"
                value={selectedRoute?.route}
                onChange={onRouteChange}
              >
                {selectedStart?.routes.map(({ route, agency }) => (
                  <Option key={`${selectedStart.id}_${route}`} value={route}>
                    {route}
                  </Option>
                ))}
              </Select>
            </Item>

            <Item name="end">
              <Select
                disabled={!selectedRoute}
                placeholder="select ending stop"
                value={selectedEnd?.id}
                onChange={onEndChange}
              >
                {stops?.map(({ name, id }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!selectedRoute || !selectedStart || !selectedEnd}
              >
                Save
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Preferences;
