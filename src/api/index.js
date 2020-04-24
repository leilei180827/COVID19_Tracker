import axios from "axios";
const url = "https://covid19.mathdro.id/api";
export const fetchData = async (country) => {
  try {
    let changeableUrl = url;
    if (country) changeableUrl = `${url}/countries/${country}`;
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);
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
    return countries;
  } catch (error) {
    console.log("error" + error);
  }
};
