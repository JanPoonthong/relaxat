"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function Calendar() {
    let session = "{}";
    const [data, setData] = useState<any>();
    const [isLoading, setLoading] = useState(true);

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
        fetch(`${api}/appointments/?branchId=${session.branch_id}`, {
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

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;

    let formatData: any = [];
    data.map((each: any) => {
        let tmp = {
            id: each.appointment_id,
            title: each.staff_name,
            start: each.appointment_date + `T${each.appointment_time}`,
            end:
                each.appointment_date +
                `T${new Date(new Date(each.appointment_date + "T" + each.appointment_time).valueOf() + 1 * 60 * 60 * 1000).toLocaleTimeString("en-US", { hour12: false })}`,
            extendedProps: {
                description: [each.service_name],
            },
        };
        formatData.push(tmp);
    });

    function renderEventContent(eventInfo: any) {
        const formatTimeStart = eventInfo.event.start.toLocaleString("en-US", {
            timeZone: "Asia/Bangkok",
            hour: "numeric",
            hour12: true,
        });

        const formatTimeEnd = eventInfo.event.end.toLocaleString("en-US", {
            timeZone: "Asia/Bangkok",
            hour: "numeric",
            hour12: true,
        });

        return (
            <>
                <i>
                    {formatTimeStart} - {formatTimeEnd}
                </i>
                <br />
                <b>{eventInfo.event.title}</b>
                <br />
                {eventInfo.event.extendedProps.description.map(
                    (each: string, index: number) => (
                        <div key={index}>
                            <i key={index}>* {each}</i>
                        </div>
                    ),
                )}
            </>
        );
    }

    return (
        <>
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                allDaySlot={false}
                height={800}
                slotDuration={"00:15:00"}
                slotMaxTime={"17:00:00"}
                slotMinTime={"09:00:00"}
                initialEvents={formatData}
                eventContent={renderEventContent}
            />
        </>
    );
}
