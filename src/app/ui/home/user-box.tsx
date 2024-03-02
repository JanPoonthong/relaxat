"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserBox() {
    let session;

    if (typeof localStorage !== "undefined") {
        session = JSON.parse(localStorage.getItem("session") || "{}");
    }

    if (JSON.stringify(session) === "{}") return <p>Go /signin</p>;

    const handleOnClick = () => {
        localStorage.removeItem("session");
    };

    return (
        <div>
            {JSON.stringify(session) !== "{}" ? (
                <div className="flex items-center gap-3 pr-3">
                    <p>{session.first_name}</p>
                    <button
                        type="button"
                        onClick={handleOnClick}
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                    >
                        Log out
                    </button>
                </div>
            ) : (
                <div>
                    <Link href="/signin">
                        <button
                            type="button"
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                        >
                            Sign In
                        </button>
                    </Link>
                    <Link href="/signup">
                        <button
                            type="button"
                            className="hover:underline px-5 py-2.5"
                        >
                            Sign Up
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
