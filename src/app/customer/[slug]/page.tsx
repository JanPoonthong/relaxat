import Border from "@/app/ui/border/border";
import NavBar from "../../ui/home/nav-bar";
import SideBar from "../../ui/home/side-bar";
import DropDownButton from "@/app/ui/dropdownbutton/drop-down-button";
import Footer from "@/app/ui/customer/footer";

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <>
            <NavBar />
            <div className="flex gap-[6rem]">
                <SideBar />
                <div className="w-full pt-12 mr-5">
                    <Border style="h-full p-2 relative">
                        <div className="flex justify-between">
                            <h1 className="text-2xl">{params.slug}</h1>
                            <DropDownButton />
                        </div>
                        <div className="pt-12">
                            <Border style="h-[9rem]">hello</Border>
                        </div>
                        <div className="absolute bottom-1 w-[99%]">
                            <Footer />
                        </div>
                    </Border>
                </div>
            </div>
        </>
    );
}
