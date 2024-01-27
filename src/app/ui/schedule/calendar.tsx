"use client";
import React from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

export default function Calendar() {
    const handleEventClick = (clickInfo: any) => {
        if (
            confirm(
                `Are you sure you want to delete the event '${clickInfo.event.title}'`,
            )
        ) {
            clickInfo.event.remove();
        }
    };

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={
                    {
                        // left: 'prev,next today',
                        // center: 'title',
                        // right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }
                }
                initialView="timeGridDay"
                allDaySlot={false}
                // ... other options
                // editable={true}
                // selectable={true}
                // selectMirror={true}
                // dayMaxEvents={true}
                // weekends={this.state.weekendsVisible}
                initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                // select={this.handleDateSelect}
                // eventContent={renderEventContent} // custom render function
                eventClick={(clickInfo) => handleEventClick(clickInfo)}
                // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
        </>
    );
}
