import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

export function ReviewsPage() {
  return (
    <>
      <h2>Reviews page</h2>
      <p>Choose the Tech-stamonials you&apos;d like to see</p>
      <nav>
        <NavLink
          to=""
          className={({ isActive }) => [isActive ? "blank-button" : ""]}
        >
          Clear sort
        </NavLink>
        <NavLink to="all">All Reviews</NavLink>
        <NavLink to="category">By Category</NavLink>
        <NavLink to="relationship">By Relationship</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export function ReviewsAll() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReviews();
  }, []);

  async function getAllReviews() {
    setLoading(true);
    const response = await fetch("http://localhost:8080/reviews");
    const data = await response.json();
    setReviews(data);
    setLoading(false);
  }
  return (
    <div className="reviews-all-wrapper">
      {loading ? (
        <p>Loading results...</p>
      ) : reviews.length === 0 ? (
        <p>No results found</p>
      ) : (
        reviews.map((review) => {
          return (
            <div key={review.id} className="reviews-individual">
              <h2>{review.title}</h2>
              <h3>{review.category}</h3>
              <p>{review.name}</p>
              <p>{review.relationship}</p>
              <p>{review.content}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
