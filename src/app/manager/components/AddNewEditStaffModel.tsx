"use client";
import { Dialog } from "@headlessui/react";

interface Props {
    isOpen: boolean;
    title: String;
    onConfirm: Function;
    onClose: Function;
    categoryData: any;
    branchList: any;
}

import { toTitleCase } from "../../lib/helper";

export default function AddNewEditStaffModel({
    isOpen,
    title,
    onConfirm,
    onClose,
    categoryData,
    branchList,
}: Props) {
    return (
        <Dialog
            as="div"
            className="relative z-10"
            onClose={() => onClose()}
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
                        <form onSubmit={(e) => onConfirm(e)}>
                            <div className="mt-2">
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="serviceRole"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Service Role
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="categoryId"
                                                autoComplete="branch-name"
                                                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            >
                                                {categoryData.data.map(
                                                    (each: any) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    each.category_id
                                                                }
                                                                key={
                                                                    each.category_id
                                                                }
                                                            >
                                                                {toTitleCase(
                                                                    each.category_name,
                                                                )}
                                                            </option>
                                                        );
                                                    },
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="first-name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Branch
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="branchId"
                                                autoComplete="branch-name"
                                                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            >
                                                {branchList.data.map(
                                                    (each: any) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    each.branch_id
                                                                }
                                                                key={
                                                                    each.branch_id
                                                                }
                                                            >
                                                                {toTitleCase(
                                                                    each.branch_name,
                                                                )}
                                                            </option>
                                                        );
                                                    },
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="startTime"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Start Shift Time
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="startTime"
                                                min="1"
                                                max="24"
                                                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="endTime"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            End Shift Time
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="endTime"
                                                min="1"
                                                max="24"
                                                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-3" />
                            <div className="mt-2 float-end">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-2 py-2 me-3 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                    onClick={() => onClose()}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                    // onClick={() => onConfirm()}
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
