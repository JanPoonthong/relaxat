"use client";
import React from "react";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { redirect } from "next/navigation";

export const options = {
    vAxis: {
        minValue: 0,
        viewWindow: {
            min: 0,
            max: 25,
        },
    },
    chartArea: { width: "80%", height: "70%" },
    colors: ["#9B6AD3"],
    legend: "none",
};

export default function TotalVistor({ session }: { session: any }) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    if (session?.branch_id === undefined) return <p>Can not view data</p>;

    useEffect(() => {
        fetch(`${api}/financial/totalVisitors?branchId=${session?.branch_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(["Year", "Sales"]);
                setData((prev: any) => [prev, ...data.data]);
                setLoading(false);
            });
    }, [session?.branch_id]);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;

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
