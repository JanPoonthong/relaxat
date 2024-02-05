"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [showImg, setShowImg] = useState(false);
    function onClickHandler() {
        setShowImg(true);
    }
    return (
        <div className="flex gap-5 justify-between items-center">
            <Link className="text-red-500 underline" href="#">
                Banned
            </Link>
            <div className="flex gap-3 justify-around items-center">
                <button onClick={() => onClickHandler()} className="underline">
                    ref
                </button>
                <button className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-1 px-2 rounded">
                    Close
                </button>
                <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-1 px-2 rounded">
                    Save Changes
                </button>
            </div>
            <div className="absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%]">
                {showImg && (
                    <Image
                        src="/haricut_ref.png"
                        className="blur-img"
                        width={1024}
                        height={480}
                        alt="haircut ref"
                    />
                )}
            </div>
        </div>
    );
}
