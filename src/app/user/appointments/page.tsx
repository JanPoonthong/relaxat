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

    const [session, setSession] = useState<any>();
    if (typeof window !== "undefined") {
        setSession(JSON.parse(localStorage.getItem("session") || "{}"));
    }

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
                setAppointmentData(data);
                setLoading(false);
            });
    });

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
                    {appointmentData.data.upComingAppointments.map(
                        (each: any) => {
                            return (
                                <AppointmentCard
                                    key={each.appointment_id}
                                    buttonText="cancel"
                                />
                            );
                        },
                    )}
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-600">
                        Past Appointments
                    </p>
                    {appointmentData.data.finishedAppointments.map(
                        (each: any) => {
                            return (
                                <AppointmentCard
                                    key={each.appointment_id}
                                    buttonText="review"
                                />
                            );
                        },
                    )}
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-600">
                        Reviewed Appointments
                    </p>
                    {appointmentData.data.reviewedAppointments.map(
                        (each: any) => {
                            return (
                                <AppointmentCard
                                    key={each.appointment_id}
                                    buttonText=""
                                />
                            );
                        },
                    )}
                </div>
            </div>
        </div>
    );
}
