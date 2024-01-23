import IncomeSummary from "../ui/financial/income-summary";
import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";

export default async function Page() {
    return (
        <div className="flex pt-12 gap-[6rem]">
            <SideBar /> 
            <IncomeSummary />
        </div>
    );
}
