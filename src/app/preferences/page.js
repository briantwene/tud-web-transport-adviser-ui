"use client";

import React from "react";
import Map from "@/components/Map";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import PreferenceForm from "@/components/preferences/PreferenceForm";

const Preferences = () => {
  return (
    <main className="container flex flex-col min-h-screen mx-auto ">
      <div className="grow">
        <Map />
      </div>
      <div
        className="flex flex-col items# 
       m-4 grow"
      >
        <div className="flex justify-center text-xl font-semibold">
          Preferences
        </div>
        <PreferenceForm />
        {/* <button className="btn" onClick={setPrefs}>
          Button
        </button> */}
      </div>
    </main>
  );
};

export default Preferences;
