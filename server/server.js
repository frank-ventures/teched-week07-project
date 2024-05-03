// --- --- --- --- --- --- --- --- --- --- --- ---
// Imports
// --- --- --- --- --- --- --- --- --- --- --- ---
import express, { response } from "express";
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
// Get the lists of relationships and categories to display on the user form
// --- --- --- ---
app.get("/relationships-list", async (request, response) => {
  const result = await db.query(`SELECT * FROM wkseven_relationships`);
  response.json(result.rows);
});

app.get("/categories-list", async (request, response) => {
  const result = await db.query(`SELECT * FROM wkseven_categories`);
  response.json(result.rows);
});

// --- --- --- ---
// Get ALL of the reviews. ALL of them. No sorting.
// --- --- --- ---
app.get("/reviews", async (request, response) => {
  const result = await db.query(`
SELECT
wkseven_reviews.title,wkseven_reviews.id, wkseven_reviews.content ,
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
app.post("/send-review", async (request, response) => {
  try {
    // Destructuring the request.body object to get the variables within:
    const { username, relationship, title, category, content } = request.body;
    console.log(request.body);

    // First we need to check if the username exists:
    let usernameId;
    const usernameResult = await db.query(
      `
    SELECT id FROM wkseven_users WHERE username = $1`,
      [username]
    );
    console.log("Result array length: ", usernameResult.rows.length);

    // 'usernameResult' is an array, so we check the length of the array.
    //  If it has a length greater than 0 then it means the user exists in the users table on the database
    //  and we can use their ID:
    if (usernameResult.rows.length > 0) {
      usernameId = usernameResult.rows[0].id;
      console.log("Their user ID is: ", usernameId);
    } else {
      // If the array length is 0, it means the user doesn't exist yet so we need to add them to the database!
      const newUserResult = await db.query(
        `INSERT INTO wkseven_users (username) VALUES ($1) RETURNING id`,
        [username]
      );
      usernameId = newUserResult.rows[0].id;
      console.log("Their user ID is: ", usernameId);
    }

    // Finally, we can enter the review into the database. Woop!
    await db.query(
      `
      INSERT INTO wkseven_reviews (title, content, username_id, relationship_id, category_id)
      VALUES ($1, $2, $3, $4, $5)
    `,
      [title, content, usernameId, relationship, category]
    );

    response.json({ success: true });
  } catch (error) {
    console.error("Error handling review submission:", error);
    response
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});

// --- --- --- --- --- --- --- --- --- --- --- ---
// Listen
// --- --- --- --- --- --- --- --- --- --- --- ---
app.listen(PORT, () => console.log(`I am running on ${PORT}`));
