import type { CollectionConfig } from 'payload';

// Función para generar el slug
const generateSlug = (text: string): string => {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};

export const Specialty: CollectionConfig = {
    slug: "specialty",
    admin: {
        useAsTitle: "name",
    },
    access: {
        create: () => true,
    },
    fields: [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "color",
            label: "Color",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            label: "Slug",
            type: "text",
            required: true,
            unique: true,
            admin: {
                description: "Este campo se genera automáticamente, no lo modifiques",
                readOnly: true,
            },
            hooks: {
                beforeChange: [
                    ({ data, value }) => {
                        if (data?.name) {
                            return generateSlug(data.name);
                        }
                        return value;
                    },
                ],
            },

        },
    ],
};