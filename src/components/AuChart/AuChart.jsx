import React, { useState, useEffect } from "react";
import { fetchAustraliaByStates } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./AuChart.module.css";
const AuChart = () => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchAustraliaByStates());
    };
    fetchAPI();
  }, []);
  const timetrans = (dateMs) => {
    var date = new Date(dateMs); //如果date为13位不需要乘1000
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    var s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  };
  //   const barChart = confirmed ? (
  //     <Bar
  //       data={{
  //         labels: ["Infected", "Recovered", "Deaths"],
  //         datasets: [
  //           {
  //             label: "people",
  //             backgroundColor: [
  //               "rgba(0, 0, 255, 0.5)",
  //               "rgba(0, 255, 0, 0.5)",
  //               "rgba(255, 0, 0, 0.5)",
  //             ],
  //             data: [confirmed.value, recovered.value, deaths.value],
  //           },
  //         ],
  //       }}
  //       options={{
  //         legend: { display: false },
  //         title: { display: true, text: `current state in ${country}` },
  //       }}
  //     />
  //   ) : null;
  const colors = [
    "rgba(0,174,247,0.5)",
    "rgba(255,34,24,0.5)",
    "rgba(0,166,82,0.5)",
    "rgba(206,219,41,0.5)",
    "rgba(90,146,181,0.5)",
    "rgba(0,50,115,0.5)",
    "rgba(191,22,34,0.5)",
  ];
  const lineChart =
    dailyData.length === 0 ? null : (
      <Line
        data={{
          labels: dailyData.map((item) =>
            new Date(item.attributes.Date).toLocaleDateString()
          ),
          datasets: [
            {
              label: "NSW",
              data: dailyData.map((item) => Number(item.attributes.NSW)),
              borderColor: colors[0],
              fill: true,
            },
            {
              label: "VIC",
              data: dailyData.map((item) => Number(item.attributes.VIC)),
              backgroundColor: colors[1],
              fill: false,
              borderColor: colors[1],
            },
            {
              label: "QLD",
              data: dailyData.map((item) => Number(item.attributes.QLD)),
              backgroundColor: colors[2],
              fill: false,
              borderColor: colors[2],
            },
            {
              label: "SA",
              data: dailyData.map((item) => Number(item.attributes.SA)),
              backgroundColor: colors[3],
              fill: false,
              borderColor: colors[3],
            },
            {
              label: "TAS",
              data: dailyData.map((item) => Number(item.attributes.TAS)),
              backgroundColor: colors[4],
              fill: true,
              borderColor: colors[4],
            },
            {
              label: "NT",
              data: dailyData.map((item) => Number(item.attributes.NT)),
              backgroundColor: colors[5],
              fill: true,
              borderColor: colors[5],
            },
            {
              label: "ACT",
              data: dailyData.map((item) => Number(item.attributes.ACT)),
              backgroundColor: colors[6],
              fill: true,
              borderColor: colors[6],
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: "Confirmed Cases In Au States",
          },
        }}
      />
    );
  const testsLineChart =
    dailyData.length === 0 ? null : (
      <Line
        data={{
          labels: dailyData.map((item) =>
            new Date(item.attributes.Date).toLocaleDateString()
          ),
          datasets: [
            {
              label: "NSW",
              data: dailyData.map((item) => Number(item.attributes.NSW_Tests)),
              borderColor: colors[0],
              fill: true,
            },
            {
              label: "VIC",
              data: dailyData.map((item) => Number(item.attributes.VIC_Tests)),
              backgroundColor: colors[1],
              fill: false,
              borderColor: colors[1],
            },
            {
              label: "QLD",
              data: dailyData.map((item) => Number(item.attributes.QLD_Tests)),
              backgroundColor: colors[2],
              fill: false,
              borderColor: colors[2],
            },
            {
              label: "SA",
              data: dailyData.map((item) => Number(item.attributes.SA_Tests)),
              backgroundColor: colors[3],
              fill: false,
              borderColor: colors[3],
            },
            {
              label: "TAS",
              data: dailyData.map((item) => Number(item.attributes.TAS_Tests)),
              backgroundColor: colors[4],
              fill: false,
              borderColor: colors[4],
            },
            {
              label: "NT",
              data: dailyData.map((item) => Number(item.attributes.NT_Tests)),
              backgroundColor: colors[5],
              fill: true,
              borderColor: colors[5],
            },
            {
              label: "ACT",
              data: dailyData.map((item) => Number(item.attributes.ACT_Tests)),
              backgroundColor: colors[6],
              fill: true,
              borderColor: colors[6],
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: "Tested Cases In Au States",
          },
        }}
      />
    );
  return (
    <React.Fragment>
      <div className={styles.container}>{lineChart}</div>
      <div className={styles.container}>{testsLineChart}</div>
    </React.Fragment>
  );
};
export default AuChart;
