import IncomeSummary from "../ui/financial/income-summary";
import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";
import Export from "../ui/home/export";
import { DonutChart, total } from "../ui/financial/donut-chart";
import IncomeSummaryGraph from "../ui/home/income-summary-graph";
import FinancialPage from "../ui/financial/financial-page";

export default async function Page() {
    return (
        <>
            <FinancialPage />
        </>
    );
}
