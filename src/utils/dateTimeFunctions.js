const padTimeString = (timeString) => {
  let paddedTime = timeString
    ?.split(":")
    .map((timePart) => timePart.padStart(2, "0"))
    .join(":");
  return paddedTime; // outputs "10:30:45"
};

const convertToMs = (mins) => mins * 1000;
const getJustTime = (datetime) => {
  const date = new Date(datetime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours}:${minutes}`;
  return time;
};

export const getTripDuration = (depart, arrival, departReal, arrivalReal) => {
  const sampleDate = "1970-01-01";
  //first convert static times
  const parsedDepart = Date.parse(`${sampleDate}T${padTimeString(depart)}`);
  const parsedArrival = Date.parse(`${sampleDate}T${padTimeString(arrival)}`);

  //apply realtime to them
  const newArrival = parsedArrival + convertToMs(arrivalReal);
  const newDeparture = parsedDepart + convertToMs(departReal);

  //convert back to date and get just the time
  const newArrivalTime = getJustTime(newArrival);
  const newDepartureTime = getJustTime(newDeparture);

  //find the difference and return

  console.log(parsedDepart, parsedArrival);

  return {
    elapsed: Math.round((newArrival - newDeparture) / 60000),
    depart: formatTime(newDeparture),
    arrive: formatTime(newArrival)
  };
};

export const timeFormatter = (time) => {
  //check if the string goes beyond
  const [hours, minutes] = timeString.split(":");

  //check if beyond standard time
  let convertedHours = parseInt(hours);
  if (convertedHours >= 24) {
    convertedHours = convertedHours % 24;
  }

  const convertedTimeString = `${convertedHours
    .toString()
    .padStart(2, "0")}:${minutes}:${seconds}`;
  const timestamp = Date.parse(`01 Jan 1970 ${convertedTimeString} GMT`);

  return timestamp;
};

export const formatTime = (time) => {
  let date;
  if (typeof time === "number") {
    date = new Date(time);
  } else {
    const [hour, minute] = time.split(":");
    date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // check if beyond standard time
  const convertedHours = hours >= 24 ? hours % 24 : hours;

  const formattedHours = convertedHours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};
