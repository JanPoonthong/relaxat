"use client";

import Border from "../border/border";
import Export from "../home/export";
import IncomeSummaryGraph from "../home/income-summary-graph";
import NavBar from "../home/nav-bar";
import SideBar from "../home/side-bar";
import { DonutChart, total } from "./donut-chart";
import IncomeSummary from "./income-summary";
import TotalVistor from "./total-vistor";
import { redirect } from "next/navigation";

export default function FinancialPage() {
    let session = localStorage.getItem("session");
    if (!session) return redirect("/signin");

    session = JSON.parse(session);

    return (
        <>
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
                                <DonutChart />
                                <h3 className="font-bold text-2xl relative bottom-12 pl-6">
                                    Total: {total}
                                </h3>
                            </Border>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
