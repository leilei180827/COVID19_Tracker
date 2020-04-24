import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
const Chart = () => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);
  const lineChart =
    dailyData.length === 0 ? null : (
      <Line
        data={{
          labels: dailyData.map(({ reportDate }) => reportDate),
          datasets: [
            {
              label: "Infected",
              data: dailyData.map(({ confirmed }) => confirmed.total),
              borderColor: "#3333ff",
              fill: true,
            },
            {
              label: "Deaths",
              data: dailyData.map(({ deaths }) => deaths.total),
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
              borderColor: "red",
            },
          ],
        }}
      />
    );
  return <div className={styles.container}>{lineChart}</div>;
};
export default Chart;
