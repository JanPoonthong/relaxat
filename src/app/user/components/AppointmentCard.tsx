import React from "react";
interface AppointmentCardProps {
    buttonText: string,
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({buttonText}) => {
    return (
        <div className="max-w-md w-full my-4">
            <div className="border border-gray-200 bg-white rounded-b p-4 flex flex-col justify-between">
                <div className="">
                    <p>
                        <span className="font-bold">Service:</span> Hair Dry & Style
                    </p>
                    <p>
                        <span className="font-bold">Branch Name:</span> Siam Paragon
                    </p>
                    <p>
                        <span className="font-bold">Date:</span> 8th February, 2024
                    </p>
                    <p>
                        <span className="font-bold">Time:</span> 16.00
                    </p>
                    <p>
                        <span className="font-bold">Staff:</span> Mr. John Doe
                    </p>
                    <div className="mt-3">
                        {buttonText === "cancel" &&
                            <button
                                className="float-end bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Cancel Appointment
                            </button>
                        }
                        {
                            buttonText === "review" &&
                            <button
                                className="float-end bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                                Review
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentCard;