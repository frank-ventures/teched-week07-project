import { createContext, useState, useEffect } from "react";
import { fetchUrl } from "./App";
import { useSearchParams } from "react-router-dom";

export const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  const [option, setOption] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "";
  // Form for "search by user"
  const [form, setForm] = useState("");

  const handleSearch = (event) => {
    // These next couple of bits allow us to extract the text from the users selection.
    const selectedIndex = event.target.selectedIndex;
    console.log(event.target.selectedIndex);
    setOption(event.target.options[selectedIndex].text);
    console.log(event.target.options[selectedIndex]);
    console.log(event.target.options[selectedIndex].text);

    setSearchParams({ sort: event.target.value });
    console.log("sort has been set to- ", sort);
  };

  //   useEffect(() => {
  //     getAllReviews();
  //   }, []);

  async function getAllReviews() {
    setLoading(true);
    console.log("sort is ", sort);
    console.log(`${fetchUrl}/reviews?${sortBy}=${sort}`);
    //Example: http://localhost:8080/reviews?category=5
    const response = await fetch(`${fetchUrl}/reviews?${sortBy}=${sort}`);
    const data = await response.json();
    setReviews(data.reverse());
    setLoading(false);
  }

  async function getReviewsByUser() {
    console.log("getreviewscalled");
    setLoading(true);
    const response = await fetch(
      `${fetchUrl}/reviews?${sortBy}=${form.userSearch}`
    );
    const data = await response.json();
    setReviews(data.reverse());
    setLoading(false);
  }

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        loading,
        sort,
        sortBy,
        searchParams,
        option,
        form,
        setOption,
        setLoading,
        setSortBy,
        setSearchParams,
        getAllReviews,
        handleSearch,
        getReviewsByUser,
        setForm
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}
