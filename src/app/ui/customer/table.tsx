"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { toTitleCase } from "../../lib/helper";

// const data = [
//     { id: 1, first: "Mark", last: "Otto", service: "Haircut" },
//     { id: 2, first: "Jacob", last: "Thornton", service: "Message" },
//     { id: 3, first: "Lilyana", last: "Manning", service: "Haircut" },
//     { id: 4, first: "Kaydence", last: "Bird", service: "Haircut" },
//     { id: 5, first: "Lacey", last: "Roach", service: "Haircut" },
//     { id: 6, first: "Malik", last: "Mohammed", service: "Haircut" },
//     { id: 7, first: "Marcel", last: "Schimitt", service: "Haircut" },
//     { id: 8, first: "Wise", last: "Hartmen", service: "Haircut" },
//     { id: 9, first: "Burgess", last: "Watts", service: "Haircut" },
//     { id: 10, first: "Lee", last: "McDaniel", service: "Haircut" },
// ];

export default function Table() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${api}/customers?branchId=${1}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            First
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Most used service
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Info
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Banned
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((each: any, index: number) => {
                        return (
                            <tr className="bg-white border-b" key={each.id}>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {toTitleCase(each.first_name)}
                                </td>
                                <td className="px-6 py-4">
                                    {toTitleCase(each.last_name)}
                                </td>
                                <td className="px-6 py-4">
                                    {each.service_name}
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={{
                                            pathname: `/customer/${each.person_id}`,
                                        }}
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"
                                    >
                                        More Info
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    {each.is_banned === true ? (
                                        <p className="text-red-700 font-bold">
                                            Banned
                                        </p>
                                    ) : null}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
