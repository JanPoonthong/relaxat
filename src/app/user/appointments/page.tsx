"use client";
import Link from "next/link";
import AppointmentCard from "@/app/user/components/AppointmentCard";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { redirect } from "next/navigation";

export default function Page() {
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [appointmentData, setAppointmentData] = useState<any>(null);

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
        fetch(`${api}/appointments?customerId=${session?.person_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAppointmentData(data.data);
                setLoading(false);
            });
    }, [session.person_id]);

    if (isLoading) return <p>Loading...</p>;
    if (!appointmentData) return <p>No profile data</p>;

    return (
        <div className="container">
            <div className="flex justify-between ">
                <div className={"text-3xl font-bold"}>Appointments</div>
                <div>
                    <Link
                        type="button"
                        href={"appointments/new"}
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                    >
                        <i className="bi bi-plus me-2"></i>Make an Appointment
                    </Link>
                </div>
            </div>
            <div className="mt-4">
                <div>
                    <p className="text-xl font-bold text-gray-600">
                        Coming Appointments
                    </p>
                    {appointmentData.upComingAppointments.map((each: any) => {
                        return (
                            <AppointmentCard
                                key={each.appointment_id}
                                data={each}
                                buttonText="cancel"
                            />
                        );
                    })}
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-600">
                        Past Appointments
                    </p>
                    {appointmentData.finishedAppointments.map((each: any) => {
                        return (
                            <AppointmentCard
                                key={each.appointment_id}
                                data={each}
                                buttonText="review"
                            />
                        );
                    })}
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-600">
                        Reviewed Appointments
                    </p>
                    {appointmentData.reviewedAppointments.map((each: any) => {
                        return (
                            <AppointmentCard
                                key={each.appointment_id}
                                data={each}
                                buttonText=""
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
