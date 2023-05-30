// dynamic import as leaflet map is client side dependent
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map").then((mod) => mod.Map), {
  ssr: false
});
export default Map;
