# SQL Queries from Supabase

---

## Create all Frankie tables

---

```sql
CREATE TABLE IF NOT EXISTS wkseven_relationships (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS wkseven_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS wkseven_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  relationship_id INTEGER REFERENCES wkseven_relationships(id)
);

CREATE TABLE IF NOT EXISTS wkseven_reviews (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  username_id INTEGER REFERENCES wkseven_users(id),
  relationship_id INTEGER REFERENCES wkseven_relationships(id),
  category_id INTEGER REFERENCES wkseven_categories(id)
);
```

---

## Insert seed data

---

### Other tables

```sql
-- Relationships
INSERT INTO wkseven_relationships(type) VALUES('Staff');
INSERT INTO wkseven_relationships(type) VALUES('Student');
INSERT INTO wkseven_relationships(type) VALUES('Graduate');
INSERT INTO wkseven_relationships(type) VALUES('Business Connection');

-- Categories
INSERT INTO wkseven_categories(name) VALUES('Course Review - Software Development');
INSERT INTO wkseven_categories(name) VALUES('Course Review - Games Development');
INSERT INTO wkseven_categories(name) VALUES('Suggestion');
INSERT INTO wkseven_categories(name) VALUES('Business Interaction');
INSERT INTO wkseven_categories(name) VALUES('Personal Experience');

-- Users
INSERT INTO wkseven_users(username, relationship_id) VALUES('Frankie', '2');
INSERT INTO wkseven_users(username, relationship_id) VALUES('Precious', '2');
INSERT INTO wkseven_users(username, relationship_id) VALUES('Kev', '2');
INSERT INTO wkseven_users(username, relationship_id) VALUES('Connor', '2');
INSERT INTO wkseven_users(username, relationship_id) VALUES('Colin', '2');
INSERT INTO wkseven_users(username, relationship_id) VALUES('Manny', '1');
INSERT INTO wkseven_users(username, relationship_id) VALUES('Tim', '1');
INSERT INTO wkseven_users(username, relationship_id) VALUES('Emma', '2');
INSERT INTO wkseven_users(username, relationship_id) VALUES('James', '1');
```

### Reviews themselves

```sql
-- Reviews
-- -- --
-- Frankie
INSERT INTO wkseven_reviews(title, content, username_id, relationship_id, category_id) VALUES('Frankies review', 'I''ve learned so much in only 7 weeks so far. What a ride!', '1', '2', '1');
-- Precious
INSERT INTO wkseven_reviews(title, content, username_id, relationship_id, category_id) VALUES('What a blast', 'This course is coolie!', '2', '2', '1');
-- Kev
INSERT INTO wkseven_reviews(title, content, username_id, relationship_id, category_id) VALUES('I''m Kev, and I make TimTim things', 'I have unfortunately been made to sign an NDA, so I can no longer share my opinion.', '3', '2', '5');
-- Connor
INSERT INTO wkseven_reviews(title, content, username_id, relationship_id, category_id) VALUES('I would tell you about the frog related projects I''ve made...', 'But I''ve been muted.', '4', '2', '5');
-- Colin
INSERT INTO wkseven_reviews(title, content, username_id, relationship_id, category_id) VALUES('Endless Learning.', 'I have learned so much, and only 50% of it has been tech related!', '5', '2', '5');
-- Manny
INSERT INTO wkseven_reviews(title, content, username_id, relationship_id, category_id) VALUES('I really like my colleagues', 'But they pronounce it ''cho-ree-zoh'' and it makes my tongue twitch!', '6', '1', '5');
-- Tim
INSERT INTO wkseven_reviews(title, content, username_id, relationship_id, category_id) VALUES('Did I tell you I think I''m handsome?', 'Never have I been in a workplace so accepting, that I can continuously use my handsomeness as a coding example and have zero repercussions', '7', '1', '5');
-- Emma
INSERT INTO wkseven_reviews(title, content, username_id, relationship_id, category_id) VALUES('The creative potential is huge!', 'I have had so many dreams over the years of expressing my Eurovision love and FINALLY I''m able to bring those to life, on the web!', '8', '2', '1');
-- James
INSERT INTO wkseven_reviews(title, content, username_id, relationship_id, category_id) VALUES('Productivity took a nosedive', 'I thought I was doing a good thing by starting this business and hiring some fantastic individuals, however, my own mission and work has undone me, and now I can''t stop playing Cookie Clicker games. Just one more spinning Ainsley...', '9', '1', '5');
```

## Queries

### Get All Reviews with correct relationships

```sql
SELECT
  wkseven_reviews.title, wkseven_reviews.content ,
  wkseven_users.username AS name,
  wkseven_categories.name AS category,
  wkseven_relationships.type AS relationship
FROM  wkseven_reviews
  JOIN wkseven_users ON wkseven_reviews.username_id = wkseven_users.id
  JOIN wkseven_categories ON wkseven_reviews.category_id = wkseven_categories.id
  JOIN wkseven_relationships ON wkseven_reviews.relationship_id = wkseven_relationships.id
```

### All by user name

Change the name within the WHERE statement

```sql
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
```

### All by relationship

Change the type within the WHERE statement

```sql
SELECT
  wkseven_reviews.title, wkseven_reviews.content ,
  wkseven_users.username AS name,
  wkseven_categories.name AS category,
  wkseven_relationships.type AS relationship
FROM  wkseven_reviews
  JOIN wkseven_users ON wkseven_reviews.username_id = wkseven_users.id
  JOIN wkseven_categories ON wkseven_reviews.category_id = wkseven_categories.id
  JOIN wkseven_relationships ON wkseven_reviews.relationship_id = wkseven_relationships.id
WHERE wkseven_relationships.type = 'Student'
```

### All by category

Change the name within the WHERE statement

```sql
SELECT
  wkseven_reviews.title, wkseven_reviews.content ,
  wkseven_users.username AS name,
  wkseven_categories.name AS category,
  wkseven_relationships.type AS relationship
FROM  wkseven_reviews
  JOIN wkseven_users ON wkseven_reviews.username_id = wkseven_users.id
  JOIN wkseven_categories ON wkseven_reviews.category_id = wkseven_categories.id
  JOIN wkseven_relationships ON wkseven_reviews.relationship_id = wkseven_relationships.id
WHERE wkseven_categories.name = 'Personal Experience'
```
