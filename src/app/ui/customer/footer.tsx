"use client";

import Image from "next/image";
import { useState } from "react";

export default function Footer() {
    const [showImg, setShowImg] = useState(false);
    const [showBan, setShowBan] = useState(false);

    function onClickHandlerShowImg(bool: boolean) {
        setShowImg(bool);
    }

    function onClickHandlerShowBan(bool: boolean) {
        setShowBan(bool);
    }
    return (
        <div className="flex gap-5 justify-between items-center">
            <button
                onClick={() => onClickHandlerShowBan(true)}
                className="text-red-500 underline"
            >
                Banned
            </button>
            <div className="flex gap-3 justify-around items-center">
                <button
                    onClick={() => onClickHandlerShowImg(true)}
                    className="underline"
                >
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
                    <>
                        <button
                            onClick={() => onClickHandlerShowImg(false)}
                            className="text-xl text-red-500 z-2"
                        >
                            X
                        </button>
                        <Image
                            src="/haricut_ref.png"
                            className="blur-img"
                            width={1024}
                            height={480}
                            alt="haircut ref"
                        />
                    </>
                )}
            </div>

            <div className="absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%]">
                {showBan && (
                    <div className="ban-box">
                        <div className="ban-text">
                            <h1 className="font-bold">Banned Customer</h1>
                            <p>
                                Are you sure you want to{" "}
                                <span className="text-red-700 font-bold">
                                    BANNED
                                </span>{" "}
                                customer{" "}
                                <span className="font-bold text-black">
                                    Mark Otto
                                </span>
                                ? This action can not be undone.
                            </p>
                        </div>

                        <div className="ban-footer flex gap-3">
                            <button
                                onClick={() => onClickHandlerShowBan(false)}
                                className="text-white"
                            >
                                Cancel
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                                Confirm
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
