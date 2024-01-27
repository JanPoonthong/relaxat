import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";

export default function Page() {
    return (
        <>
            <NavBar />
            <div className="flex gap-[6rem]">
                <SideBar />
            </div>
        </>
    );
}
