import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../../components/BookCard/BookCard";
import Loader from "../../components/loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/get-recent-books");
        setData(response.data.data);
        console.log(response.data.data)
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
      {error && <p className="text-red-500">Error fetching data</p>}
      {!data && <div className="flex items-center justify-center my-8"><Loader /></div>}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div key={item._id}>
              <BookCard book={item} />
            </div>
          ))
        ) : (
          <p>No recently added books</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
