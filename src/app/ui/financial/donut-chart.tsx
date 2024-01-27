"use client";
import React from "react";
import { Chart } from "react-google-charts";

const data = [
    ["Service", "Service used"],
    ["Haircut", 200],
    ["Message", 55],
    ["Nail", 60],
];

export const total = data
    .slice(1)
    .reduce((acc, [, value]) => acc + Number(value), 0);

const options = {
    pieHole: 0.4,
    is3D: false,
    colors: ["#7D58C6", "#D9D9D9", "#A9A9A9"],
    legend: {
        position: "left",
        textStyle: { fontSize: 16 },
    },
};

export function DonutChart() {
    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
        />
    );
}
