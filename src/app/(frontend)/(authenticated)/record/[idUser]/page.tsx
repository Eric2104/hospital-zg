import CancelButton from "../components/cancelButton";
import { getUserAppoinment } from "../actions/getUserAppoinment";

interface Appointment {
    id: string;
    idCustomer: any | {
        id: string;
    }
    idDoctor: any | {
        id: string;
        name: string;
        specialty: {
            name: string;
        }
    };
    schedule: string;
    time: string;
    status: string;
}

interface AppointmentsProps {
    docs: Appointment[];
}

const Record = async ({ params }: { params: { idUser: string } }) => {
    const { idUser } = await params;

    const appointments: AppointmentsProps = await getUserAppoinment({ idUser });

    const completedAppointments = appointments.docs.filter(cita => cita.status === "completed" || cita.status === "canceled") || null;
    const pendingAppointments = appointments.docs.filter(cita => cita.status === "pending");



    return (
        <div className="w-[96vw] mx-auto px-2 my-2">
            <h2 className="text-2xl text-stone-700 font-semibold py-2">Historial de <span className="text-[#89ccc5]">Citas</span></h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
                <div className=" text-center">
                    <p className="text-2xl text-stone-700 py-2">Próximas</p>
                    <div className="space-y-3">
                        {pendingAppointments.length > 0 ? (
                            pendingAppointments.map((appointment: Appointment, index: number) => {
                                return (
                                    <div key={`appoinment-pending-${index}`} className="text-start px-2 py-2 space-y-4 border rounded-lg border-stone-200 bg-stone-100 h-32">
                                        <h3 className="text-lg font-bold text-[#4a90e2]">{appointment.idDoctor.specialty.name} - Dr. {appointment.idDoctor.name}</h3>
                                        <p className="text-sm text-stone-600">Fecha: {appointment.schedule} - {appointment.time}</p>
                                        <div className="w-full flex items-center">
                                            <CancelButton idAppoinment={appointment.id} />
                                        </div>
                                    </div>
                                );
                            })
                        )
                            :
                            <p>No hay citas</p>
                        }
                    </div>
                </div>
                <div className=" text-center">
                    <p className="text-2xl text-stone-700 py-2">Anteriores</p>
                    <div className="space-y-3">
                        {completedAppointments.length > 0 ? (
                            completedAppointments.map((appointment: Appointment, index: number) => {
                                return (
                                    <div key={`appoinment-complete-${index}`} className={`text-start px-2 py-2 space-y-4 border rounded-lg border-stone-200 h-32 ${(appointment.status === "completed") ? "bg-emerald-100" : "bg-red-100"}`}>
                                        <div className="flex flex-col justify-center h-full">
                                            <h3 className="text-lg font-bold text-[#4a90e2] ">{appointment.idDoctor.specialty.name} - Dr. {appointment.idDoctor.name}</h3>
                                            <p className="text-sm text-stone-600 ">Fecha {appointment.schedule} - {appointment.time}</p>
                                            <p
                                                className={`text-sm font-semibold px-2 py-1 rounded-lg text-slate-700 text-center`}
                                            >
                                                {appointment.status === "completed" ? "Completado" : "Cancelado"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        )
                            :
                            <p>No hay citas registrada</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Record;