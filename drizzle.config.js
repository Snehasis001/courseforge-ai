import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // or just dotenv.config() if using .env

// 👇 ADD THIS LINE HERE
console.log("DATABASE_URL:", process.env.DATABASE_URL);

export default defineConfig({
  schema: "./config/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});