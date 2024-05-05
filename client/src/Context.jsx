import { createContext, useState, useEffect } from "react";
import { fetchUrl } from "./App";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [param, setParam] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getAllReviews();
  }, []);

  async function getAllReviews() {
    setLoading(true);
    const response = await fetch(`${fetchUrl}/reviews${param}${sort}`);
    const data = await response.json();
    setReviews(data.reverse());
    setLoading(false);
  }

  return (
    <ReviewsContext.Provider value={{ reviews, loading, getAllReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsContext;
