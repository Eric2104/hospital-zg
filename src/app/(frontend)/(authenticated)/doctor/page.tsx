import { getUser } from "../_actions/getUser";
import Header from "./components/Header";
import PatientInfo from "./components/patientInfo";
import { redirect } from 'next/navigation';

const Page = async () => {

    const user = await getUser()
    if (user?.role !== 'doctor') {
        redirect('/dashboard');
    }

    return (
        <div>
            <Header />
            <PatientInfo />
        </div>
    );
}

export default Page;