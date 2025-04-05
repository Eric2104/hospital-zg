'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

export async function cancelRecord(idAppointment: string, stateRecord: String) {
    const payload = await getPayload({ config });

    try {
        if (stateRecord === 'cancel') {
            const updatedAppointment = await payload.update({
                collection: 'appointments',
                id: idAppointment,
                data: {
                    status: 'canceled',
                },
            });
            return updatedAppointment;

        } else {
            const updatedAppointment = await payload.update({
                collection: 'appointments',
                id: idAppointment,
                data: {
                    status: 'completed',
                },
            });
            return updatedAppointment;

        }
        return null;


    } catch (error) {
        console.error('Error al cancelar la cita:', error);
        throw error;
    }
}
