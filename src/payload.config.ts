import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

// s3-storage-import-placeholder
import { s3Storage } from '@payloadcms/storage-s3'
import { Customers } from './collections/Customers'
import brevoAdapter from './utils/brevoAdapter'
import { Specialty } from './collections/Specialty'
import { Doctors } from './collections/Doctors'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)



export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // system to send emails with brevo example: forgot password (no working)
  email: brevoAdapter(),
  collections: [Users, Media, Customers, Specialty, Doctors],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // config-3s-storage
    s3Storage({
      collections: {
        media: true
      },
      bucket: process.env.S3_BUCKET_NAME || '',
      config: {
        region: process.env.S3_REGION || '',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        }
      },
    })
  ],
})
