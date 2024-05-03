import "./homepage.css";
import { NavLink } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <h1>Tech Educators has been on a mission</h1>
      <div className="home-info">
        <p>
          Since 2022, they&apos;ve quite simply aimed to make software
          development education accessible to everybody.
        </p>
        <p>
          <em>Everybody</em>
        </p>
        <hr />
        <p>Find out what the people have said:</p>
        <NavLink to="reviews/all" className="homepage-all-button">
          See All Reviews
        </NavLink>
      </div>
    </>
  );
}
