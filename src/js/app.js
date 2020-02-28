import '../css/style.css';
import locations from "./store/location";

locations.init().then(res => {
  console.log(locations);
  console.log(res);
  console.log(locations.getCitiesByCountryCode("UA"));
});
