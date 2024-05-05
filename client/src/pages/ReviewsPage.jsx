// --- --- --- --- --- --- --- --- --- --- --- ---
// Import some useful things
// --- --- --- --- --- --- --- --- --- --- --- ---
import { useState, useEffect, useContext } from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import "./reviewspage.css";
import { fetchUrl } from "../App";
// --- --- --- --- --- --- --- --- --- --- --- ---
// Context time
// --- --- --- --- --- --- --- --- --- --- --- ---
// import { ReviewsProvider } from "../Context.jsx";

// --- --- --- --- --- --- --- --- --- --- --- ---
// Main Review Page export
// --- --- --- --- --- --- --- --- --- --- --- ---
export function ReviewsPage() {
  return (
    <>
      {/* <ReviewsProvider> */}
      <h2>Reviews</h2>
      <p>Choose the Tech-stamonials you&apos;d like to see</p>
      <nav className="flex nav-sort-reviews">
        <NavLink
          to=""
          className={({ isActive }) => [isActive ? "blank-button" : ""]}
        >
          Clear sort
        </NavLink>
        <NavLink to="all">All Reviews</NavLink>
        <NavLink to="category">By Category</NavLink>
        <NavLink to="relationship">By Relationship</NavLink>
        <NavLink to="user">By User</NavLink>
      </nav>
      <Outlet />
      {/* </ReviewsProvider> */}
    </>
  );
}

// --- --- --- --- --- --- --- --- --- --- --- ---
// Re-usable component to display the reviews returned from the database
// --- --- --- --- --- --- --- --- --- --- --- ---
export function ReviewsDisplay({ loading, reviews }) {
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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReviews();
  }, []);

  async function getAllReviews() {
    setLoading(true);
    const response = await fetch(`${fetchUrl}/reviews`);
    const data = await response.json();
    setReviews(data.reverse());
    setLoading(false);
  }
  return <ReviewsDisplay loading={loading} reviews={reviews} />;
}

// --- --- --- --- --- --- --- --- --- --- --- ---
// Component which gets Reviews by Category
// --- --- --- --- --- --- --- --- --- --- --- ---
export function ReviewsByCategory() {
  const [categories, setCategories] = useState([]);
  const [option, setOption] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const response = await fetch(`${fetchUrl}/categories-list`);
    const data = await response.json();
    setCategories(data);
  }

  const handleSearch = (event) => {
    // These next couple of bits allow us to extract the text from the users selection.
    const selectedIndex = event.target.selectedIndex;
    console.log(event.target.selectedIndex);
    setOption(event.target.options[selectedIndex].text);
    console.log(event.target.options[selectedIndex]);
    console.log(event.target.options[selectedIndex].text);

    setSearchParams({ sort: event.target.value }, getReviewsByCategory);
    console.log("sort has been set to- ", sort);
  };

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviewsByCategory();
  }, [sort]);

  async function getReviewsByCategory() {
    console.log("getreviewscalled");
    setLoading(true);
    const response = await fetch(`${fetchUrl}/reviews?category=${sort}`);
    const data = await response.json();
    setReviews(data.reverse());
    setLoading(false);
  }

  return (
    <>
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
          <ReviewsDisplay loading={loading} reviews={reviews} />
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
  const [option, setOption] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  useEffect(() => {
    getRelationship();
  }, []);

  async function getRelationship() {
    const response = await fetch(`${fetchUrl}/relationships-list`);
    const data = await response.json();
    setRelationship(data);
  }

  const handleSearch = (event) => {
    // These next couple of bits allow us to extract the text from the users selection.
    const selectedIndex = event.target.selectedIndex;
    console.log(event.target.selectedIndex);
    setOption(event.target.options[selectedIndex].text);
    console.log(event.target.options[selectedIndex]);
    console.log(event.target.options[selectedIndex].text);

    setSearchParams({ sort: event.target.value }, getReviewsByRelationship);
    console.log("sort has been set to- ", sort);
  };

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviewsByRelationship();
  }, [sort]);

  async function getReviewsByRelationship() {
    console.log("getreviewscalled");
    setLoading(true);
    const response = await fetch(`${fetchUrl}/reviews?relationship=${sort}`);
    const data = await response.json();
    setReviews(data.reverse());
    setLoading(false);
  }

  return (
    <>
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
          <ReviewsDisplay loading={loading} reviews={reviews} />
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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    getReviewsByUser();
  }, [form]);

  async function getReviewsByUser() {
    console.log("getreviewscalled");
    setLoading(true);
    const response = await fetch(`${fetchUrl}/reviews?user=${form.userSearch}`);
    const data = await response.json();
    setReviews(data.reverse());
    setLoading(false);
  }

  return (
    <>
      <label htmlFor="userSearch">Enter a name</label>
      <input name="userSearch" type="text" onChange={handleChange} />
      <p>You&apos;ve searched for: {form.userSearch}</p>
      {console.log(form.userSearch)}
      <ReviewsDisplay loading={loading} reviews={reviews} />
    </>
  );
}
