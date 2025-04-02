'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function getDoctorAppointment({ idDoc }: { idDoc: string }) {
    const payload = await getPayload({ config: await configPromise });
    const doc = await payload.find({
        collection: 'doctors',
        where: {
            id: {
                equals: idDoc,
            }
        },
    });

    return doc || null;
}