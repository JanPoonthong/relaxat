import IncomeSummary from "../ui/financial/income-summary";
import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";
import Export from "../ui/home/export";
import { DonutChart, total } from "../ui/financial/donut-chart";
import IncomeSummaryGraph from "../ui/home/income-summary-graph";
import TotalVistor from "../ui/financial/total-vistor";
import Border from "../ui/border/border";

export default async function Page() {
    return (
        <>
            <NavBar />
            <div className="flex gap-[6rem]">
                <SideBar />
                <div className="flex justify-between w-full pt-12 flex-wrap">
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
                                <TotalVistor />
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
