import { CollectionConfig } from "payload";

export const Doctors: CollectionConfig = {
    slug: "doctors",
    labels: {
        singular: "Doctor",
        plural: "Doctores",
    },
    auth: true,
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Nombre",
        },
        {
            name: "specialty",
            type: "relationship",
            relationTo: "specialty",
            hasMany: false,
            required: true,
            label: "Especialidad",
        },
        {
            name: "description",
            type: "textarea",
            label: "Descripción",
        },
        {
            name: "featured",
            type: "checkbox",
            label: "Destacado",
            defaultValue: false,
            required: true,
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            label: "Imagen",
        },
        {
            name: "schedule",
            type: "select",
            options: [
                { label: "Lunes-Viernes", value: "lunes-viernes" },
                { label: "Lunes-Miércoles", value: "lunes-miercoles" },
                { label: "Miércoles-Viernes", value: "miercoles-viernes" },
                { label: "Fin de semana", value: "sabado - domingo" },
            ],
            hasMany: true,
            required: true,
            label: "Horario",
        },
        {
            name: "workingHours",
            type: "select",
            options: [
                { label: "8:00AM - 5:00PM", value: "8:00am-5:00pm" },
                { label: "9:00AM - 6:00PM", value: "9:00am-6:00pm" },
                { label: "10:00AM - 7:00PM", value: "10:00am-7:00pm" },
                { label: "11:00AM - 8:00PM", value: "11:00am-8:00pm" },
                { label: "12:00PM - 9:00PM", value: "12:00pm-9:00pm" },
                { label: "1:00PM - 10:00PM", value: "1:00pm-10:00pm" },
            ],
            required: true,
            label: "Horas de Trabajo",
        },
        {
            name: "ubication",
            type: "text",
            label: "Ubicación",
            required: true,
        },
        {
            name: "price",
            type: "number",
            label: "Precio",
            required: true,
            min: 0,
            defaultValue: 0,
        },
        {
            name: "role",
            type: "select",
            options: [
                { label: "doctor", value: "doctor" },
                { label: "customer", value: "customer" }
            ],
            defaultValue: "doctor",
            hidden: true,

        }
    ],

}