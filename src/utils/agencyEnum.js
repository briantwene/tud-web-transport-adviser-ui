export const agencyEnum = {
  DUBLINBUS: "text-black bg-yellow-300",
  LUAS_GREEN: "text-white bg-green-300",
  LUAS_RED: "text-white bg-red-300",
  DEFAULT: "text-white bg-slate-300"
};

export const agencyHexColor = {
  DUBLINBUS: "#ffe600",
  LUAS_GREEN: "#3d8c40",
  LUAS_RED: "#9d0000",
  DEFAULT: "#a69e92"
};

export const getAgencyColor = (agency, subroute = null) => {
  switch (agency) {
    case "Bus Átha Cliath – Dublin Bus":
      return agencyEnum.DUBLINBUS;
    case "LUAS":
      if (subroute === "Green") {
        console.log("EEeee");
        return agencyEnum.LUAS_GREEN;
      } else {
        return agencyEnum.LUAS_RED;
      }
  }
};

export const getAgencyColorHex = (agency, subroute = null) => {
  switch (agency) {
    case "Dublin Bus / Bus Átha Cliath":
      return agencyHexColor.DUBLINBUS;
    case "LUAS":
      if (subroute === "Green") {
        return agencyHexColor.LUAS_GREEN;
      } else {
        return agencyHexColor.LUAS_RED;
      }
  }
};
