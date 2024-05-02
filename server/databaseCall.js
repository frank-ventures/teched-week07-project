import dotenv from "dotenv";
import pg from "pg";

// Set up dotenv
dotenv.config();
const dbConnectionString = process.env.DATABASE_URL;

// Set up database with Postgres
export const db = new pg.Pool({
  connectionString: dbConnectionString
});
