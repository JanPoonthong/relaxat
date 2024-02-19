"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
    const pathname = usePathname();
    const sideBarData = [
        {
            svg: `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 44 44"
        fill="none"
    >
        <path
            d="M14.6667 9.16666H11C10.0275 9.16666 9.0949 9.55296 8.40727 10.2406C7.71964 10.9282 7.33333 11.8609 7.33333 12.8333V34.8333C7.33333 35.8058 7.71964 36.7384 8.40727 37.426C9.0949 38.1137 10.0275 38.5 11 38.5H21.4445M33 25.6667V33H40.3333M33 20.1667V12.8333C33 11.8609 32.6137 10.9282 31.9261 10.2406C31.2384 9.55296 30.3058 9.16666 29.3333 9.16666H25.6667"
            stroke="#A9A9A9"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M14.6667 20.1667H22M14.6667 27.5H20.1667M14.6667 9.16667C14.6667 8.19421 15.053 7.26157 15.7406 6.57394C16.4282 5.88631 17.3609 5.5 18.3333 5.5H22C22.9725 5.5 23.9051 5.88631 24.5927 6.57394C25.2804 7.26157 25.6667 8.19421 25.6667 9.16667C25.6667 10.1391 25.2804 11.0718 24.5927 11.7594C23.9051 12.447 22.9725 12.8333 22 12.8333H18.3333C17.3609 12.8333 16.4282 12.447 15.7406 11.7594C15.053 11.0718 14.6667 10.1391 14.6667 9.16667ZM25.6667 33C25.6667 34.9449 26.4393 36.8102 27.8145 38.1854C29.1898 39.5607 31.0551 40.3333 33 40.3333C34.9449 40.3333 36.8102 39.5607 38.1854 38.1854C39.5607 36.8102 40.3333 34.9449 40.3333 33C40.3333 31.0551 39.5607 29.1898 38.1854 27.8145C36.8102 26.4393 34.9449 25.6667 33 25.6667C31.0551 25.6667 29.1898 26.4393 27.8145 27.8145C26.4393 29.1898 25.6667 31.0551 25.6667 33Z"
            stroke="#A9A9A9"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>`,
            text: "My appointment",
        },
    ];

    return (
        <div className="flex items-center pt-12 h-full ml-5">
            <ul className="flex gap-10 flex-col justify-center text-center w-[12rem]">
                {sideBarData.map((each) => {
                    return (
                        <li key={each.text}>
                            <Link
                                className={`${pathname === "/staff/" + each.text.toLowerCase().replaceAll(" ", "") && "side-bar"} flex items-center gap-3 h-14 rounded-xl p-2"`}
                                href={
                                    "/staff/" +
                                    each.text.toLowerCase().replaceAll(" ", "")
                                }
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: each.svg,
                                    }}
                                />
                                {each.text}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
