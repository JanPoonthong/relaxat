"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import "react-datepicker/dist/react-datepicker.css";

export default function BasicTimePicker() {
    const [value, setValue] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const onChange = (time) => {
        setValue(time);
    };
    const onInvalidChange = () => {
        alert("Must be between 9am - 5pm");
    };

    return (
        <div className="flex gap-5">
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                        <TimePicker label="Basic time picker" />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
        </div>
    );
}
