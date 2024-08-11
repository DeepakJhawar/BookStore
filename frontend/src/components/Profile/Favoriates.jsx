import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favoriates = () => {
  const [fav, setFav] = useState();

  useEffect(() => {
    const fetch = async () => {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.get(
        "http://localhost:4000/api/v1/get-favs",
        { headers }
      );
      console.log(response.data.data);
      setFav(response.data.data);
    };
    fetch();
  }, []);

  const removeBook = async (bookid) => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: bookid,
    };
    const response = await axios.put(
      "http://localhost:4000/api/v1/remove-book-from-favs",
      {},
      { headers }
    );
    setFav(fav.filter((item) => item._id !== bookid));
    alert(response.data.message);
  };
  return (
    <>
      {fav && fav.length === 0 && (
        <div className="text-5xl font-semibold text-zinc-500 flex items-center justify-center w-full h-full">
          No Favorite books
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {fav &&
          fav.map((item, i) => (
            <div key={i}>
              <BookCard book={item} favorite={true} handleRemoveBook={()=>removeBook(item._id)} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favoriates;
