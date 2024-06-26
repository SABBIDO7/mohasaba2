import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEffect } from "react";
import { useState } from "react";
import {
  getBarChartData,
  getPieChartData,
} from "../BackendEndPoints/Endpoint1";
export default function BasicPie() {
  const [datasetBarMonth, setDatasetBarMonth] = useState(null);
  const [dataPie, setDataPie] = useState(null);
  useEffect(() => {
    getPieChartData().then((response) => {
      if (response.status == "success") {
        setDataPie(response.result);
      }
    });
    getBarChartData().then((response) => {
      if (response.status == "success") {
        setDatasetBarMonth(response.result);
      }
    });
  }, []);

  const chartSetting = {
    yAxis: [
      {
        // label: "Balance (USD)",
        tickFormat: (value) => value.toLocaleString(), // Format large numbers with commas
      },
    ],
    width: 500,
    height: 325,
    margin: { left: 75, top: 75 }, // Add margin to provide space for labels

    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-5px, 0)",
      },
    },
  };
  const valueFormatter = (value, cur) =>
    `${value.toLocaleString()} ${localStorage.getItem(
      "Cur" + localStorage.getItem("mainCur")
    )}`;

  return (
    <div className="">
      {dataPie && (
        <PieChart
          series={[
            {
              data: dataPie,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          width={400}
          height={200}
        />
      )}
      {datasetBarMonth && (
        <BarChart
          dataset={datasetBarMonth}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "SA_AP", label: "SALES", valueFormatter },
            { dataKey: "PR_AP", label: "PURCHASE RETURN", valueFormatter },
            { dataKey: "PI_AP", label: "PURCHASE", valueFormatter },
            { dataKey: "SR_AP", label: "SALES RETURN", valueFormatter },
          ]}
          {...chartSetting}
        />
      )}
    </div>
  );
}
