"use client";
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    ["Year", "Sales"],
    ["2004", 10],
    ["2005", 25],
    ["2006", 10],
    ["2007", 30],
    ["2008", 30],
];
export const options = {
    vAxis: {
        minValue: 0,
        viewWindow: {
            min: 0,
            max: 50,
        },
    },
    chartArea: { width: "80%", height: "70%" },
    colors: ["#9B6AD3"],
    legend: "none",
};

export default function TotalVistor() {
    return (
        <Chart
            chartType="AreaChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
        />
    );
}
