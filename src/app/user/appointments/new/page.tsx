import Link from "next/link";

export default function Page() {
    return (
        <div className="container">
            <div className="w-1/2 mb-6">
                <div className="mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Choose Branch Name
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state">
                            <option>Siam Paragon</option>
                            <option>Mega Bangna</option>
                            <option>ABAC</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
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
                            id="grid-state">
                            <option>Hair</option>
                            <option>Nail</option>
                            <option>Spa</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
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
                            id="grid-state">
                            <option>Man Hair Cut</option>
                            <option>Hair Dye</option>
                            <option>Hair Wash</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-first-name">
                        Choose Appointment Date
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name" type="date" placeholder="Jane"/>
                    {/*<p className="text-red-500 text-xs italic">Please fill out this field.</p>*/}
                </div>

                <div className="mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-first-name">
                        Choose Appointment Time
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name" type="time" placeholder="Jane"/>
                    {/*<p className="text-red-500 text-xs italic">Please fill out this field.</p>*/}
                </div>

                <div className="mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Select Employee
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state">
                            <option>John Doe</option>
                            <option>Jane Doe</option>
                            <option>Mary Doe</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="float-end mt-3">
                    <Link
                        href={"/user/appointments"}
                        className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-4">
                        Cancel
                    </Link>
                    <button
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5">
                        Make Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}