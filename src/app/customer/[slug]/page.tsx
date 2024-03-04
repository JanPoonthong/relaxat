"use client";

import Border from "@/app/ui/border/border";
import NavBar from "../../ui/home/nav-bar";
import SideBar from "../../ui/home/side-bar";
import DropDownButton from "@/app/ui/dropdownbutton/drop-down-button";
import Footer from "@/app/ui/customer/footer";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const emptyData = [
    {
        label: "left_side_part",
    },
    {
        label: "right_side_part",
    },
    {
        label: "hairline",
    },
    {
        label: "nape",
    },
    {
        label: "center_back",
    },
    {
        label: "lower_half",
    },
    {
        label: "crown",
    },
    {
        label: "upper_half",
    },
];

export default function Page({ params }: { params: { slug: string } }) {
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    let session = "{}";

    if (typeof localStorage !== "undefined") {
        session = JSON.parse(localStorage.getItem("session") || "{}");
    }

    if (JSON.stringify(session) === "{}")
        return (
            <div>
                <p>Go /signin</p>
            </div>
        );

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let tmp = {
            customerId: parseInt(params.slug),
            leftSide: parseInt(e.target.left_side_part.value),
            rightSide: parseInt(e.target.right_side_part.value),
            hairline: parseInt(e.target.hairline.value),
            nape: parseInt(e.target.nape.value),
            upperHalf: parseInt(e.target.upper_half.value),
            centerBack: parseInt(e.target.center_back.value),
            lowerHalf: parseInt(e.target.lower_half.value),
            crown: parseInt(e.target.crown.value),
        };
        try {
            let res = await fetch(`${api}/haircutpreference`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
                body: JSON.stringify(tmp),
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

    useEffect(() => {
        fetch(`${api}/haircutpreference?customerId=${params.slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
            });
    }, [session.person_id]);

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <NavBar />
            <div className="flex gap-[6rem]">
                <SideBar />
                <div className="w-full pt-12 mr-5">
                    <Border style="h-full p-2 relative">
                        <div className="flex justify-between">
                            <h1 className="text-2xl">{params.slug} </h1>
                            <DropDownButton />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="pt-5 pb-12">
                                <Border style="h-full p-4">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Haircut
                                    </h3>
                                    <div className="mt-2 grid grid-rows-4 grid-flow-col gap-4 w-[80%]">
                                        {!data
                                            ? emptyData.map((each) => {
                                                  return (
                                                      <div key={each.label}>
                                                          <label
                                                              key={each.label}
                                                              htmlFor={
                                                                  each.label
                                                              }
                                                              className="block text-sm font-medium leading-6 text-gray-900"
                                                          >
                                                              {each.label}
                                                          </label>
                                                          <input
                                                              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                              type="text"
                                                              name={each.label}
                                                          ></input>
                                                      </div>
                                                  );
                                              })
                                            : Object.keys(data).map(
                                                  (key: any) => {
                                                      return (
                                                          <div key={key}>
                                                              <label
                                                                  key={key}
                                                                  htmlFor={key}
                                                                  className="block text-sm font-medium leading-6 text-gray-900"
                                                              >
                                                                  {key}
                                                              </label>
                                                              <input
                                                                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                  type="text"
                                                                  name={key}
                                                                  value={
                                                                      data[key]
                                                                  }
                                                                  onChange={(
                                                                      e,
                                                                  ) =>
                                                                      setEmail(
                                                                          e
                                                                              .target
                                                                              .value,
                                                                      )
                                                                  }
                                                                  disabled={
                                                                      key ===
                                                                      "person_id"
                                                                          ? "true"
                                                                          : null
                                                                  }
                                                              ></input>
                                                          </div>
                                                      );
                                                  },
                                              )}
                                    </div>
                                </Border>
                            </div>
                            <button
                                className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-1 px-2 rounded"
                                type="submit"
                            >
                                {" "}
                                Save Changes
                            </button>
                        </form>
                        <div className="flex justify-end w-[99%]">
                            <Footer id={params.slug} />
                        </div>
                    </Border>
                </div>
            </div>
        </>
    );
}
