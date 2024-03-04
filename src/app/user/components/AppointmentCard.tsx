import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "../../lib/api";

interface AppointmentCardProps {
    buttonText: string;
    data: any;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
    buttonText,
    data,
}) => {
    const pathname = usePathname();

    const cancel = async (id: number) => {
        try {
            let res = await fetch(`${api}/appointments/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-md w-full my-4">
            <div className="border border-gray-200 bg-white rounded-b p-4 flex flex-col justify-between">
                <div className="">
                    <p>
                        <span className="font-bold">Service:</span>{" "}
                        {data.service_name}
                    </p>
                    <p>
                        <span className="font-bold">Branch Name:</span>{" "}
                        {data.branch_name}
                    </p>
                    <p>
                        <span className="font-bold">Date:</span>{" "}
                        {data.appointment_date}
                    </p>
                    <p>
                        <span className="font-bold">Time:</span>{" "}
                        {data.appointment_time}
                    </p>
                    <p>
                        <span className="font-bold">Staff:</span>{" "}
                        {data.staff_name}
                    </p>
                    <div className="mt-3">
                        {buttonText === "cancel" && (
                            <button
                                className="float-end bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => cancel(data.appointment_id)}
                            >
                                Cancel Appointment
                            </button>
                        )}
                        {buttonText === "review" && (
                            <Link
                                href={{
                                    pathname: `reviews/${data.appointment_id}`,
                                }}
                            >
                                <button className="float-end bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                                    Review
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;
