"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ManagerSideBar() {
    const pathname = usePathname();
    const sideBarItems = [
        {
            icon: "bi bi-house-door-fill me-4",
            text: "Branches",
        },
        {
            icon: "bi bi-people-fill me-4",
            text: "Employees",
        },
        {
            icon: "bi bi-scissors me-4",
            text: "Services",
        },
    ];

    return (
        <aside className="h-screen top-0 left-0 z-40 w-64" aria-label="Sidenav">
            <div className="py-5 px-3 h-full bg-white border-r border-gray-200">
                <div
                    className={
                        "text-center font-extrabold text-5xl uppercase my-5"
                    }
                >
                    Relaxat
                </div>
                <ul className="space-y-2">
                    {sideBarItems.map((item) => {
                        return (
                            <li key={item.text}>
                                <Link
                                    href={"/manager/" + item.text.toLowerCase()}
                                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
                                >
                                    <span
                                        className={`${pathname === "/manager/" + item.text.toLowerCase() && "text-indigo-700 font-bold"} ml-3"`}
                                    >
                                        <i className={item.icon}></i>
                                        {item.text}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
