"use client";
import React from "react";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const options = {
    pieHole: 0.4,
    is3D: false,
    colors: ["#7D58C6", "#D9D9D9", "#A9A9A9"],
    legend: {
        position: "left",
        textStyle: { fontSize: 16 },
    },
};

export function DonutChart({ data }: { data: any }) {
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
