"use client";
import { useState } from "react";
import Border from "../../ui/border/border";
import DropDownButton from "../../reviews/ui/drop-down-button";
import { api } from "../../lib/api";
import { useEffect } from "react";

interface StarRatingProps {
    value: number;
    onClick: (value: number) => void;
}

export default function Review({
    commentDate,
    showName,
}: {
    commentDate: number;
    showName: boolean;
}) {
    const differenceInDays = Math.round(commentDate / 86400000);
    const [likeIconBool, setLikeIconBool] = useState(false);
    const [starRating, setStarRating] = useState(0);
    const [thumbUpIconBool, setThumbUpIconBool] = useState(false);

    const [data, setData] = useState<any>();
    const [isLoading, setLoading] = useState(true);

    let session = "{}";

    if (typeof localStorage !== "undefined") {
        session = JSON.parse(localStorage.getItem("session") || "{}");
    }

    if (JSON.stringify(session) === "{}")
        return (
            <div>
                <p>Go /signin</p>
            </div>
        );

    useEffect(() => {
        fetch(`${api}/reviews?branchId=${session.branch_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
            });
    }, [session.branch_id]);

    if (isLoading) return <p>loading...</p>;
    if (!data) return <p>no profile data</p>;

    console.log(data);

    let formatData: any[] = [];
    data.map((each: any) => {
        formatData.push({
            id: each.appointment_id,
            user: each.customer_name,
            comment: each.review_text,
            rating: each.rating,
            date: each.reviewed_date,
            service_name: each.service_name,
            staff_name: each.staff_name,
        });
    });

    const StarRating: React.FC<StarRatingProps> = ({ value, onClick }) => {
        const stars = [1, 2, 3, 4, 5];

        return (
            <div className="flex items-center">
                <div className="flex-1" />
                <div className="flex items-center">
                    {stars.map((star) => (
                        <span
                            key={star}
                            onClick={() => onClick(star)}
                            style={{
                                fontSize: "3em",
                                color: star <= value ? "gold" : "gray",
                            }}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
            </div>
        );
    };

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
            {formatData.map((each) => {
                return (
                    <Border key={each.id} style="p-2">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-bold text-blue-500">
                                    @{each.user}{" "}
                                    <span className="text-black">
                                        * {each.date}
                                    </span>
                                </h3>
                                <div className="pl-6">
                                    <p className="pt-2 pb-2">{each.comment}</p>
                                    <div className="flex gap-4 items-center"></div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex gap-3">
                                    <div className="bg-purple-600 text-white font-bold rounded-md p-1 text-sm inline-block">
                                        {each.service_name}
                                    </div>
                                    {showName ? (
                                        <div className="bg-purple-600 text-white font-bold rounded-md p-1 text-sm inline-block">
                                            {each.staff_name}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                <StarRating
                                    value={each.rating}
                                    onClick={(value) => setStarRating(value)}
                                />
                            </div>
                        </div>
                    </Border>
                );
            })}
        </Border>
    );
}
