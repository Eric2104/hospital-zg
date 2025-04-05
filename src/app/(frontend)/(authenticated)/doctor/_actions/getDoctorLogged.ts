'use server';

import { headers as getHeaders } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Payload } from 'payload';
import { Doctor } from '@/payload-types';

export async function getDoctorLogged(): Promise<Doctor> {
    const headers = await getHeaders();
    const payload: Payload = await getPayload({ config: await configPromise });
    const { user } = await payload.auth({ headers });
    return user || null;
}