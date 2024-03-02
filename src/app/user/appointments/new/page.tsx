"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toTitleCase } from "../../../lib/helper";
import { api } from "../../../lib/api";

export default function Page() {
    const [session, setSession] = useState(
        JSON.parse(localStorage.getItem("session")),
    );

    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [branchList, setBranchList] = useState<any>();
    const [categoryData, setCategoryData] = useState<any>(null);
    const [selectedBranch, setSelectBranch] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedService, setSelectedService] = useState(0);

    const [serviceData, setServiceData] = useState<any>(null);
    const [selectedAppointmentTime, setSelectAppointmentTime] = useState(0);
    const [selectedAppointmentDate, setSelectAppointmentDate] = useState(null);
    const [staffAvailableTime, setStaffAvailableTime] = useState<any>(null);

    const handleChangeAppointmentDate = (e: any) => {
        setSelectAppointmentDate(e.target.value);
    };

    const handleChangeCategory = (e: any) => {
        setSelectedCategory(e.target.selectedOptions[0].value);
    };

    const handleChangeBranch = (e: any) => {
        console.log(e.target.selectedOptions[0].value);
        setSelectBranch(e.target.selectedOptions[0].value);
    };

    const handleChangeService = (e: any) => {
        setSelectedService(e.target.selectedOptions[0].value);
    };

    const handleChangeAppointmentTime = (e: any) => {
        setSelectAppointmentTime(e.target.selectedOptions[0].value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            let res = await fetch(`${api}/appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
                body: JSON.stringify({
                    serviceId: selectedService,
                    customerId: session.person_id,
                    appointmentDate: e.target.appointmentDate.value,
                    appointmentTime: e.target.appointmentTime.value,
                    staffId: 16,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setMessage("Delete service successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetch(`${api}/brancheslist`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setBranchList(data);
                setLoading(false);
            });

        fetch(`${api}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCategoryData(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch(
            `${api}/services?categoryId=${selectedCategory}&branchId=${selectedBranch}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
            },
        )
            .then((res) => res.json())
            .then((data) => {
                setServiceData(data);
                setLoading(false);
            });
        fetch(`${api}/staff/available`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify({
                staffId: 16,
                appointmentDate: selectedAppointmentDate,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setStaffAvailableTime(data);
                setLoading(false);
            });
    }, [selectedBranch, selectedCategory, selectedAppointmentDate]);

    if (isLoading) return <p>Loading...</p>;
    if (!branchList) return <p>No profile data</p>;
    if (!serviceData) return <p>No profile data</p>;
    if (!categoryData) return <p>No profile data</p>;
    if (!staffAvailableTime) return <p>No profile data</p>;

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="w-1/2 mb-6">
                    <div className="mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Choose Branch Name
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                                name="branchId"
                                onChange={handleChangeBranch}
                            >
                                <option>Select branch</option>
                                {branchList.data.map((each: any) => {
                                    return (
                                        <option
                                            value={each.branch_id}
                                            key={each.branch_id}
                                        >
                                            {toTitleCase(each.branch_name)}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Choose Service Category
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                                name="categoryId"
                                onChange={handleChangeCategory}
                            >
                                <option>Select category</option>
                                {categoryData.data.map((each: any) => {
                                    return (
                                        <option
                                            value={each.category_id}
                                            key={each.category_id}
                                        >
                                            {toTitleCase(each.category_name)}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Choose Service
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                                name="serviceId"
                                onChange={handleChangeService}
                            >
                                <option>Select service</option>
                                {serviceData.data.map((each: any) => {
                                    return (
                                        <option
                                            value={each.service_id}
                                            key={each.service_id}
                                        >
                                            {toTitleCase(each.service_name)}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Select Staff
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                            >
                                <option>John Doe</option>
                                <option>Jane Doe</option>
                                <option>Mary Doe</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            Choose Appointment Date
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            name="appointmentDate"
                            type="date"
                            placeholder="Jane"
                            onChange={handleChangeAppointmentDate}
                        />
                        {/*<p className="text-red-500 text-xs italic">Please fill out this field.</p>*/}
                    </div>

                    <div className="mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Choose Appointment Time
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                                name="appointmentTime"
                                onChange={handleChangeAppointmentTime}
                            >
                                <option>Select branch</option>
                                {staffAvailableTime.data.map((each: any) => {
                                    return (
                                        <option
                                            value={each.branch_id}
                                            key={each.branch_id}
                                        >
                                            {toTitleCase(each.branch_name)}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="float-end mt-3">
                        <Link
                            href={"/user/appointments"}
                            className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-4"
                        >
                            Cancel
                        </Link>
                        <button
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            type="submit"
                        >
                            Make Appointment
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
