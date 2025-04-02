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
            name: "years",
            label: "Years",
            type: "number",
            required: true,
            admin: {
                readOnly: true,
                description: "This field is read only and is calculated automatically",
            },
            hooks: {
                beforeChange: [
                    ({ data }) => {
                        if (data?.born) {
                            const bornDate = new Date(data.born);
                            const currentDate = new Date();
                            const age = currentDate.getFullYear() - bornDate.getFullYear();
                            console.log("bornDate.getFullYear()", bornDate.getFullYear());
                            return age;
                        }
                        return null;
                    },
                ],
            }
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
        {
            name: "bloodType",
            label: "Blood Type",
            type: "select",
            options: [
                { label: "---", value: "---" },
                { label: "O+", value: "O+" },
                { label: "O-", value: "O-" },
                { label: "A+", value: "A+" },
                { label: "A-", value: "A-" },
                { label: "B+", value: "B+" },
                { label: "B-", value: "B-" },
                { label: "AB+", value: "AB+" },
                { label: "AB-", value: "AB-" },
            ],
            defaultValue: "---",
        },
        {
            name: "allergies",
            label: "Allergies",
            type: "text",
            defaultValue: "---",
        },
        {
            name: "cronicDiseases",
            label: "Cronic Diseases",
            type: "text",
            defaultValue: "---",
        },
        {
            name: "medications",
            label: "Medications",
            type: "text",
            defaultValue: "---",
        }
    ]
}