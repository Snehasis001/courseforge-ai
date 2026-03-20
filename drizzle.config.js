import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_h4f3JxtDWdnb@ep-dry-brook-a139l7l3-pooler.ap-southeast-1.aws.neon.tech/online_course?sslmode=require',
  },
})