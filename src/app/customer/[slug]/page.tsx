import Border from "@/app/ui/border/border";
import NavBar from "../../ui/home/nav-bar";
import SideBar from "../../ui/home/side-bar";
import DropDownButton from "@/app/ui/dropdownbutton/drop-down-button";
import Footer from "@/app/ui/customer/footer";

const data = [
    {
        label: "Left side part",
    },
    {
        label: "Right side part",
    },
    {
        label: "Hairline",
    },
    {
        label: "Upper half",
    },
    {
        label: "Center back",
    },
    {
        label: "Lower half",
    },
    {
        label: "Nape",
    },
    {
        label: "Crown",
    },
];

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <>
            <NavBar />
            <div className="flex gap-[6rem]">
                <SideBar />
                <div className="w-full pt-12 mr-5">
                    <Border style="h-full p-2 relative">
                        <div className="flex justify-between">
                            <h1 className="text-2xl">{params.slug} </h1>
                            <DropDownButton />
                        </div>
                        <div className="pt-5 pb-12">
                            <Border style="h-full p-4">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Haircut
                                </h3>
                                <div className="mt-2 grid grid-rows-4 grid-flow-col gap-4 w-[80%]">
                                    {data.map((each) => {
                                        return (
                                            <div key={each.label}>
                                                <label
                                                    key={each.label}
                                                    htmlFor={each.label}
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    {each.label}
                                                </label>
                                                <input
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    type="text"
                                                    name={each.label}
                                                ></input>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Border>
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
