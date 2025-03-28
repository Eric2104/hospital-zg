'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function getSpecialtiesDoctors({ idSpecialty }: { idSpecialty: string }) {
    const payload = await getPayload({ config: await configPromise });
    const specialties = await payload.find({
        collection: 'doctors',
        where: {
            'specialty.slug': {
                equals: idSpecialty,
            },
        },
    });

    return specialties || null;
}