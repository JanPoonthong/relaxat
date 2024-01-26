import IncomeSummary from "../ui/financial/income-summary";
import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";
import Export from "../ui/home/export";
import DonutChart from "../ui/financial/donut-chart";
import IncomeSummaryGraph from "../ui/home/income-summary-graph";
import TotalVistor from "../ui/financial/total-vistor";

export default async function Page() {
    return (
        <>
            <NavBar />
            <div className="flex gap-[6rem]">
                <SideBar />
                <div className="flex justify-between w-full pt-12 flex-wrap">
                    <IncomeSummary />
                    <Export />
                    <div className="basis-full border-slate-300 border rounded-md">
                        <IncomeSummaryGraph />
                    </div>
                    <div className="flex w-[100%]">
                        <TotalVistor />
                        <DonutChart />
                    </div>
                </div>
            </div>
        </>
    );
}
