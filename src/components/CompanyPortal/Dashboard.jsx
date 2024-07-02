import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card, CardContent, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import {
  getBarChartData,
  getPieChartData,
  getProfitData,
  getLineChartDataProfit,
  getTopSellersByAmount,
  getTopSellersByQuantity,
} from "../BackendEndPoints/Endpoint1";

export default function BasicPie() {
  const [datasetBarMonth, setDatasetBarMonth] = useState(null);
  const [dataPie, setDataPie] = useState(null);
  const [dataProfit, setDataProfit] = useState(null);
  const [dataProfitPerMonth, setDataProfitPerMonth] = useState(null);
  const [monthsProfitPerMonth, setMonthsProfitPerMonth] = useState(null);
  const [topSellersByAmount, setTopSellersByAmount] = useState(null);
  const [topSellersByQuantity, setTopSellersByQuantity] = useState(null);
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
    getTopSellersByAmount(2024).then((response) => {
      if (response.status === "success") {
        setTopSellersByAmount(response.result);
      }
    });
    getTopSellersByQuantity(2024).then((response) => {
      if (response.status === "success") {
        setTopSellersByQuantity(response.result);
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
    margin: { left: 75 }, // Add margin to provide space for labels
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
    <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 h-[100%]">
      <div className="grid-item items-center">
        <div className="h-[40%] w-[90%]">
          <Typography className="h-[5%]" variant="h6">
            Invoices
          </Typography>

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
            />
          )}
        </div>
        <div className="h-[40%] w-[90%]">
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
              sx={{ minWidth: 500 }}
            />
          )}
        </div>
      </div>
      <div className="grid-item items-center">
        <div className="h-[40%] w-[90%]">
          <Typography className="h-[5%]" variant="h6">
            Profit
          </Typography>
          {dataProfit && (
            <Gauge
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
        <div className="h-[40%] w-[90%]">
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
              {...chartSetting}
              sx={{ minWidth: 500 }}
            />
          )}
        </div>
      </div>
      <div className="grid-item items-center">
        <div className="h-[40%] w-[90%]">
          <Card>
            <CardContent>
              <Typography variant="h6">Top Sellers by Amount</Typography>
              {topSellersByAmount &&
                topSellersByAmount.map((seller, index) => (
                  <Typography
                    key={index}
                    className="flex flex-row justify-between"
                  >
                    <div className="flex flex-row">
                      {" "}
                      <h6>Item : </h6>
                      {seller.ItemName}
                    </div>
                    <div className="flex flex-row">
                      <h6>Amount : </h6>
                      {seller.TotalAmount &&
                        seller.TotalAmount.toLocaleString() +
                          " " +
                          localStorage.getItem(
                            "Cur" + localStorage.getItem("mainCur")
                          )}
                    </div>
                  </Typography>
                ))}
            </CardContent>
          </Card>
        </div>
        <div className="h-[40%] w-[90%] ">
          <Card>
            <CardContent>
              <Typography variant="h6">Top Sellers by Quantity</Typography>
              {topSellersByQuantity &&
                topSellersByQuantity.map((seller, index) => (
                  <Typography
                    key={index}
                    className="flex flex-row justify-between"
                  >
                    <div className="flex flex-row">
                      <h6>Item : </h6> : {seller.ItemName}
                    </div>
                    <div className="flex flex-row">
                      <h6>Qty : </h6>
                      {seller.TotalQty && seller.TotalQty.toLocaleString()}
                    </div>
                  </Typography>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
