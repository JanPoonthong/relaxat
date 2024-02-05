"use client";
import React from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

export default function Calendar() {
    function renderEventContent(eventInfo: any) {
        console.log(eventInfo);
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
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                allDaySlot={false}
                height={800}
                slotDuration={"00:15:00"}
                slotMaxTime={"17:00:00"}
                slotMinTime={"09:00:00"}
                initialEvents={INITIAL_EVENTS}
                eventContent={renderEventContent}
            />
        </>
    );
}
