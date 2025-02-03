// "use client"
// import React, { useContext, useEffect, useState } from 'react';
// import { useConvex } from 'convex/react';
// import { UserContext } from '../../context/UserContext';
// import { api } from '../../../convex/_generated/api';
// import Image from 'next/image';
// import { Loader2Icon } from 'lucide-react';

// import { PencilIcon } from 'react-icons/hi'; 


// function Profile() {
//   const { user } = useContext(UserContext);
//   const convex = useConvex();
//   const [mostSearchedTopics, setMostSearchedTopics] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMostSearchedTopics = async () => {
//       if (user) {
//         setLoading(true);
//         try {
//           const result = await convex.query(api.user.GetMostSearchedTopics, {
//             userId: user?._id,
//           });
//           setMostSearchedTopics(result);
//         } catch (error) {
//           console.error('Error fetching most searched topics:', error);
//         }
//         setLoading(false);
//       }
//     };
//     fetchMostSearchedTopics();
//   }, [user]);

//   return (
//      <div className="p-6 max-w-lg mx-auto bg-gray-900 text-white rounded-lg shadow-md">
      
//       {user ? (
//         <div className="flex flex-col items-center text-center">
//           <Image
//             src={user?.image || '/default-avatar.png'}
//             alt="User Profile"
//             width={100}
//             height={100}
//             className="rounded-full"
//           />
//           <h2 className="text-2xl font-bold mt-3">{user?.name}</h2>
//           <p className="text-gray-400">{user?.email}</p>
//           <p className="text-gray-400">{user?.phone || 'No phone number available'}</p>
          
//           <div className="mt-5 w-full">
//             <h3 className="text-lg font-semibold mb-2">Most Searched Topics</h3>
//             {loading ? (
//               <div className="flex justify-center items-center">
//                 <Loader2Icon className="animate-spin" /> Loading...
//               </div>
//             ) : (
//               <ul className="text-gray-300">
//                 {mostSearchedTopics.length > 0 ? (
//                   mostSearchedTopics.map((topic, index) => (
//                     <li key={index} className="p-2 bg-gray-800 rounded-md mb-2">
//                       {topic}
//                     </li>
//                   ))
//                 ) : (
//                   <p>No recent searches found</p>
//                 )}
//               </ul>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-red-500">Please log in to view your profile</p>
//       )}
//     </div>
//   );
// }

// export default Profile;




// "use client";

// import { useState, useEffect, useContext } from 'react';
// import { useConvex } from 'convex/react'; // Assuming you're using convex for data fetching
// import { PencilIcon, SaveIcon } from 'react-icons/hi'; // Ensure these icons are installed
// import Image from 'next/image'; // Assuming you're using Next.js for image rendering
// import Loader2Icon from 'react-icons/fi'; // Adjust based on your loader icon
// import { UserContext } from '../../context/UserContext';
// import { Button } from '../../../components/ui/button';

// function Profile() {
//   const { user, setUser } = useContext(UserContext);  // Ensure setUser is available
//   const convex = useConvex();
//   const [mostSearchedTopics, setMostSearchedTopics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);  // Set to false initially for viewing
//   const [phone, setPhone] = useState(user?.phone || "");  // Initialize with an empty string or existing phone

//   useEffect(() => {
//     const fetchMostSearchedTopics = async () => {
//       if (user) {
//         setLoading(true);
//         try {
//           const result = await convex.query(api.user.GetMostSearchedTopics, {
//             userId: user?._id,
//           });
//           setMostSearchedTopics(result);
//         } catch (error) {
//           console.error("Error fetching most searched topics:", error);
//         }
//         setLoading(false);
//       }
//     };
//     fetchMostSearchedTopics();
//   }, [user]);

//   const handleSavePhone = async () => {
//     try {
//       await convex.mutation(api.user.UpdateUser, {
//         userId: user?._id,
//         phone: phone.trim() !== "" ? phone : undefined,  // Only update if not empty
//       });

//       // Update phone number in global UserContext
//       setUser((prevUser) => ({
//         ...prevUser,
//         phone: phone.trim() !== "" ? phone : undefined,
//       }));

//       setEditing(false);  // Exit edit mode after saving
//     } catch (error) {
//       console.error("Error updating phone number:", error);
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white">
//       {user ? (
//         <div className="w-[85vw] max-w-3xl bg-gray-800 p-10 rounded-lg shadow-lg flex flex-col items-center text-center">
//           {/* Ensure fallback to default image */}
//           <Image
//             src={user?.image || "/default-avatar.png"}  // Fallback to default avatar if user image is unavailable
//             alt="User Profile"
//             width={150}
//             height={150}
//             className="rounded-full border-4 border-gray-700"
//           />
//           <h2 className="text-4xl font-bold mt-4">{user?.name}</h2>
//           <p className="text-gray-400 text-lg">{user?.email}</p>

