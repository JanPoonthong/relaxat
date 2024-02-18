import React from "react";
import UserSideBar from "@/app/user/components/UserSideBar";

export default function UserPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex">
            <UserSideBar />
            <main className="container px-5 pt-5">{children}</main>
        </section>
    );
}
