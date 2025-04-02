'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function getUserAppoinment({ idUser }: { idUser: string }) {
    const payload = await getPayload({ config: await configPromise });
    const appointments = await payload.find({
        collection: 'appointments',
        where: {
            idCustomer: {
                equals: idUser,
            },
        },
    });

    return appointments || null;
}