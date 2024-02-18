import NavBar from "../../ui/home/nav-bar";
import BasicTimePicker from "../ui/basic-time-picker";
import SideBar from "../ui/side-bar";

export default function Page() {
    return (
        <>
            <NavBar />
            <div className="flex gap-[6rem]">
                <SideBar />
                <div className="w-full pt-12 mr-5">
                    <BasicTimePicker />
                </div>
            </div>
        </>
    );
}
