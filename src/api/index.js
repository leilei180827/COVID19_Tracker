import axios from "axios";
const url = "https://covid19.mathdro.id/api";
export const fetchData = async () => {
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log("error" + error);
  }
};
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    return data;
  } catch (error) {
    console.log("error" + error);
  }
};
export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    console.log(countries);
    return countries;
  } catch (error) {
    console.log("error" + error);
  }
};
