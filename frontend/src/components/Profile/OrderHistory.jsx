import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);
  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-full w-full">
          <Loader />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No order history
            </h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt=""
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="text-center">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="text-center">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="">Mode</h1>
            </div>
          </div>
          {orderHistory.map((book, i) => (
            <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
              <div className="w-[3%]">
                <h1 className="text-center">{i+1}</h1>
              </div>
              <div className="w-[22%]">
                  <Link to={`/view-book-details/${book.book._id}`} className="hover:text-blue-300">{book.book.title.slice(0,23)}...</Link>
              </div>
              <div className="w-[45%]">
                <h1 className="">{book.book.desc.slice(0,50)}...</h1>
              </div>
              <div className="w-[9%]">
                <h1 className="">₹{book.book.price}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold text-green-500">
                  {book.status === "Order Placed" ? (
                    <div>{book.status}</div>
                  ) : book.status === "cancelled" ? (
                    <div>{book.status}</div>
                  ) : book.status }
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderHistory;
