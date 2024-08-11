import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import UserData from "./UserData";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState();
  const [option, setOption] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.get(
        "http://localhost:4000/api/v1/get-all-orders",
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const id = allOrders[i]._id;
    await axios.put(
      `http://localhost:4000/api/v1/update-status/${id}`,
      values,
      { headers }
    );
    const updatedOrders = [...allOrders];
    updatedOrders[i].status = values.status;
    setAllOrders(updatedOrders);
  };

  return (
    <>
      {!allOrders && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {allOrders && allOrders.length > 0 && (
        <>
          <div className="h-full p-0 md:p-4 text-zinc-100">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
              All Orders
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
                <h1 className="">
                  <FaUserLarge />
                </h1>
              </div>
            </div>
            {allOrders &&
              allOrders.map((items, i) => (
                <div
                  key={i}
                  className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-200"
                >
                  <div className="w-[3%]">
                    <h1 className="text-center">{i + 1}</h1>
                  </div>
                  <div className="w-[22%]">
                    <Link
                      to={`/view-book-details/${items.book._id}`}
                      className="hover:text-blue-300"
                    >
                      {items.book.title.slice(0, 23)}...
                    </Link>
                  </div>
                  <div className="w-[45%]">
                    <h1 className="">{items.book.desc.slice(0, 50)}...</h1>
                  </div>
                  <div className="w-[9%]">
                    <h1 className="">₹{items.book.price}</h1>
                  </div>
                  <div className="w-[16%]">
                    <h1 className="font-semibold">
                      <button
                        className="hover:scale-105 transition-all duration-300"
                        onClick={() => setOption(i)}
                      >
                        {items.status === "Order Placed" ? (
                          <div className="text-yellow-500">{items.status}</div>
                        ) : items.status === "Cancelled" ? (
                          <div className="text-red-500">{items.status}</div>
                        ) : (
                          <div className="text-green-500">{items.status}</div>
                        )}
                      </button>
                      {option === i && (
                        <div
                          className={`${
                            option === i ? "block" : "hidden"
                          } flex mt-4`}
                        >
                          <select
                            name="status"
                            className="bg-gray-800"
                            onChange={change}
                            value={values.status}
                          >
                            {[
                              "Order Placed",
                              "Out for Delivery",
                              "Delivered",
                              "Cancelled",
                            ].map((item, i) => (
                              <option key={i} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                          <button
                            className="text-green-500 hover:text-pink-600 mx-2"
                            onClick={() => {
                              setOption(-1);
                              submitChanges(i);
                            }}
                          >
                            <FaCheck />
                          </button>
                        </div>
                      )}
                    </h1>
                  </div>
                  <div className="w-[10%] md:w-[5%]">
                   <button className="text-xl hover:text-orange-500" onClick={()=>{setUserDiv("fixed"); setUserDivData(items.user)}}><IoOpenOutline /></button>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
      {userDivData && (
        <UserData userDivData={userDivData} userDiv={userDiv} setUserDiv={setUserDiv} />
      )}
    </>
  );
};

export default AllOrders;
