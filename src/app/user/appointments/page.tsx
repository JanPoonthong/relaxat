import Link from "next/link";
import AppointmentCard from "@/app/user/components/AppointmentCard";
export default function Page() {
    return (
        <div className="container">
            <div className="flex justify-between ">
                <div className={"text-3xl font-bold"}>Appointments</div>
                <div>
                    <Link
                        type="button"
                        href={"appointments/new"}
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                    >
                        <i className="bi bi-plus me-2"></i>Make an Appointment
                    </Link>
                </div>
            </div>
            <div className="mt-4">
                <div>
                    <p className="text-xl font-bold text-gray-600">Coming Appointments</p>
                    <AppointmentCard buttonText="cancel"/>
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-600">Past Appointments</p>
                    <AppointmentCard buttonText="review"/>
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-600">Reviewed Appointments</p>
                    <AppointmentCard buttonText=""/>
                </div>

            </div>
        </div>
    );
}