import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/get-book-by-id/${id}`
        );
        console.log(response.data.data);
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavorites = async () => {
    const response = await axios.put(
      "http://localhost:4000/api/v1/add-book-to-favs",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async ()=>{
    const response = await axios.put(
      "http://localhost:4000/api/v1/add-to-cart",
      {},
      { headers }
    ); 
    alert(response.data.message);
  }
  const deleteBook = async()=>{
    const res = await axios.delete("http://localhost:4000/api/v1/delete", {headers});
    alert(res.data.message);
    navigate("/all-books")
  }
  return (
    <>
      {error && <p className="text-red-500">Error fetching data</p>}
      {loading && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && data.length === 0 && <p>No books available</p>}
      {data && (
        <div className="px-8 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/6">
            <div className=" flex flex-col lg:flex-row justify-around bg-zinc-800 px-4 py-12 rounded">
              <img
                src={data.url}
                alt="book pic"
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded "
                style={{ maxHeight: "100%", objectFit: "contain" }}
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-around lg:justify-start mt-4 lg:mt-0">
                  <button
                    className="bg-white rounded lg:rounded-full text-3xl p-2 text-red-600 flex items-center justify-center"
                    onClick={handleFavorites}
                  >
                    <FaHeart />
                    <span className="ms-4 lg:hidden ">Favorites</span>
                  </button>
                  <button
                    className="text-white rounded lg:rounded-full text-3xl p-2 mt-8 md:mt-0 lg:mt-8 bg-blue-500 flex items-center justify-center"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-4 lg:hidden ">Add to cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-around lg:justify-start mt-4 lg:mt-0">
                  <Link to={`/update-book/${id}`} className="bg-white rounded lg:rounded-full text-3xl p-2 flex items-center justify-center">
                    <FaEdit />
                    <span className="ms-4 lg:hidden ">Edit</span>
                  </Link>
                  <button className="text-red-500 rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 bg-white flex items-center justify-center" onClick={deleteBook}>
                    <DeleteOutlineIcon />
                    <span className="ms-4 lg:hidden ">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6 overflow-y-auto h-[85vh]">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" />
              {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price: ₹{data.price}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
