// --- --- --- --- --- --- --- --- --- --- --- ---
// Import some useful things
// --- --- --- --- --- --- --- --- --- --- --- ---
import { useState, useEffect, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./reviewspage.css";
import { fetchUrl } from "../App";
// --- --- --- --- --- --- --- --- --- --- --- ---
// Context time
// --- --- --- --- --- --- --- --- --- --- --- ---
import { ReviewsProvider, ReviewsContext } from "../Context.jsx";

// --- --- --- --- --- --- --- --- --- --- --- ---
// Main Review Page export
// --- --- --- --- --- --- --- --- --- --- --- ---
export function ReviewsPage() {
  return (
    <>
      <ReviewsProvider>
        <h2>Reviews</h2>
        <p className="please-choose">
          Choose the Tech-stamonials you&apos;d like to see
        </p>
        <nav className="flex nav-sort-reviews">
          <NavLink
            to=""
            className={({ isActive }) => [
              isActive ? "flex blank-button" : "flex"
            ]}
          >
            Clear sort
          </NavLink>
          <NavLink className="flex" to="all">
            All Reviews
          </NavLink>
          <NavLink className="flex" to="category">
            By Category
          </NavLink>
          <NavLink className="flex" to="relationship">
            By Relationship
          </NavLink>
          <NavLink className="flex" to="user">
            By User
          </NavLink>
        </nav>
        <Outlet />
      </ReviewsProvider>
    </>
  );
}

// --- --- --- --- --- --- --- --- --- --- --- ---
// Re-usable component to display the reviews returned from the database
// --- --- --- --- --- --- --- --- --- --- --- ---
export function ReviewsDisplay() {
  let { loading, reviews } = useContext(ReviewsContext);
  return (
    <div className="reviews-all-wrapper">
      {loading ? (
        <p>Loading results...</p>
      ) : reviews.length === 0 ? (
        <p>No results found</p>
      ) : (
        reviews.map((review) => {
          return (
            <div key={review.id} className="grid reviews-individual">
              <h2 className="grid review-title">{review.title}</h2>
              <div className="grid review-user-trio">
                <p className="grid review-user">{review.name}</p>
                <p className="grid review-relationship">
                  {review.relationship}
                </p>
                <p className="grid review-category">{review.category}</p>
              </div>
              <p className="grid review-content">{review.content}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

// --- --- --- --- --- --- --- --- --- --- --- ---
// Component which gets all Reviews, no sort.
// --- --- --- --- --- --- --- --- --- --- --- ---
export function ReviewsAll() {
  let {
    getAllReviews,
    sortBy,
    setSortBy,
    setOption,
    searchParams,
    setSearchParams,
    option
  } = useContext(ReviewsContext);

  useEffect(() => {
    setSortBy("");
    setSearchParams("");
    setOption("");
  }, []);

  useEffect(() => {
    getAllReviews();
  }, [sortBy, searchParams, option]);

  return <ReviewsDisplay />;
}

// --- --- --- --- --- --- --- --- --- --- --- ---
// Component which gets Reviews by Category
// --- --- --- --- --- --- --- --- --- --- --- ---
export function ReviewsByCategory() {
  const [categories, setCategories] = useState([]);
  let {
    getAllReviews,
    option,
    sort,
    setSearchParams,
    setOption,
    handleSearch,
    searchParams,
    setSortBy
  } = useContext(ReviewsContext);

  useEffect(() => {
    setSortBy("category");
    setSearchParams("");
    setOption("");
    getCategories();
  }, []);

  async function getCategories() {
    const response = await fetch(`${fetchUrl}/categories-list`);
    const data = await response.json();
    setCategories(data);
  }

  useEffect(() => {
    getAllReviews();
  }, [setSortBy, sort]);

  return (
    <>
      {/* --- --- --- --- --- --- --- --- */}
      {/* This is where we put the drop down box onto the page */}
      {/* --- --- --- --- --- --- --- --- */}
      <label htmlFor="username">Choose a Category of Reviews: </label>
      <select
        type="select"
        name="category"
        id="category"
        required
        defaultValue=""
        value={searchParams.get("sort") || ""}
        onChange={handleSearch}
      >
        <option disabled value="">
          What was your experience?
        </option>
        {categories.map((cat) => {
          return (
            <option key={cat.id} value={parseInt(cat.id)} name={cat.name}>
              {cat.name}
            </option>
          );
        })}
      </select>
      {console.log("sort number is ", sort)}
      {option != "" ? (
        <>
          <p>{option} reviews.</p>
          {/* --- --- --- --- --- --- --- --- */}
          {/* This is where we put the review results */}
          {/* --- --- --- --- --- --- --- --- */}
          <ReviewsDisplay />
        </>
      ) : (
        ""
      )}
    </>
  );
}

// --- --- --- --- --- --- --- --- --- --- --- ---
// Component which gets Reviews by Relationship
// --- --- --- --- --- --- --- --- --- --- --- ---
export function ReviewsByRelationship() {
  const [relationship, setRelationship] = useState([]);
  let {
    getAllReviews,
    option,
    sort,
    setSearchParams,
    setOption,
    handleSearch,
    searchParams,
    setSortBy
  } = useContext(ReviewsContext);

  useEffect(() => {
    setSortBy("relationship");
    setSearchParams("");
    setOption("");
    getRelationship();
  }, []);

  async function getRelationship() {
    const response = await fetch(`${fetchUrl}/relationships-list`);
    const data = await response.json();
    setRelationship(data);
  }

  useEffect(() => {
    getAllReviews();
  }, [setSortBy, sort]);

  return (
    <>
      {/* --- --- --- --- --- --- --- --- */}
      {/* This is where we put the drop down box onto the page */}
      {/* --- --- --- --- --- --- --- --- */}
      <label htmlFor="username">Choose a Relationship to the company: </label>
      <select
        type="select"
        name="category"
        id="category"
        defaultValue=""
        value={searchParams.get("sort") || ""}
        onChange={handleSearch}
      >
        <option disabled value="">
          Pick a relationship
        </option>
        {relationship.map((rel) => {
          return (
            <option key={rel.id} value={parseInt(rel.id)} name={rel.type}>
              {rel.type}
            </option>
          );
        })}
      </select>
      {option != "" ? (
        <>
          <p>{option} reviews.</p>
          {/* --- --- --- --- --- --- --- --- */}
          {/* This is where we put the review results */}
          {/* --- --- --- --- --- --- --- --- */}
          <ReviewsDisplay />
        </>
      ) : (
        ""
      )}
    </>
  );
}

// --- --- --- --- --- --- --- --- --- --- --- ---
// Component which gets Reviews by User.
// --- --- --- --- --- --- --- --- --- --- --- ---
export function ReviewsByUser() {
  let {
    setSearchParams,
    setOption,
    sort,
    setSortBy,
    getReviewsByUser,
    form,
    setForm,
    searchParams,
    option
  } = useContext(ReviewsContext);

  useEffect(() => {
    setSortBy("user");
    setSearchParams("");
    setOption("");
    setForm({ ...form, userSearch: null });
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    getReviewsByUser();
  }, [form, setForm, setSortBy, sort, searchParams, option]);

  return (
    <>
      <label htmlFor="userSearch">Enter a name</label>
      <input name="userSearch" type="text" onChange={handleChange} />
      <p>You&apos;ve searched for: {form.userSearch}</p>
      <ReviewsDisplay />
    </>
  );
}
