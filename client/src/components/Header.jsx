import { NavLink } from "react-router-dom";
import "./header.css";

export function Header() {
  return (
    <header>
      <a href="https://techeducators.co.uk/">
        <img src="/assets/tech-ed-full-banner.png"></img>
      </a>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About This App</NavLink>
        <NavLink to="/reviews">Reviews</NavLink>
        <NavLink to="/submit">Tell us your story</NavLink>
      </nav>
    </header>
  );
}
