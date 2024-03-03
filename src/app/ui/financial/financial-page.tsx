"use client";

import Border from "../border/border";
import Export from "../home/export";
import IncomeSummaryGraph from "../home/income-summary-graph";
import NavBar from "../home/nav-bar";
import SideBar from "../home/side-bar";
import { DonutChart } from "./donut-chart";
import IncomeSummary from "./income-summary";
import TotalVistor from "./total-vistor";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";

export default function FinancialPage() {
    const [data, setData] = useState<any>(null);
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

    useEffect(() => {
        fetch(`${api}/financial/servicesUsage`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;

    const total = data
        .slice(1)
        .reduce((acc: any, [, value]: any) => acc + Number(value), 0);

    return (
        <div>
            <NavBar />
            <div className="flex gap-[6rem]">
                <SideBar />
                <div className="flex justify-between w-full pt-12 flex-wrap mr-5">
                    <IncomeSummary />
                    <Export />
                    <Border>
                        <IncomeSummaryGraph />
                    </Border>
                    <div className="flex w-[100%] pt-4 gap-4">
                        <div className="w-[50%]">
                            <h2 className="font-bold text-xl">
                                Total visitors
                            </h2>
                            <Border>
                                <TotalVistor session={session} />
                            </Border>
                        </div>
                        <div className="w-[50%]">
                            <h2 className="font-bold text-xl">Services used</h2>
                            <Border style="h-[84%]">
                                <DonutChart data={data} />
                                <h3 className="font-bold text-2xl relative bottom-12 pl-6">
                                    Total: {total}
                                </h3>
                            </Border>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
