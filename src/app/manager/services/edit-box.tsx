import { Dialog, Transition } from "@headlessui/react";
import { api } from "../../lib/api";
import { useState, useEffect } from "react";
import { toTitleCase } from "../../lib/helper";

interface Props {
    isOpen: boolean;
    closeModal: Function;
    categoryData: any;
    branchList: any;
    serviceId: number;
}

export default function EditBox({
    isOpen,
    closeModal,
    categoryData,
    branchList,
    serviceId,
}: Props) {
    const [serviceData, setServiceData] = useState<any>(null);
    const [price, setPrice] = useState(0);

    const [isLoading, setLoading] = useState(true);
    const [pickedCategory, setPickedCategory] = useState(0);
    const [message, setMessage] = useState("");

    const [serviceName, setServiceName] = useState("");
    const [checkedService, setCheckedService] = useState<any[]>([]);

    const handleChangeService = (e: any, name: string, id: number) => {
        if (e.target.checked) {
            setCheckedService((checkedService) => [
                ...checkedService,
                { name, id },
            ]);
        } else {
            setCheckedService((checkedService) =>
                checkedService.filter((each) => each.name !== name),
            );
        }
    };

    const handleChangeCategory = (e: any) => {
        setPickedCategory(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const listOfBranchId = checkedService.map((each) => each.id);

        try {
            let res = await fetch(`${api}/services/${serviceId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
                body: JSON.stringify({
                    serviceName: serviceName,
                    categoryId: pickedCategory,
                    price: price,
                    branches: listOfBranchId,
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
    };

    // if (isLoading) return <p>Loading...</p>;
    // if (!serviceData) return <p>No profile data</p>;
    // if (!categoryData) return <p>No profile data</p>;
    // if (!branchList) return <p>No profile data</p>;

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
                            Add New Service
                        </Dialog.Title>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-2">
                                <div>
                                    <label
                                        htmlFor="service"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Service Name
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setServiceName(e.target.value)
                                        }
                                        type="text"
                                        required
                                        name="service"
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="first-name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Category
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                onChange={handleChangeCategory}
                                            >
                                                <option>
                                                    Selection category
                                                </option>
                                                {categoryData.data.map(
                                                    (each: any) => {
                                                        return (
                                                            <option
                                                                key={
                                                                    each.category_id
                                                                }
                                                                value={
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
                                            htmlFor="price"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={(e) =>
                                                    setPrice(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                type="text"
                                                name="price"
                                                required
                                                id="price"
                                                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="500"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="branches"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Available Branches
                                    </label>
                                    <div className="mt-1 flex gap-2">
                                        {checkedService.map((each) => {
                                            return (
                                                <div
                                                    key={each.name}
                                                    className="relative grid select-none items-center whitespace-nowrap rounded-full bg-indigo-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                                                >
                                                    <span className="">
                                                        {each.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-2">
                                        {branchList.data.map((each: any) => {
                                            return (
                                                <div
                                                    key={each.branch_id}
                                                    className="flex gap-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={each.branch_id}
                                                        name={each.branch_name}
                                                        onChange={(e) =>
                                                            handleChangeService(
                                                                e,
                                                                each.branch_name,
                                                                each.branch_id,
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={
                                                            each.branch_name
                                                        }
                                                    >
                                                        {each.branch_name}
                                                    </label>
                                                </div>
                                            );
                                        })}
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
