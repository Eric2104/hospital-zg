'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

// this action to get the specialties from the payload database
export async function getSpecialties() {
    const payload = await getPayload({ config: await configPromise });
    const specialties = await payload.find({
        collection: 'specialty'
    });

    return specialties || null;
}