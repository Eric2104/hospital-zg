import { getDoctorLogged } from "../_actions/getDoctorLogged";
import { getPatients } from "../_actions/getPatient";
import RecordInfoPatient from "./recordInfoPatient";

interface PatientsInfo {

    id: string;
    idCustomer: | {
        id: string;
        firstName: string;
        lastName: string;
    };
    idDoctor: any | {
        id: string;
        firstName: string;
        lastName: string;
    }
    reason: string;
    time: string;

}

interface PatientInfoProps {
    docs: any | PatientsInfo[];
}

const PatientInfo = async () => {

    const doc = await getDoctorLogged()
    if (!doc.id) {
        return null
    }
    const patients: PatientInfoProps = await getPatients({ idDoctor: doc.id })


    return (
        <div className="px-2 lg:px-10">
            <p className="text-2xl">Citas del día</p>
            <RecordInfoPatient patients={patients} />
        </div>
    );
}

export default PatientInfo;