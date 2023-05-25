export const agencyEnum = {
  DUBLINBUS: "text-black bg-yellow-300",
  LUAS_GREEN: "text-white bg-green-300",
  LUAS_RED: "text-white bg-red-300",
  DEFAULT: "text-white bg-slate-300"
};

export const getAgencyColor = (agency: string) => {
  switch (agency) {
    case "Dublin Bus / Bus Átha Cliath":
      return agencyEnum.DUBLINBUS;
    case "Luas":
      return agencyEnum.LUAS_GREEN;
    case "Luas":
      return agencyEnum.LUAS_RED;
  }
};
