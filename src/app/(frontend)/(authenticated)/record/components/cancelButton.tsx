'use client'
import { cancelAppoinment } from "../actions/cancelAppoinment";

const CancelButton = ({ idAppoinment }: { idAppoinment: string }) => {

    const handleCancel = async (id: string) => {
        const result = await cancelAppoinment({ idAppoinment: id });
        if (result && result.status === "canceled") {
            alert('Cita cancelada');
            window.location.reload(); // Recargar la página para ver los cambios
        }
    }

    return (
        <button onClick={() => { handleCancel(idAppoinment) }} className="text-sm text-white bg-[#e77d75] hover:bg-[#f08780] px-3 py-1 rounded-xl w-4/5 lg:w-2/3 mx-auto">Cancelar</button>
    );
}

export default CancelButton;