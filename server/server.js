// --- --- --- --- --- --- --- --- --- --- --- ---
// Imports
// --- --- --- --- --- --- --- --- --- --- --- ---
import express from "express";
import cors from "cors";
// Import the database call from other function
import { db } from "./databaseCall.js";

// Set up our Express server
const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

// --- --- --- --- --- --- --- --- --- --- --- ---
// GET Endpoints
// --- --- --- --- --- --- --- --- --- --- --- ---

// --- --- --- ---
// The root route of the server. There's nothing here
// --- --- --- ---
app.get("/", (request, response) => {
  response.json("Root Route. Woot Woute!");
});
// --- --- --- ---
// Get ALL of the reviews. ALL of them. No sorting.
// --- --- --- ---
app.get("/reviews", async (request, response) => {
  const result = await db.query(`
SELECT
  wkseven_reviews.title, wkseven_reviews.content ,
  wkseven_users.username AS name,
  wkseven_categories.name AS category,
  wkseven_relationships.type AS relationship
FROM  wkseven_reviews
  JOIN wkseven_users ON wkseven_reviews.username_id = wkseven_users.id
  JOIN wkseven_categories ON wkseven_reviews.category_id = wkseven_categories.id
  JOIN wkseven_relationships ON wkseven_reviews.relationship_id = wkseven_relationships.id
`);
  response.json(result.rows);
});
// --- --- --- ---
// Get the reviews sorted by User
// --- --- --- ---
app.get("/reviews-by-user", async (request, response) => {
  const result = await db.query(`
    SELECT
    wkseven_reviews.title, wkseven_reviews.content ,
    wkseven_users.username AS name,
    wkseven_categories.name AS category,
    wkseven_relationships.type AS relationship
  FROM  wkseven_reviews
    JOIN wkseven_users ON wkseven_reviews.username_id = wkseven_users.id
    JOIN wkseven_categories ON wkseven_reviews.category_id = wkseven_categories.id
    JOIN wkseven_relationships ON wkseven_reviews.relationship_id = wkseven_relationships.id
  WHERE wkseven_users.username = 'Frankie'
  `);
  response.json(result.rows);
});
// --- --- --- ---
// Get the reviews sorted by Relationship to the company
// --- --- --- ---
app.get("/reviews", async (request, response) => {
  const result = await db.query(`
  SELECT
    wkseven_reviews.title, wkseven_reviews.content ,
    wkseven_users.username AS name,
    wkseven_categories.name AS category,
    wkseven_relationships.type AS relationship
  FROM  wkseven_reviews
    JOIN wkseven_users ON wkseven_reviews.username_id = wkseven_users.id
    JOIN wkseven_categories ON wkseven_reviews.category_id = wkseven_categories.id
    JOIN wkseven_relationships ON wkseven_reviews.relationship_id = wkseven_relationships.id
  `);
  response.json(result.rows);
});
// --- --- --- ---
// Get the reviews sorted by Category
// --- --- --- ---
app.get("/reviews", async (request, response) => {
  const result = await db.query(`
  SELECT
    wkseven_reviews.title, wkseven_reviews.content ,
    wkseven_users.username AS name,
    wkseven_categories.name AS category,
    wkseven_relationships.type AS relationship
  FROM  wkseven_reviews
    JOIN wkseven_users ON wkseven_reviews.username_id = wkseven_users.id
    JOIN wkseven_categories ON wkseven_reviews.category_id = wkseven_categories.id
    JOIN wkseven_relationships ON wkseven_reviews.relationship_id = wkseven_relationships.id
  `);
  response.json(result.rows);
});

// --- --- --- --- --- --- --- --- --- --- --- ---
// POST Endpoints
// --- --- --- --- --- --- --- --- --- --- --- ---

// --- --- --- --- --- --- --- --- --- --- --- ---
// Listen
// --- --- --- --- --- --- --- --- --- --- --- ---
app.listen(PORT, () => console.log(`I am running on ${PORT}`));
