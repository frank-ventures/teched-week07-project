import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./reviewspage.css";

export function ReviewsPage() {
  return (
    <>
      <h2>Reviews</h2>
      <p className="underline">
        Choose the Tech-stamonials you&apos;d like to see
      </p>
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

    setReviews(data.reverse());
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
