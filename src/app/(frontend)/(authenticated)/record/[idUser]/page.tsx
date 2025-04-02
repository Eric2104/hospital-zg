import { getUserAppoinment } from "./actions/getUserAppoinment";

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
    console.log(appointments);

    return (
        <div className="w-[96vw] mx-auto px-2 my-2">
            <h2 className="text-2xl text-stone-700 font-semibold py-2">Historial de <span className="text-[#89ccc5]">Citas</span></h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 ">
                <div className=" text-center">
                    <p className="text-2xl text-stone-700 py-2">Próximas</p>
                    <div className="space-y-3">
                        {(appointments.docs.length > 0 && appointments.docs[0].status === "pending") ? (
                            appointments.docs.map((appointment: Appointment, index: number) => {
                                return (
                                    <div key={`appoinment-pending-${index}`} className="text-start px-2 py-2 space-y-4 border rounded-lg border-stone-200">
                                        <h3 className="text-lg font-bold text-[#4a90e2]">{appointment.idDoctor.specialty.name} - Dr. {appointment.idDoctor.name}</h3>
                                        <p className="text-sm text-stone-600">Fecha: {appointment.schedule} - {appointment.time}</p>
                                        <div className="w-full flex items-center">
                                            <button className="text-sm text-white bg-[#e77d75] hover:bg-[#f08780] px-3 py-1 rounded-xl w-4/5 lg:w-2/3 mx-auto">Cancelar</button>
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
                    {(appointments.docs.length > 0 && appointments.docs[0].status === "completed") ? (
                        appointments.docs.map((appointment: Appointment, index: number) => {
                            return (
                                <div key={`appoinment-complete-${index}`} className="text-start px-2 py-2 space-y-4 border rounded-lg border-stone-200">
                                    <h3 className="text-lg font-bold text-[#4a90e2]">{appointment.idDoctor.specialty.name} - Dr. {appointment.idDoctor.name}</h3>
                                    <p className="text-sm text-stone-600">Fecha {appointment.schedule} - {appointment.time}</p>
                                    <div className="w-full flex items-center">
                                        <button type="button" disabled className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-xl w-4/5 lg:w-2/3 mx-auto">Cancelar</button>
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
    );
}

export default Record;