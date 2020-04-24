import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "people",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `current state in ${country}` },
      }}
    />
  ) : null;
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
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};
export default Chart;
