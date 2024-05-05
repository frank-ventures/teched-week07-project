// --- --- --- --- --- --- --- --- --- --- --- ---
// Import React Router things
// --- --- --- --- --- --- --- --- --- --- --- ---
import { Routes, Route } from "react-router-dom";
// --- --- --- --- --- --- --- --- --- --- --- ---
// Import some components and pages
// --- --- --- --- --- --- --- --- --- --- --- ---
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import {
  ReviewsAll,
  ReviewsByCategory,
  ReviewsByRelationship,
  ReviewsByUser,
  ReviewsPage
} from "./pages/ReviewsPage";
import { SubmitPage } from "./pages/SubmitPage";

// --- --- --- --- --- --- --- --- --- --- --- ---
// Main App
// --- --- --- --- --- --- --- --- --- --- --- ---
export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/reviews" element={<ReviewsPage />}>
          <Route path="" element={<p>Pick an option from above</p>}></Route>
          <Route path="all" element={<ReviewsAll />}></Route>
          <Route path="category" element={<ReviewsByCategory />}></Route>
          <Route
            path="relationship"
            element={<ReviewsByRelationship />}
          ></Route>
          <Route path="user" element={<ReviewsByUser />}></Route>
        </Route>
        <Route path="/submit" element={<SubmitPage />}></Route>
      </Routes>
    </>
  );
}
// export const fetchUrl = "https://teched-week07-project.onrender.com";
export const fetchUrl = "http://localhost:8080";
