import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "flowbite-react";
import React, { use, useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";

export default function ProfileUserDetails({UserData,profilePostslength}) {
    console.log(UserData, "UserData from ProfileUserDetails")
    const{_id,cover,email,name,photo,followersCount,followingCount,bookmarksCount}=UserData || {}

    const QueryClient = useQueryClient()
    const{UserData:MyData} = useContext(AuthContext) || {}
     const IamFollwing = UserData?.followers.some((follower) => follower._id === MyData?._id
        );
console.log(IamFollwing, "IamFollwing from ProfileUserDetails")
async function HandleFollwing() {
   
  
  
 try {
      const token = localStorage.getItem('token'); 
    
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        };
    const { data } = await axios.put(`https://route-posts.routemisr.com/users/${_id}/follow`,_id, { headers });
   console.log(data, "data from follow user");
  QueryClient.invalidateQueries(["userData", _id]);

  
  } catch (error) {
    console.error("Error in follow", error);
  }
}


    function StatCard({ title, value }) {
  return (
    <div className="w-1/2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl px-6 py-4 text-center transition-colors">
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
        {title}
      </p>
      <p className="text-xl font-bold text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function SmallCard({ title, value }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-5 transition-colors">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  );

}
 return (
    <div>
       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center py-10 transition-colors duration-300">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-black/40 overflow-hidden transition-colors duration-300">

       
        <div className="relative h-56">
          <img
              src={photo}
            alt="cover"
            className="w-full h-full object-cover"
          />

        
          <div className="absolute -bottom-12 left-10 ">
            <img
              src={photo}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 shadow-md object-cover"
           />
             
          </div>
        </div>

        <div className="px-10 pt-16 pb-10">

     
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

          
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {email}
              </p>

              <span className="inline-block mt-3 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full">
                Route Posts member
              </span>
            </div>

          
            <div className="flex gap-4 flex-col md:flex-row">
              <StatCard title="Followers" value={followersCount} />
              <StatCard title="Following" value={followingCount} />
             
            </div>
          </div>

       
          <div className="grid md:grid-cols-3 gap-6 mt-8">

     
            <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 transition-colors">
              <h3 className="font-semibold text-gray-700 dark:text-white mb-4">
                About
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {email}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                👥 Active on Route Posts
              </p>
            </div>

          
            <div className="flex flex-col gap-4">
              <SmallCard title="My Posts" value={profilePostslength} />
              <SmallCard title="Saved Posts" value={bookmarksCount} />
            </div>

          </div>
         
    <div className="mt-8">
       <Button
  onClick={HandleFollwing}
  className={`
    transition-all duration-300 shadow-sm font-bold cursor-pointer
    ${IamFollwing 
      ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800" 
      : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-blue-200 dark:shadow-none"
    }
  `}
>
  <div className="flex items-center gap-2">
    {IamFollwing ? (
      <>
        <HiUserRemove className="text-xl" />
        <span>Unfollow -</span>
      </>
    ) : (
      <>
        <HiUserAdd className="text-xl" />
        <span>Follow +</span>
      </>
    )}
  </div>
</Button>
    </div>
        </div>
      </div>
    </div>
    </div>
  )
}
