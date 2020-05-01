import axios from "axios";
const url = "https://covid19.mathdro.id/api";
const australiaStatesUrl =
  "https://services1.arcgis.com/vHnIGBHHqDR6y0CR/arcgis/rest/services/COVID19_Time_Series/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
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
export const fetchAustraliaByStates = async () => {
  try {
    const {
      data: { features },
    } = await axios.get(`${australiaStatesUrl}`);
    features.sort((itemA, itemB) => {
      return itemA.attributes.Date - itemB.attributes.Date;
    });
    
    console.log(features);
    return features;
  } catch (error) {
    console.log("error" + error);
  }
};
