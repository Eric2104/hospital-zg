import type { CollectionConfig } from 'payload';

export const Customers: CollectionConfig = {
    slug: "customers",
    admin: {
        useAsTitle: "email",
    },
    access: {
        create: () => true,
    },
    auth: true,
    fields: [
        {
            name: "firstName",
            label: "First Name",
            type: "text",
            required: true,
        },
        {
            name: "lastName",
            label: "Last Name",
            type: "text",
            required: true,
        },
        {
            name: "dni",
            label: "Cedula",
            type: "text",
            required: true,
        },
        {
            name: "born",
            label: "Born",
            type: "date",
            required: true,
        },
        {
            name: "residence",
            label: "Residence",
            type: "text",
            required: true,
        },
        {
            name: "phone",
            label: "Phone",
            type: "number",
            required: true,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
        },
    ]
}