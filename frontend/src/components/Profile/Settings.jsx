import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/v1/get-user-info",
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    setIsLoading(false);
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };
  const submitAddress = async () => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await axios.put(
      "http://localhost:4000/api/v1/update-address",
      value,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {isloading && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profileData && (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div>
              <label>Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div>
              <label>Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label>Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
