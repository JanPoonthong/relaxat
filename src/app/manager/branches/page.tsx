"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { api } from "../../lib/api";

export default function Page() {
    let [isOpen, setIsOpen] = useState(false);
    const [branchesData, setBranchesData] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    const [branchName, setBranchName] = useState("");
    const [branchAddress, setBranchAddress] = useState("");
    const [adminID, setadminID] = useState("");

    const [adminAvailableData, setAdminAvailableData] = useState("");
    const [message, setMessage] = useState("");

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const handleChangeAvailableAdmin = (e: any) => {
        setadminID(e.target.value);
    };

    const deleteOnClick = async (deleteID: number) => {
        try {
            let res = await fetch(`${api}/branches/${deleteID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            let res = await fetch(`${api}/branches`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
                body: JSON.stringify({
                    branch_name: branchName,
                    branch_address: branchAddress,
                    admin_id: adminID,
                }),
            });
            console.log(res);
            let resJson = await res.json();
            if (res.status === 200) {
                setBranchName("");
                setBranchAddress("");
                setadminID("");
                setMessage("Created branch successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetch(`${api}/branches`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setBranchesData(data);
                setLoading(false);
            });

        fetch(`${api}/admins/available`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAdminAvailableData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!branchesData) return <p>No profile data</p>;
    if (!adminAvailableData) return <p>No profile data</p>;

    return (
        <div className={""}>
            <div className={"flex justify-between "}>
                <div className={"text-3xl font-bold"}>Branches</div>
                <div>
                    <button
                        type="button"
                        onClick={openModal}
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                    >
                        <i className="bi bi-plus me-2"></i>Add New Branch
                    </button>
                </div>
            </div>
            <div className="my-4 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Branch Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Branch Admin
                                        <a href="#">
                                            <svg
                                                className="w-3 h-3 ms-1.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                            </svg>
                                        </a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Address
                                        <a href="#">
                                            <svg
                                                className="w-3 h-3 ms-1.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                            </svg>
                                        </a>
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
                            {branchesData.data.map((each: any) => {
                                return (
                                    <tr
                                        key={each.branch_id}
                                        className="bg-white border-b"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {each.branch_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {each.admin_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {each.branch_address}
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
                                            <a
                                                onClick={() =>
                                                    deleteOnClick(
                                                        each.branch_id,
                                                    )
                                                }
                                                href="#"
                                                className="font-medium text-red-600 hover:underline"
                                            >
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog
                as="div"
                className="relative z-10"
                onClose={closeModal}
                open={isOpen}
            >
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  border border-gray-100">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Add New Branch
                            </Dialog.Title>
                            <form onSubmit={handleSubmit}>
                                <div className="mt-2">
                                    <div className="mt-2">
                                        <label
                                            htmlFor="service"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Branch Name
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setBranchName(e.target.value)
                                            }
                                            type="text"
                                            name="service"
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <label
                                            htmlFor="service"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Branch Address
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setBranchAddress(e.target.value)
                                            }
                                            type="text"
                                            name="service"
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <label
                                            htmlFor="service"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Branch Admin
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="branch"
                                                name="branch"
                                                autoComplete="branch-name"
                                                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                                onChange={
                                                    handleChangeAvailableAdmin
                                                }
                                            >
                                                <option>Select Admin</option>
                                                {adminAvailableData.data.map(
                                                    (each) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    each.person_id
                                                                }
                                                                key={
                                                                    each.person_id
                                                                }
                                                            >
                                                                {
                                                                    each.admin_name
                                                                }
                                                            </option>
                                                        );
                                                    },
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-3" />
                                <div className="mt-2 float-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-2 py-2 me-3 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                    >
                                        Add New Branch
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
