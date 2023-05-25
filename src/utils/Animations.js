import { useLottie } from "lottie-react";
import React from "react";
import loading from "./parallel-lines-animation.json";

export const LoadingAnimation = () => {
  const options = {
    animateData: loading,

    loop: true
  };

  const { View: loadingView } = useLottie(options);
  return loading;
};
