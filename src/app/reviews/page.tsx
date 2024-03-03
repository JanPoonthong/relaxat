import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";

import Review from "../ui/review/review";

export default function Page() {
    const commentDate: number =
        new Date().valueOf() - new Date("2024-02-06").valueOf();

    return (
        <>
            <NavBar />
            <div className="flex gap-[6rem]">
                <SideBar />
                <div className="flex justify-between w-full pt-12 flex-wrap mr-5">
                    <Review
                        staff={false}
                        commentDate={commentDate}
                        showName={true}
                    />
                </div>
            </div>
        </>
    );
}
