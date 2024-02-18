"use client";
import { useState } from "react";
import Border from "../../ui/border/border";

export default function Review({ commentDate }: { commentDate: number }) {
    const differenceInDays = Math.round(commentDate / 86400000);
    const [likeIconBool, setLikeIconBool] = useState(false);
    const [thumbUpIconBool, setThumbUpIconBool] = useState(false);

    const data = [
        {
            id: 1,
            user: "markotto",
            comment: "Great service",
            rating: 4,
            date: differenceInDays,
            replie: [
                {
                    id: 1.1,
                    user: "markotto",
                    comment: "Great service",
                    rating: 4,
                    date: new Date(),
                },
            ],
        },
    ];

    function thumbUp() {
        if (thumbUpIconBool === false) {
            setThumbUpIconBool(true);
        } else {
            setThumbUpIconBool(false);
        }
    }

    function likeIcon() {
        if (likeIconBool === false) {
            setLikeIconBool(true);
        } else {
            setLikeIconBool(false);
        }
    }
    return (
        <Border style="p-2">
            {data.map((each) => {
                return (
                    <Border key={each.id} style="p-2">
                        <h3 className="font-bold text-blue-500">
                            @{each.user}{" "}
                            <span className="text-black">
                                * {each.date} days ago
                            </span>
                        </h3>
                        <div className="pl-6">
                            <p className="pt-2 pb-2">{each.comment}</p>
                            <div className="flex gap-4 items-center">
                                <button>REPLY</button>
                                <button onClick={() => thumbUp()}>
                                    {thumbUpIconBool ? (
                                        <i className="bi bi-hand-thumbs-up-fill"></i>
                                    ) : (
                                        <i className="bi bi-hand-thumbs-up"></i>
                                    )}
                                </button>
                                <button onClick={() => likeIcon()}>
                                    {likeIconBool ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_325_4221)">
                                                <path
                                                    d="M5.23422 2.30539C5.89802 2.19229 6.57874 2.22959 7.2262 2.41456C7.87366 2.59953 8.47135 2.92745 8.97522 3.37414L9.00297 3.39889L9.02847 3.37639C9.50937 2.95436 10.0747 2.63973 10.6869 2.4535C11.299 2.26726 11.9438 2.2137 12.5782 2.29639L12.7627 2.32339C13.5625 2.46147 14.31 2.81325 14.9261 3.34149C15.5422 3.86972 16.004 4.55475 16.2626 5.32401C16.5211 6.09328 16.5669 6.91816 16.3949 7.71129C16.2229 8.50442 15.8397 9.23629 15.2857 9.82939L15.1507 9.96814L15.1147 9.99889L9.52722 15.5331C9.39828 15.6608 9.22745 15.7373 9.04639 15.7486C8.86532 15.7599 8.68629 15.7052 8.54247 15.5946L8.47197 15.5331L2.85222 9.96664C2.25689 9.38738 1.8335 8.65465 1.62894 7.84959C1.42439 7.04453 1.44665 6.19856 1.69326 5.40537C1.93988 4.61219 2.40122 3.90274 3.02619 3.35559C3.65117 2.80845 4.41539 2.44496 5.23422 2.30539Z"
                                                    fill="#CC0000"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_325_4221">
                                                    <rect
                                                        width="18"
                                                        height="18"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    ) : (
                                        <i className="bi bi-heart"></i>
                                    )}
                                </button>
                                <button>
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>
                            </div>
                        </div>
                        <div className="pl-6 pt-5"></div>
                    </Border>
                );
            })}
        </Border>
    );
}
