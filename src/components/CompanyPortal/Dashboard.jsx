import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import {
  getBarChartData,
  getPieChartData,
  getProfitData,
  getLineChartDataProfit,
} from "../BackendEndPoints/Endpoint1";

export default function BasicPie() {
  const [datasetBarMonth, setDatasetBarMonth] = useState(null);
  const [dataPie, setDataPie] = useState(null);
  const [dataProfit, setDataProfit] = useState(null);
  const [dataProfitPerMonth, setDataProfitPerMonth] = useState(null);
  const [monthsProfitPerMonth, setMonthsProfitPerMonth] = useState(null);

  useEffect(() => {
    getPieChartData().then((response) => {
      if (response.status === "success") {
        setDataPie(response.result);
      }
    });
    getBarChartData().then((response) => {
      if (response.status === "success") {
        setDatasetBarMonth(response.result);
      }
    });
    getProfitData(2024).then((response) => {
      if (response.status === "success") {
        setDataProfit(response.result);
      }
    });
    getLineChartDataProfit(2024).then((response) => {
      if (response.status === "success") {
        setMonthsProfitPerMonth(response.result[0]);
        setDataProfitPerMonth(response.result[1]);
      }
    });
  }, []);

  const chartSetting = {
    yAxis: [
      {
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
    <div className="grid grid-cols-3 gap-4">
      <div className="grid-item">
        {dataPie && (
          <PieChart
            series={[
              {
                data: dataPie,
                valueFormatter: (data) => {
                  console.log(data, "label");
                  return `
             
                  Value: ${data.value.toLocaleString()} ${data.Cur}
                  Invoices Number: ${data.invoices}`;
                },
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
      <div className="grid-item">
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

        {dataProfitPerMonth && monthsProfitPerMonth && (
          <LineChart
            xAxis={[
              {
                scaleType: "band",
                data: monthsProfitPerMonth,
              },
            ]}
            series={[
              {
                data: dataProfitPerMonth,
                area: true,
              },
            ]}
            width={500}
            height={300}
            {...chartSetting}
          />
        )}
      </div>
    </div>
  );
}
