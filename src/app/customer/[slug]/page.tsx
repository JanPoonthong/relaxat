import Border from "@/app/ui/border/border";
import NavBar from "../../ui/home/nav-bar";
import SideBar from "../../ui/home/side-bar";
import { data } from "@/app/ui/home/income-summary-graph";
import DropDownButton from "@/app/ui/dropdownbutton/drop-down-button";

export default function Page({ params }: { params: { slug: string } }) {
    console.log(params);
    return (
        <>
            <NavBar />
            <div className="flex gap-[6rem]">
                <SideBar />
                <div className="w-full pt-12 mr-5">
                    <Border style="h-full p-2">
                        <div className="flex justify-between">
                            <h1 className="text-2xl">{params.slug}</h1>
                            <DropDownButton />
                        </div>
                        <div className="pt-12">
                            <Border style="h-[9rem]">hello</Border>
                        </div>
                    </Border>
                </div>
            </div>
        </>
    );
}
