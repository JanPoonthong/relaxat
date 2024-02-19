"use client";

import Link from "next/link";

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
    const [reviewText, setReviewText] = useState("");

    const onChange = (time: string) => {
        setValue(time);
    };
    const onInvalidChange = () => {
        alert("Must be between 9am - 5pm");
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-5 align-center">
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
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
            <div className="flex flex-col">
                <textarea
                    rows={10}
                    cols={50}
                    placeholder="Type your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="border border-gray-300 rounded p-4 mb-4"
                />
                <div className="flex justify-end">
                    <Link
                        // href={{
                        //     pathname: `/customer/${each.first.toLowerCase()}${each.last.toLowerCase()}`,
                        // }}
                        href="#"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"
                    >
                        Send request
                    </Link>
                </div>
            </div>
        </div>
    );
}
