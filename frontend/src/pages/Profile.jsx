import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    const fetch = async () => {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.get(
        "http://localhost:4000/api/v1/get-user-info",
        { headers }
      );
      setProfile(response.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-zinc-900 px-2 py-8 md:px-12 flex flex-col md:flex-row h-screen gap-4">
      {!profile && <div className="w-full h-full flex items-center justify-center"><Loader /></div>}
      {profile && (
        <>
          <div className="w-full lg:w-1/6 h-auto lg:h-full">
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full lg:w-5/6 overflow-x-hidden">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
