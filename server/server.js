// --- --- --- --- --- --- --- --- --- --- --- ---
// Imports
// --- --- --- --- --- --- --- --- --- --- --- ---
import express, { query, response } from "express";
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
// Get the lists of relationships and categories to display on the user form and for review searching:
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
// Get ALL of the reviews. ALL of them.
// --- --- --- ---
app.get("/reviews", async (request, response) => {
  // Lets check what our params/queries are:
  console.log("Current query is: ", request.query);
  console.log("Current param is: ", request.params);
  console.log("Current request body is ", request.body);

  // Lets set some variables to use:
  const category = request.query.category;
  const relationship = request.query.relationship;
  const user = request.query.user;

  // Lets define a standard SQL query which gets ALL the reviews:
  let sqlQuery = `
  SELECT
  wkseven_reviews.title,wkseven_reviews.id, wkseven_reviews.content ,
    wkseven_users.username AS name,
    wkseven_categories.name AS category,
    wkseven_relationships.type AS relationship
  FROM  wkseven_reviews
    JOIN wkseven_users ON wkseven_reviews.username_id = wkseven_users.id
    JOIN wkseven_categories ON wkseven_reviews.category_id = wkseven_categories.id
    JOIN wkseven_relationships ON wkseven_reviews.relationship_id = wkseven_relationships.id
  `;

  // if a search query query exists, let's do some stuff:
  if (category != null) {
    // --- --- --- ---
    // Get the reviews sorted by Category
    // --- --- --- ---
    try {
      // First let's append the correct SQL "WHERE" clause:
      sqlQuery += ` WHERE wkseven_categories.id = ($1)`;
      console.log("category is ", category);
      // And try to get that data
      const result = await db.query(sqlQuery, [category]);
      response.json(result.rows);
    } catch (error) {
      console.error("Error fetching posts:", error);
      response
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  } else if (relationship != null) {
    // --- --- --- ---
    // Get the reviews sorted by Relationship to the company
    // --- --- --- ---
    try {
      // First let's append the correct SQL "WHERE" clause:
      sqlQuery += ` WHERE wkseven_relationships.id = ($1)`;
      console.log("relationship is ", relationship);
      // And try to get that data
      const result = await db.query(sqlQuery, [relationship]);
      response.json(result.rows);
    } catch (error) {
      console.error("Error fetching posts:", error);
      response
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  } else if (user != null) {
    // --- --- --- ---
    // Get the reviews sorted by User
    // --- --- --- ---
    try {
      // This spicy little biscuit came from asking GPT "how I could make sure that if the search box was empty, with no entered characters, then return no results?"":
      if (!user.trim()) {
        response.json([]);
        return;
      }
      // First let's append the correct SQL "WHERE" clause:
      sqlQuery += `  WHERE wkseven_users.username ILIKE ($1)`;
      console.log("user is ", user);
      // And try to get that data
      const result = await db.query(sqlQuery, [`%${user.trim()}%`]);
      response.json(result.rows);
    } catch (error) {
      console.error("Error fetching posts:", error);
      response
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  } else {
    // If there are no queries/parameters, just get ALL the reviews:
    try {
      console.log(category);
      const result = await db.query(sqlQuery);
      response.json(result.rows);
    } catch (error) {
      console.error("Error fetching posts:", error);
      response
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }
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
