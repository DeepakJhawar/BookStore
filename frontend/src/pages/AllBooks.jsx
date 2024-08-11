import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/loader/Loader";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/get-all-books");
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); 
      }
    };
    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <h4 className="text-3xl text-yellow-100">All Books</h4>
      {error && <p className="text-red-500">Error fetching data</p>}
      {loading && <div className="h-[100vh] bg-zinc-900 flex items-center justify-center my-8"><Loader /></div>} 
      {!loading && data.length === 0 && <p>No books available</p>} 
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data.map((item) => (
          <div key={item._id}>
            <BookCard book={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
