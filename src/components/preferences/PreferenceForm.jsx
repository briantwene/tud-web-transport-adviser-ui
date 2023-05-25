import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { useState } from "react";
import { Controller, useForm, useController } from "react-hook-form";
import Select from "react-select";

import { usePreferences } from "@/hooks/usePreferences";
import { useRouter } from "next/navigation";
import { stopsEnum } from "./stopEnum";

const PreferenceForm = () => {
  const router = useRouter();
  const [preferences, setPreferences] = useLocalStorage(
    "web-transport-prefs",
    {}
  );

  const [fetchedStops, setFetchedStops] = useState([]);

  //set up form functions
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm();

  const { field } = useController({ name: "route", control });
  const { field: startField } = useController({ name: "start", control });
  const { field: endField } = useController({ name: "end", control });

  //watch these variables
  const selectedStart = watch("start");
  const selectedStop = watch("end");
  const selectedRoute = watch("route");

  const { stops, isLoading, isError } = usePreferences(
    selectedStart?.stopId,
    selectedRoute?.route
  );

  // set prefs
  const setPrefs = (prefs) => {
    setPreferences(prefs);
    router.push("/");
    console.log("pushed");
  };

  // form methods

  const onStartChange = (option) => {
    startField.onChange(option.value);
    console.log(selectedStart);
  };

  const onRouteChange = (option) => {
    field.onChange(option.value);

    console.log(option);
    //then run the fetch function
  };

  const onEndChange = (option) => {
    endField.onChange(option.value);

    console.log(selectedStop);
  };

  const onSubmit = (formValues) => {
    setPrefs(formValues);
  };

  return (
    <form className="w-full form-control" onSubmit={handleSubmit(onSubmit)}>
      <>
        <label className="label">
          <span className="label-text">Select Starting Stop</span>
        </label>

        <Select
          options={stopsEnum.map((stop) => ({
            value: stop,
            label: stop.name
          }))}
          value={stopsEnum.find(({ value }) => value === startField.value)}
          onChange={onStartChange}
        />
      </>

      {/* can put loading here */}
      {selectedStart && (
        <>
          <label className="label">
            <span className="label-text">Select Route</span>
          </label>

          <Select
            options={selectedStart.routes.map((route) => ({
              value: route,
              label: route.route
            }))}
            value={stopsEnum.find(({ value }) => value === field.value)}
            onChange={onRouteChange}
          />
        </>
      )}
      {selectedRoute && (
        <>
          <label className="label">
            <span className="label-text">Select Ending Stop</span>
          </label>

          <Select
            options={
              stops &&
              stops.map((stop) => ({
                value: stop,
                label: stop.name
              }))
            }
            isLoading={isLoading}
            value={stops?.find(({ value }) => value === endField.value)}
            onChange={onEndChange}
          />
        </>
      )}
      <input
        className="mt-4 btn"
        type="submit"
        value="save"
        disabled={!selectedRoute || !selectedStart || !selectedStop}
      />
    </form>
  );
};

export default PreferenceForm;