//           {/* Editable Phone Number Section */}
//           <div className="flex items-center gap-3 mt-4">
//             {editing ? (
//               <>
//                 <input
//                   type="text"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="p-2 rounded-md text-black border border-gray-500"
//                   placeholder="Enter phone number"
//                 />
//                 <Button
//                   onClick={handleSavePhone}
//                   className="bg-green-600 p-2 rounded-md hover:bg-green-700"
//                 >
//                   {/* <SaveIcon size={20} /> */}
//                 </Button>
//               </>
//             ) : (
//               <div>
//                 <p className="text-gray-400">
//                   {phone ? phone : "No phone number available"}
//                 </p>
//                 <Button
//                   onClick={() => setEditing(true)}
//                   className="bg-yellow-600 p-3 rounded-full hover:bg-red-700"
//                 >
//                   <PencilIcon size={24} className="text-white" />
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* Additional Content (e.g., most searched topics) */}
//           <div className="mt-6 w-full">
//             <h3 className="text-2xl font-semibold mb-4">Most Searched Topics</h3>
//             {loading ? (
//               <div className="flex justify-center items-center text-lg">
//                 <Loader2Icon className="animate-spin mr-2" /> Loading...
//               </div>
//             ) : (
//               <ul className="text-gray-300 space-y-3">
//                 {mostSearchedTopics.length > 0 ? (
//                   mostSearchedTopics.map((topic, index) => (
//                     <li key={index} className="p-4 bg-gray-700 rounded-md text-lg">
//                       {topic}
//                     </li>
//                   ))
//                 ) : (
//                   <p className="text-gray-400 text-lg">No recent searches found</p>
//                 )}
//               </ul>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-red-500 text-2xl">Please log in to view your profile</p>
//       )}
//     </div>
//   );
// }

// export default Profile;















// "use client";

// import { useState, useContext } from "react";
// import { useConvex } from "convex/react";
// import Image from "next/image";

// import { UserContext } from "../../context/UserContext";
// import { api } from "../../../convex/_generated/api";

// function Profile() {
//   const { user, setUser } = useContext(UserContext);
//   const convex = useConvex();
//   const [editing, setEditing] = useState(false); // Set to false initially for viewing
//   const [loading, setLoading] = useState(true);

//   const [phone, setPhone] = useState(user?.phone || "");

//   // const handleSavePhone = async () => {
//   //   try {
//   //     await convex.mutation(api.user.UpdateUser, {
//   //       userId: user?._id,
//   //       phone: phone.trim() !== "" ? phone : undefined,
//   //     });

//   //     setUser((prevUser) => ({
//   //       ...prevUser,
//   //       phone: phone.trim() !== "" ? phone : undefined,
//   //     }));
//   //   } catch (error) {
//   //     console.error("Error updating phone number:", error);
//   //   }
//   // };


//   const handleSavePhone = async () => {
//     try {
//       await convex.mutation(api.user.UpdateUser, {
//         userId: user?._id,
//         phone: phone.trim() !== "" ? phone : undefined, // Only include phone if not empty
//         image: user?.image || "", // Make sure image is passed if it exists
//         name: user?.name || "", // Make sure name is passed if it exists
//       });
  
//       setUser((prevUser) => ({
//         ...prevUser,
//         phone: phone.trim() !== "" ? phone : undefined,
//       }));
  
//     } catch (error) {
//       console.error("Error updating phone number:", error);
//     }
//   };
  

//   return (
//     <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white">
//       {user ? (
//         <div className="w-[85vw] max-w-3xl bg-gray-800 p-10 rounded-lg shadow-lg flex flex-col items-center text-center">
//           <Image
//             src={user?.image || null}
//             alt="User Profile"
//             width={150}
//             height={150}
//             className="rounded-full border-4 border-gray-700"
//           />
//           <h2 className="text-4xl font-bold mt-4">{user?.name}</h2>
//           <p className="text-gray-400 text-lg">{user?.email}</p>

//           <div className="flex items-center gap-3 mt-4">
//             {editing ? (
//               <>
//                 <input
//                   type="text"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="p-2 rounded-md text-black border border-gray-500 color-white"
//                   placeholder="Enter phone number"
//                 />
//                 <button
//                   onClick={handleSavePhone}
//                   className="bg-green-600 p-2 rounded-md hover:bg-green-700"
//                 >
//                   Save
//                 </button>
//               </>
//             ) : (
//               <div>
//                 <p className="text-gray-400">
//                   {phone ? phone : "No"}
//                 </p>
//                 <button
//                   onClick={() => setEditing(true)}
//                   className="bg-yellow-600 p-3 rounded-full hover:bg-red-700"
//                 >
//                   Edit
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-red-500 text-2xl">Please log in to view your profile</p>
//       )}
//     </div>
//   );
// }

// export default Profile;









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

  const [phone, setPhone] = useState(user?.phone || "");

  // Fetch updated user info after saving the phone number
  useEffect(() => {
    if (user?.phone) {
      setPhone(user.phone);
    }
  }, [user]);

  const handleSavePhone = async () => {
    try {
      await convex.mutation(api.user.UpdateUser, {
        userId: user?._id,
        phone: phone.trim() !== "" ? phone : undefined, // Only include phone if not empty
        image: user?.image || "",
        name: user?.name || "",
      });

      // Update context with the new phone number
      setUser((prevUser) => ({
        ...prevUser,
        phone: phone.trim() !== "" ? phone : undefined,
      }));

      // Set editing to false after saving
      setEditing(false);
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
  };

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
            {editing ? (
              <>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2 rounded-md text-white border border-gray-500 color-green"
                  placeholder="Enter phone number"
                />
                <button
                  onClick={handleSavePhone}
                  className="bg-green-600 p-2 rounded-md hover:bg-green-700"
                >
                  Save
                </button>
              </>
            ) : (
              <div>
                <p className="text-gray-400">
                  {phone ? phone : "No phone number"}
                </p>
                <button
                  onClick={() => setEditing(true)}
                  className="bg-yellow-600 p-3 rounded-full hover:bg-red-700"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      
      ) : (
        <p className="text-center text-red-500 text-2xl">Please log in to view your profile</p>
      )}
    </div>
  );
}

export default Profile;
