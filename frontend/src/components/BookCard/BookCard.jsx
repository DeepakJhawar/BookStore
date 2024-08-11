import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book, favorite, handleRemoveBook }) => {  
  return (
    <div>
      <Link to={`/view-book-details/${book._id}`}>
        <div className="p-4 bg-zinc-800 rounded flex flex-col h-[40vh]">
          <div className="bg-zinc-900 rounded flex items-center justify-center h-2/3">
            <img
              src={book.url}
              alt={book.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="mt-4 text-zinc-200 flex flex-col justify-between h-1/3">
            <h2 className="text-xl font-semibold truncate">{book.title}</h2>
            <p className="text-zinc-400 font-semibold truncate">
              by {book.author}
            </p>
            <p className="text-xl font-semibold">₹{book.price}</p>
          </div>
        </div>
      </Link>
      {favorite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4 w-full"
          onClick={handleRemoveBook}
        >
          Remove from Favorites
        </button>
      )}
    </div>
  );
};

export default BookCard;
