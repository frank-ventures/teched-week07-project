import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

export function ReviewsPage() {
  return (
    <>
      <h2>Reviews page</h2>
      <nav>
        <NavLink to="">Clear sort</NavLink> |
        <NavLink to="all">See All Reviews</NavLink> |
        <NavLink to="category">By Category</NavLink> |
        <NavLink to="relationship">By Relationship</NavLink> |
      </nav>
      <Outlet />
    </>
  );
}

export function ReviewsAll() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getAllReviews();
  }, []);

  async function getAllReviews() {
    const response = await fetch("http://localhost:8080/reviews");
    const data = await response.json();
    setReviews(data);
  }
  return (
    <>
      {reviews.map((review) => {
        return (
          <div key={review.id}>
            <h2>{review.title}</h2>
            <h3>{review.category}</h3>
            <p>{review.name}</p>
            <p>{review.relationship}</p>
            <p>{review.content}</p>
          </div>
        );
      })}
    </>
  );
}
