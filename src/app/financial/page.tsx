import IncomeSummary from "../ui/financial/income-summary";
import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";
import Export from "../ui/home/export";

export default async function Page() {
    return (
        <div className="flex gap-[6rem]">
            <SideBar />
            <div className="flex justify-between w-full pt-12">
                <IncomeSummary />
                <Export />
            </div>
        </div>
    );
}
