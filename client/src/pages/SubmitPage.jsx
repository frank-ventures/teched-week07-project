import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./submitpage.css";

export function SubmitPage() {
  // Variables to handle our data and form
  const [relationships, setRelationships] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState([]);
  const [showForm, setShowForm] = useState("show-form");
  const fetchUrl = "http://localhost:8080";

  //   These fetch the selectable categories and relationships from the database
  async function getRelationships() {
    const response = await fetch(`${fetchUrl}/relationships-list`);
    const data = await response.json();
    setRelationships(data);
  }
  async function getCategories() {
    const response = await fetch(`${fetchUrl}/categories-list`);
    const data = await response.json();
    setCategories(data);
  }

  //   These handle the form changes and submission
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  }

  async function handleFormSubmit(event) {
    setShowForm("submitted");
    event.preventDefault();
    console.log("You clicked submit!");
    const response = await fetch(`${fetchUrl}/send-review`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      console.log("form submitted successfully");
      setShowForm("success");
    } else {
      console.log("form failed");
    }
  }

  useEffect(() => {
    getRelationships();
    getCategories();
  }, []);

  return (
    <>
      {showForm === "show-form" ? (
        <>
          <div className="submit-page-info">
            <h2>Have you got an experience you&apos;d like to share?</h2>
            <p>Share it here. Keep it clean, respectable, but honest.</p>
            <hr></hr>
          </div>
          <form onSubmit={handleFormSubmit} onChange={handleChange}>
            {/* --- --- --- --- */}
            {/* Users name */}
            {/* --- --- --- --- */}
            <label htmlFor="username">Your Name:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Name"
              required
            />{" "}
            {/* --- --- --- --- */}
            {/* Users relationship to the company */}
            {/* --- --- --- --- */}
            <label htmlFor="username">Relationship to Tech Educators: </label>
            <select
              type="select"
              name="relationship"
              id="relationship"
              required
              defaultValue=""
            >
              <option disabled value="">
                Pick a relationship
              </option>
              {relationships.map((rel) => {
                return (
                  <option key={rel.id} value={rel.id} name={rel.type}>
                    {rel.type}
                  </option>
                );
              })}
            </select>
            {/* --- --- --- --- */}
            {/* Review Title */}
            {/* --- --- --- --- */}
            <label htmlFor="username">Give your experience a title:</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Review Title"
              required
            />
            {/* --- --- --- --- */}
            {/* Category of users experience */}
            {/* --- --- --- --- */}
            <label htmlFor="username">Category of your experience: </label>
            <select
              type="select"
              name="category"
              id="category"
              required
              defaultValue=""
            >
              <option disabled value="">
                What was your experience?
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id} name={cat.name}>
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
              required
            />
            <button>Send it through!</button>
            {/* --- --- --- --- */}
            {/* End of form */}
          </form>
        </>
      ) : showForm === "submitted" ? (
        <>
          <div className="submit-page-info">
            <h2>Submitting...</h2>
            <p> </p>
            <hr></hr>
          </div>
          <p>Thanks for waiting...</p>
        </>
      ) : showForm === "success" ? (
        <>
          <div className="submit-page-info">
            <h2>Success!</h2>
            <p>Woohoo! We got it!</p>
            <hr></hr>
          </div>
          <p>Check out the Reviews page or write another one.</p>
          <NavLink to="../reviews/all" className="submit-page-button">
            See All Reviews
          </NavLink>
          <button
            className="submit-page-button space-grotesk-teched"
            onClick={() => setShowForm("show-form")}
          >
            Write again
          </button>
        </>
      ) : null}
    </>
  );
}
