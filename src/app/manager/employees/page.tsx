"use client";
import ConfirmModal from "@/app/modals/ConfirmModal";
import { useState, useEffect } from "react";
import AddNewAdminModal from "@/app/manager/components/AddNewAdminModal";
import AddNewStaffModal from "@/app/manager/components/AddNewStaffModal";

import { api } from "../../lib/api";

export default function Page() {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isAddNewAdminModalOpen, setIsNewAdminModalOpen] = useState(false);
    const [isAddNewStaffModalOpen, setIsNewStaffModalOpen] = useState(false);

    const [staffData, setStaffData] = useState<any>();
    const [adminData, setAdminData] = useState<any>();
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [categoryData, setCategoryData] = useState<any>(null);
    const [branchList, setBranchList] = useState<any>();

    useEffect(() => {
        fetch(`${api}/staff`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setStaffData(data);
                setLoading(false);
            });

        fetch(`${api}/admins`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAdminData(data);
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
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!adminData) return <p>No profile data</p>;
    if (!staffData) return <p>No profile data</p>;
    if (!branchList) return <p>No profile data</p>;
    if (!categoryData) return <p>No profile data</p>;

    function handleConfirm() {
        setIsConfirmModalOpen(false);
    }

    function handleCloseConfirmModal() {
        setIsConfirmModalOpen(false);
    }

    async function handleConfirmAddNewAdmin(e: any) {
        e.preventDefault();
        try {
            let res = await fetch(`${api}/admins`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
                body: JSON.stringify({
                    firstName: e.target.firstname.value,
                    lastName: e.target.lastname.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setMessage("create service successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
        setIsNewAdminModalOpen(false);
    }

    function handleCloseAddNewAdminModal() {
        setIsNewAdminModalOpen(false);
    }

    function closeAddNewAdminModal() {
        setIsNewAdminModalOpen(false);
    }

    function openAddNewAdminModal() {
        setIsNewAdminModalOpen(true);
    }

    async function handleConfirmAddNewStaff(e: any) {
        e.preventDefault();

        try {
            let res = await fetch(`${api}/staff`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
                body: JSON.stringify({
                    firstName: e.target.firstName.value,
                    lastName: e.target.lastName.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                    startTime: e.target.startTime.value,
                    endTime: e.target.endTime.value,
                    categoryId: e.target.categoryId.selectedOptions[0].value,
                    branchId: e.target.branchId.selectedOptions[0].value,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setMessage("create service successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
        setIsNewStaffModalOpen(false);
    }

    function handleCloseAddNewStaffModal() {
        setIsNewStaffModalOpen(false);
    }

    function closeAddNewStaffModal() {
        setIsNewStaffModalOpen(false);
    }

    function openAddNewStaffModal() {
        setIsNewStaffModalOpen(true);
    }

    return (
        <div className="">
            <div className={"flex justify-between "}>
                <div className={"text-3xl font-bold"}>Staff</div>
                <div>
                    <button
                        type="button"
                        onClick={openAddNewStaffModal}
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                    >
                        <i className="bi bi-plus me-2"></i>Add New Staff
                    </button>
                </div>
            </div>
            <div className="my-4 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Last Name
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Role
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Branch
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Email Address
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffData.data.map((each: any) => {
                                return (
                                    <tr
                                        key={each.person_id}
                                        className="bg-white border-b"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            {each.first_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {each.last_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {each.category_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {each.branch_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {each.email}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    setIsConfirmModalOpen(true)
                                                }
                                                className="font-medium text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={"flex justify-between "}>
                <div className={"text-3xl font-bold"}>Admins</div>
                <div>
                    <button
                        type="button"
                        onClick={openAddNewAdminModal}
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                    >
                        <i className="bi bi-plus me-2"></i>Add New Admin
                    </button>
                </div>
            </div>
            <div className="my-4 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Last Name
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Branch
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Email Address
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminData.data.map((each: any) => {
                                return (
                                    <tr
                                        key={each.person_id}
                                        className="bg-white border-b"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            {each.first_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {each.last_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {each.branch_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {each.email}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    setIsConfirmModalOpen(true)
                                                }
                                                className="font-medium text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                title={"Delete Confirmation"}
                message={"Are you sure you want to delete this employee?"}
                onConfirm={handleConfirm}
                onClose={handleCloseConfirmModal}
            />

            <AddNewAdminModal
                isOpen={isAddNewAdminModalOpen}
                title={"Add New Admin"}
                onConfirm={handleConfirmAddNewAdmin}
                onClose={handleCloseAddNewAdminModal}
            />

            <AddNewStaffModal
                isOpen={isAddNewStaffModalOpen}
                title={"Add New Staff"}
                onConfirm={handleConfirmAddNewStaff}
                onClose={handleCloseAddNewStaffModal}
                categoryData={categoryData}
                branchList={branchList}
            />
        </div>
    );
}
