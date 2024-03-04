import Calendar from "../../ui/schedule/calendar";

export default function Page() {
    return (
        <div>
            <p>Schedule page</p>
            <div className="w-full pt-12 mr-5">
                <Calendar staff={false} user={true} admin={false} />
            </div>
        </div>
    );
}
