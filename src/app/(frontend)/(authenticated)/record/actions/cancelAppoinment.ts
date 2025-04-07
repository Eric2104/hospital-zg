'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function cancelAppoinment({ idAppoinment }: { idAppoinment: string }) {
    const payload = await getPayload({ config: await configPromise });
    const appointment = await payload.update({
        collection: 'appointments',
        id: idAppoinment,
        data: {
            status: 'canceled',
        },
    });

    return appointment || null;
}
