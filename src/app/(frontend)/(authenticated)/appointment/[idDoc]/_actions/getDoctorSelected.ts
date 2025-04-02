'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function getDoctorSelected({ idDoc }: { idDoc: string }) {
    const payload = await getPayload({ config: await configPromise });
    const doc = await payload.find({
        collection: 'doctors',
        where: {
            id: {
                equals: idDoc,
            }
        },
    });
    console.log(doc, "doc doctor selected");

    return doc || null;
}