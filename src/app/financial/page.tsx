import IncomeSummary from "../ui/financial/income-summary";
import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";
import Export from "../ui/home/export";

export default async function Page() {
    return (
        <div className="flex pt-12 gap-[6rem]">
            <SideBar />
            <div className="flex justify-between w-full">
                <IncomeSummary />
                <Export />
            </div>
        </div>
    );
}
