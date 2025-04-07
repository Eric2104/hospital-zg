import { X } from "lucide-react";
import { cancelRecord } from "../_actions/cancelRecord";

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

const RecordPatient = ({ patientInfo, setSelectedPatient }: { patientInfo: PatientsInfo; setSelectedPatient: (patientInfo: PatientsInfo | null) => void }) => {

    const handleCancel = async (stateRecord: String) => {
        try {

            const response = await cancelRecord(patientInfo.id, stateRecord);
            if (response) {
                //Se recarga la página para ver los cambios
                window.location.reload();
            } else {
                alert("No se pudo cancelar la cita.");
            }
        } catch (error) {
            alert("Error al cancelar la cita.");
        }
    };

    return (
        <div className="relative">
            <p className="text-xl font-bold mb-2">Expediente Médico</p>
            <button className="absolute top-0 right-2 hidden lg:block" onClick={() => setSelectedPatient(null)}>
                <X />
            </button>

            <ul className="space-y-2">
                <li><strong>Nombre:</strong> {patientInfo.idCustomer.firstName} {patientInfo.idCustomer.lastName}</li>
                <li><strong>Hora:</strong> {patientInfo.time}</li>
                <li><strong>Tipo de sangre:</strong> {patientInfo.idCustomer.bloodType}</li>
                <li><strong>Alergias:</strong> {patientInfo.idCustomer.allergies}</li>
                <li><strong>Medicaciones:</strong> {patientInfo.idCustomer.medications}</li>
                <li><strong>Motivo:</strong> {patientInfo.reason}</li>
            </ul>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mx-8 mt-2 py-3">
                <button type="button"
                    onClick={() => { handleCancel('completed') }}
                    className="px-4 py-2 text-white bg-[#76beb7] hover:bg-[#57a099] rounded-lg  focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                    Marcar completado
                </button>
                {/* Cancelar cita de acuerdo al ID */}
                <button
                    type="button"
                    onClick={() => { handleCancel('cancel') }}
                    className="px-4 py-2 text-white bg-red-400 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                    Cancelar cita
                </button>
            </div>
        </div>
    );
};

export default RecordPatient;
