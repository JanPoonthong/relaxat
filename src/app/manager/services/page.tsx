"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt: string) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export default function Page() {
    let [isOpen, setIsOpen] = useState(false);

    const [serviceData, setServiceData] = useState(null);
    const [categoryData, setCategoryData] = useState(null);

    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [price, setPrice] = useState(0);
    const [serviceName, setServiceName] = useState("");
    const [checkedService, setCheckedService] = useState<string[]>([]);

    const [pickedCategory, setPickedCategory] = useState(0);
    // const [deleteID, setDeleteID] = useState(0);

    const deleteOnClick = async (deleteID: number) => {
        try {
            let res = await fetch(
                `http://52.139.170.14:3000/api/v1/services/${deleteID}`,
                {
                    method: "DELETE",
                },
            );
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
        fetch("http://52.139.170.14:3000/api/v1/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategoryData(data);
                setLoading(false);
            });
    }, []);

    const handleChangeCategory = (e: any) => {
        setPickedCategory(e.target.selectedIndex + 1);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            let res = await fetch(
                "http://52.139.170.14:3000/api/v1/services/",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        service_name: serviceName,
                        category_id: pickedCategory,
                        price: price,
                        branches: [1, 2], //TODO(jan)
                    }),
                },
            );
            let resJson = await res.json();
            if (res.status === 200) {
                setServiceName("");
                setPickedCategory(0);
                setMessage("create service successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChangeService = (e: any, name: string) => {
        if (e.target.checked) {
            setCheckedService((checkedService) => [...checkedService, name]);
        } else {
            setCheckedService((checkedService) =>
                checkedService.filter((each) => each !== name),
            );
        }
    };

    useEffect(() => {
        fetch("http://52.139.170.14:3000/api/v1/services")
            .then((res) => res.json())
            .then((data) => {
                setServiceData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!serviceData) return <p>No profile data</p>;
    if (!categoryData) return <p>No profile data</p>;

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div className={""}>
            <div className={"flex justify-between "}>
                <div className={"text-3xl font-bold"}>Services</div>
                <div>
                    <button
                        type="button"
                        onClick={openModal}
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                    >
                        <i className="bi bi-plus me-2"></i>Add New Service
                    </button>
                </div>
            </div>
            <div className="my-4 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Service Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Category
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Price
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Available Branches
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
                            {serviceData.data.map((each: any) => {
                                return (
                                    <tr
                                        key={each.id}
                                        className="bg-white border-b"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {each.service_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {each.category_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {each.price} Baht
                                        </td>
                                        <td className="px-6 py-4">
                                            {each.branches.join(", ")}
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
                                                    deleteOnClick(each.id)
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
                                                    onChange={
                                                        handleChangeCategory
                                                    }
                                                >
                                                    {categoryData.data.map(
                                                        (each: any) => {
                                                            return (
                                                                <option
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
                                                htmlFor="price"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Price
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    onChange={(e) =>
                                                        setPrice(
                                                            Number(
                                                                e.target.value,
                                                            ),
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
                                                        key={each}
                                                        className="relative grid select-none items-center whitespace-nowrap rounded-full bg-indigo-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                                                    >
                                                        <span className="">
                                                            {each}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex gap-1">
                                                <input
                                                    type="checkbox"
                                                    id="1"
                                                    name="Mega Bangna"
                                                    onChange={(e) =>
                                                        handleChangeService(
                                                            e,
                                                            "Mega Bangna",
                                                        )
                                                    }
                                                />
                                                <label htmlFor="Mega Bangna">
                                                    Mega Bangna
                                                </label>
                                            </div>
                                            <div className="flex gap-1">
                                                <input
                                                    type="checkbox"
                                                    id="2"
                                                    name="Chit Lom"
                                                    onChange={(e) =>
                                                        handleChangeService(
                                                            e,
                                                            "Chit Lom",
                                                        )
                                                    }
                                                />
                                                <label htmlFor="Chit Lom">
                                                    Chit Lom
                                                </label>
                                            </div>
                                            <div className="flex gap-1">
                                                <input
                                                    type="checkbox"
                                                    id="3"
                                                    name="Udom Suk"
                                                    onChange={(e) =>
                                                        handleChangeService(
                                                            e,
                                                            "Udom Suk",
                                                        )
                                                    }
                                                />
                                                <label htmlFor="Udom Suk">
                                                    Udom Suk
                                                </label>
                                            </div>
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
                                        Add New Service
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
