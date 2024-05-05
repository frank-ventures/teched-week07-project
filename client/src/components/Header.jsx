import { NavLink } from "react-router-dom";
import "./header.css";

export function Header() {
  return (
    <header>
      <a href="https://techeducators.co.uk/">
        <img src="/assets/tech-ed-full-banner.png"></img>
      </a>

      <nav className="flex">
        <NavLink className="flex" to="/">
          Home
        </NavLink>
        <NavLink className="flex" to="/about">
          About This App
        </NavLink>
        <NavLink className="flex" to="/reviews">
          Reviews
        </NavLink>
        <NavLink className="flex" to="/submit">
          Tell us your story
        </NavLink>
      </nav>
    </header>
  );
}
