// Importa las funciones y configuraciones necesarias
import { getPayload } from 'payload';
import config from '@payload-config';

interface Patient {
    idDoctor: string;
}

export async function getPatients({ idDoctor }: Patient) {
    const payload = await getPayload({ config: await config });

    const patients = await payload.find({
        collection: "appointments",
        where: {
            idDoctor: {
                equals: idDoctor,
            },
            status: {
                equals: "pending",
            },
        }
    })

    return patients || null;
}