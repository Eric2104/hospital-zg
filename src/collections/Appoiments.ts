import { CollectionConfig } from "payload";

export const Appointments: CollectionConfig = {
    slug: "appointments",
    labels: {
        singular: "Cita",
        plural: "Citas",
    },
    fields: [
        {
            name: "schedule",
            type: "text",
            required: true,
            label: "Fecha de la cita",
        },
        {
            name: "idDoctor",
            type: "relationship",
            relationTo: "doctors",
            required: true,
        },
        {
            name: "idCustomer",
            type: "relationship",
            relationTo: "customers",
            required: true,
        },
        {
            name: "time",
            type: "text",
            required: true,
            label: "Horario",
        },
        {
            name: "status",
            type: "select",
            options: [
                {
                    label: "Pendiente",
                    value: "pending",
                },
                {
                    label: "Completada",
                    value: "completed",
                },
                {
                    label: "Cancelada",
                    value: "canceled",
                },
            ],
            defaultValue: "pending",
            required: true,
        }
    ],
}