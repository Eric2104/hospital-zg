'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function getSpecialtyDoctor({ idSpecialty, idDoc }: { idSpecialty: string, idDoc: string }) {
    const payload = await getPayload({ config: await configPromise });
    const specialties = await payload.find({
        collection: 'doctors',
        where: {
            'specialty.slug': {
                equals: idSpecialty,
            },
            id: {
                equals: idDoc,
            }
        },
    });

    return specialties || null;
}