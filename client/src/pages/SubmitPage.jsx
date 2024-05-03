import { useState, useEffect } from "react";
import "./submitpage.css";

export function SubmitPage() {
  const [relationships, setRelationships] = useState([]);
  const [categories, setCategories] = useState([]);

  async function getRelationships() {
    const response = await fetch("http://localhost:8080/relationships-list");
    const data = await response.json();
    setRelationships(data);
  }
  async function getCategories() {
    const response = await fetch("http://localhost:8080/categories-list");
    const data = await response.json();
    setCategories(data);
  }

  useEffect(() => {
    getRelationships();
    getCategories();
  }, []);

  return (
    <>
      <h2>Have you got an experience you&apos;d like to share?</h2>
      <p>Share it here. Keep it clean, respectable, but honest.</p>
      <hr></hr>
      <form action="submit">
        {/* --- --- --- --- */}
        {/* Users name */}
        {/* --- --- --- --- */}
        <label htmlFor="username">Your Name:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Name"
        />{" "}
        {/* --- --- --- --- */}
        {/* Users relationship to the company */}
        {/* --- --- --- --- */}
        <label htmlFor="username">Relationship to Tech Educators: </label>
        <select type="select" name="relationship" id="relationship" required>
          <option disabled selected value="">
            Pick a relationship
          </option>
          {relationships.map((rel) => {
            return (
              <option key={rel.id} value={rel.type}>
                {rel.type}
              </option>
            );
          })}
        </select>
        {/* --- --- --- --- */}
        {/* Review Title */}
        {/* --- --- --- --- */}
        <label htmlFor="username">Give your experience a title:</label>
        <input type="text" name="Title" id="Title" placeholder="Review Title" />
        {/* --- --- --- --- */}
        {/* Category of users experience */}
        {/* --- --- --- --- */}
        <label htmlFor="username">Category of your experience: </label>
        <select type="select" name="category" id="category" required>
          <option disabled selected value="">
            What was your experience?
          </option>
          {categories.map((cat) => {
            return (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            );
          })}
        </select>
        {/* --- --- --- --- */}
        {/* Main written content */}
        {/* --- --- --- --- */}
        <label htmlFor="username">Tell us about your experience:</label>
        <textarea
          rows="4"
          cols="50"
          name="content"
          id="content"
          placeholder="My time with Tech Educators..."
        />
        {/* --- --- --- --- */}
        {/* End of form */}
      </form>
    </>
  );
}
