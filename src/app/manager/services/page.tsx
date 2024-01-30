
export default function Page() {
    return (
        <div className={''}>
            <div className={'flex justify-between '}>
                <div className={'text-3xl font-bold'}>Services</div>
                <div>
                    <button type="button" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"><i className="bi bi-plus me-2"></i>Add New Service</button>
                </div>
            </div>
            <div className="my-4 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50">
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
                        <tr className="bg-white border-b">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Haircut
                            </th>
                            <td className="px-6 py-4">
                                Hair
                            </td>
                            <td className="px-6 py-4">
                                400 Baht
                            </td>
                            <td className="px-6 py-4">
                                Siam Square One, Sukhumvit
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#"
                                   className="font-medium text-blue-600 hover:underline">Edit</a>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#"
                                   className="font-medium text-red-600 hover:underline">Delete</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}