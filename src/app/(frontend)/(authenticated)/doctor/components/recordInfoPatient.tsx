'use client'
import { useState } from "react";
import RecordPatient from "./recordPatient";

interface PatientsInfo {
    id: string;
    idCustomer: {
        id: string;
        firstName: string;
        lastName: string;
        bloodType: string;
        allergies: string;
        cronicDiseases: string;
        medications: string;
    };
    idDoctor: any;
    reason: string;
    time: string;
}

interface PatientInfoProps {
    docs: PatientsInfo[];
}

const RecordInfoPatient = ({ patients }: { patients: PatientInfoProps }) => {
    const [selectedPatient, setSelectedPatient] = useState<PatientsInfo | null>(null);
    const [mobilePatientId, setMobilePatientId] = useState<string | null>(null);

    const handleSelectPatient = (patient: PatientsInfo) => {
        setSelectedPatient(patient);
    };

    const handleMobileToggle = (id: string) => {
        setMobilePatientId((prevId) => (prevId === id ? null : id));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 py-4 gap-x-4">
            <div className="w-full space-y-4">
                {patients.docs.length > 0 ? (
                    patients.docs.map((patientInfo: PatientsInfo) => (
                        <div key={`patient-${patientInfo.id}`}>
                            <div className="w-full mx-auto py-4 px-2 lg:px-4 rounded-lg shadow-md flex">
                                <div className="w-4/6">
                                    <p>Nombre: {patientInfo.idCustomer.firstName} {patientInfo.idCustomer.lastName}</p>
                                    <p>Hora: {patientInfo.time}</p>
                                    <p>Motivo: {patientInfo.reason}</p>
                                </div>
                                <div className="relative flex justify-center items-center w-2/6">
                                    {/* Escritorio */}
                                    <button
                                        onClick={() => handleSelectPatient(patientInfo)}
                                        className="hidden lg:block bg-[#89ccc5] py-2 px-2 lg:px-4 rounded-md text-stone-100 text-base lg:text-lg"
                                    >
                                        Expediente
                                    </button>
                                    {/* Mobile */}
                                    <button
                                        onClick={() => handleMobileToggle(patientInfo.id)}
                                        className="lg:hidden bg-[#89ccc5] py-2 px-2 rounded-md text-stone-100 text-sm lg:text-base"
                                    >
                                        Ver expediente
                                    </button>
                                </div>
                            </div>

                            {/* Mostrar expediente debajo solo si es el seleccionado en mobile */}
                            {mobilePatientId === patientInfo.id && (
                                <div className="bg-stone-100 lg:hidden p-2 rounded-md shadow-inner">
                                    <RecordPatient patientInfo={patientInfo} setSelectedPatient={setSelectedPatient} />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-2xl">No hay citas agendadas</p>
                )}
            </div>

            {/* Mostrar solo en escritorio */}
            <div className="hidden lg:block w-full h-[21.5rem] bg-[#d6ebe9] p-4 rounded-lg shadow-md">

                {selectedPatient ? (
                    <RecordPatient patientInfo={selectedPatient} setSelectedPatient={setSelectedPatient} />
                ) : (
                    <>
                        <p className="text-xl font-bold mb-2">Expediente Médico</p>
                        <p className="text-stone-500">Selecciona un paciente</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default RecordInfoPatient;
