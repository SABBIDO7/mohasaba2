import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEffect } from "react";
import { useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import {
  getBarChartData,
  getPieChartData,
  getProfitData,
} from "../BackendEndPoints/Endpoint1";
export default function BasicPie() {
  const [datasetBarMonth, setDatasetBarMonth] = useState(null);
  const [dataPie, setDataPie] = useState(null);
  const [dataProfit, setDataProfit] = useState(null);
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
    getProfitData(2024).then((response) => {
      if (response.status == "success") {
        setDataProfit(response.result);
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
    <div className="flex flex-row">
      <div className="">
        {dataPie && (
          <PieChart
            series={[
              {
                data: dataPie,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
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
      <div>
        {dataProfit && (
          <Gauge
            width={300}
            value={dataProfit}
            valueMax={100000}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 20,
                fontWeight: 700,
                transform: "translate(0px, 0px)",
              },
            }}
            text={({ value, valueMax }) =>
              `${value.toLocaleString()} ${localStorage.getItem(
                "Cur" + localStorage.getItem("mainCur")
              )}`
            }
          />
        )}
      </div>
    </div>
  );
}
