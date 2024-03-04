"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { api } from "../../lib/api";

interface Props {
    isOpen: boolean;
    closeModal: Function;
    data: number;
}

export default function EditDialogBox({ isOpen, closeModal, data }: Props) {
    const [adminAvailableData, setAdminAvailableData] = useState<any>();
    const [isLoading, setLoading] = useState(true);

    const [branchName, setBranchName] = useState("");
    const [branchAddress, setBranchAddress] = useState("");
    const [adminID, setadminID] = useState("");
    const [message, setMessage] = useState("");

    // const [data, setData] = useState<any>();

    useEffect(() => {
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            let res = await fetch(`${api}/branches/${data.branch_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
                body: JSON.stringify({
                    branchName: branchName,
                    branchAddress: branchAddress,
                    adminId: adminID,
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

    const fetchEdit = async (id: number) => {};

    const handleChangeAvailableAdmin = (e: any) => {
        setadminID(e.target.value);
    };

    if (isLoading) return <p>Loading...</p>;
    if (!adminAvailableData) return <p>No profile data</p>;
    if (!data) return <p></p>;

    return (
        <Dialog
            as="div"
            className="relative z-10"
            onClose={() => closeModal()}
            open={isOpen}
        >
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  border border-gray-100">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Edit
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
                                        defaultValue={data?.branch_name}
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
                                        defaultValue={data?.branch_address}
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
                                            defaultValue={data?.admin_id}
                                        >
                                            <option>Select Admin</option>
                                            <option value={data.admin_id}>
                                                {data?.admin_name}
                                            </option>
                                            {adminAvailableData.data.map(
                                                (each: any) => {
                                                    return (
                                                        <option
                                                            value={
                                                                each.person_id
                                                            }
                                                            key={each.person_id}
                                                        >
                                                            {each.admin_name}
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
                                    onClick={() => closeModal()}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
}
