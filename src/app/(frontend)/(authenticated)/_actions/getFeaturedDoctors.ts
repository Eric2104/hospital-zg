'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function getFeaturedDoctors() {
    const payload = await getPayload({ config: await configPromise });
    const featuredDoc = await payload.find({
        collection: 'doctors',
        where: {
            featured: { equals: true },
        }
    });

    return featuredDoc || null;
}