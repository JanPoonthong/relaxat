"use client";
import { Dialog } from "@headlessui/react";

interface Props {
    isOpen: boolean;
    title: String;
    message: String;
    onConfirm: Function;
    onClose: Function;
}

export default function ConfirmAdminModal({
    isOpen,
    title,
    message,
    onConfirm,
    onClose,
}: Props) {
    return (
        <Dialog
            open={isOpen}
            onClose={() => onClose}
            as="div"
            className="relative z-50"
        >
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  border border-gray-100">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-bold leading-6 text-gray-900"
                        >
                            {title}
                        </Dialog.Title>

                        <hr className="my-2" />

                        <p className="text-gray-600">{message}</p>
                        <div className="mt-8 float-end">
                            <button
                                onClick={() => onClose()}
                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-2 py-2 me-3 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => onConfirm()}
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            >
                                Confirm
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
}
