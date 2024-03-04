import React from "react";
interface AppointmentCardProps {
    buttonText: string;
    data: any;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
    buttonText,
    data,
}) => {
    return (
        <div className="max-w-md w-full my-4">
            <div className="border border-gray-200 bg-white rounded-b p-4 flex flex-col justify-between">
                <div className="">
                    {data.map((each: any) => {
                        return (
                            <>
                                <p>
                                    <span className="font-bold">Service:</span>{" "}
                                    {each.service_name}
                                </p>
                                <p>
                                    <span className="font-bold">
                                        Branch Name:
                                    </span>{" "}
                                    {each.branch_name}
                                </p>
                                <p>
                                    <span className="font-bold">Date:</span>{" "}
                                    {each.appointment_date}
                                </p>
                                <p>
                                    <span className="font-bold">Time:</span>{" "}
                                    {each.appointment_time}
                                </p>
                                <p>
                                    <span className="font-bold">Staff:</span>{" "}
                                    {each.staff_name}
                                </p>
                                <div className="mt-3">
                                    {buttonText === "cancel" && (
                                        <button className="float-end bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Cancel Appointment
                                        </button>
                                    )}
                                    {buttonText === "review" && (
                                        <button className="float-end bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                                            Review
                                        </button>
                                    )}
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;
