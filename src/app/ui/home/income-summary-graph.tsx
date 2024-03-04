"use client";
import React from "react";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export const options = {
    vAxis: {
        minValue: 0,
        format: "฿#,##0",
        viewWindow: {
            min: 0,
        },
    },
    chartArea: { width: "80%", height: "70%" },
    colors: ["#9B6AD3"],
};

export default function IncomeSummaryGraph() {
    const [data, setData] = useState<any>();
    const [isLoading, setLoading] = useState(true);

    let session = "{}";

    if (typeof localStorage !== "undefined") {
        session = JSON.parse(localStorage.getItem("session") || "{}");
    }

    if (JSON.stringify(session) === "{}")
        return (
            <div>
                <p>Go /signin</p>
            </div>
        );

    if (session.branch_id === undefined) return <p>Can not view data</p>;

    useEffect(() => {
        fetch(`${api}/financial/sales?branchId=${session.branch_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(["Year", "Sales"]);
                data.data.map((each: any) => {
                    each[1] = parseInt(each[1]);
                });
                console.log(data);
                setData((prev: any) => [prev, ...data.data]);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;

    return (
        <Chart
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    );
}
