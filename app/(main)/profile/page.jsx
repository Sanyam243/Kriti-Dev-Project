



"use client"

import { useState, useContext, useEffect } from "react";
import { useConvex } from "convex/react";
import Image from "next/image";

import { UserContext } from "../../context/UserContext";
import { api } from "../../../convex/_generated/api";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const convex = useConvex();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);




  

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white">
      {user ? (

        <div className="w-[85vw] max-w-3xl bg-gray-800 p-10 rounded-lg shadow-lg flex flex-col items-center text-center">
         
         <h2 className="text-5xl font-bold italic text-green-500">Profile Page</h2>

          <Image
            src={user?.image || null}
            alt="User Profile"
            width={150}
            height={150}
            className="rounded-full border-4 border-gray-700"
          />
          <h2 className="text-4xl font-bold mt-4">{user?.name}</h2>
          <p className="text-gray-400 text-lg">{user?.email}</p>

          <div className="flex items-center gap-3 mt-4">
           
          </div>
        </div>
      
      ) : (
        <p className="text-center text-red-500 text-2xl">Please log in to view your profile</p>
      )}
    </div>
  );
}

export default Profile;
