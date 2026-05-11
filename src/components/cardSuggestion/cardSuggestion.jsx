import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import usePosts from "../../CustomHooks/usePosts";
import { useQueryClient } from "@tanstack/react-query";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { Button } from "flowbite-react";
import axios from "axios";

export default function SuggestionCard({ user }) {
  const navigate = useNavigate();


  const {data:data2 ,isLoading:isLoading2, isFetched:isFetched2,isFetching:isFetching2,isError:isError2} = usePosts(['suggestionsCardFollow',`${user._id}`],Boolean(`${user._id}`),`users/${user._id}/profile` )
         console.log(data2, "Data frommmm cardSugggestion")
       
         const UserData = data2?.data?.user
         console.log(UserData, "UserData from GetUserProfile")
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
    const { data } = await axios.put(`https://route-posts.routemisr.com/users/${UserData._id}/follow`,UserData._id, { headers });
   console.log(data, "data from follow user in card suggestion");
  QueryClient.invalidateQueries(['suggestionsCardFollow',_id]);
  QueryClient.invalidateQueries(['FeedFollowingPosts']);

  
  } catch (error) {
    console.error("Error in follow", error);
  }
}

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl 
      bg-white dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700
      shadow-sm hover:shadow-md transition">

      <div className="flex items-center gap-3">
      <Link to={`/GetUserProfile/${user?._id}`}>
        <div className="relative">
          <img
            src={user.photo}
            alt=""
            className="w-14 h-14 rounded-xl object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div></Link>

        <div>
           <Link to={`/GetUserProfile/${user?._id}`}>
           <h4 className="font-semibold text-gray-800 dark:text-gray-100">
            {user.name}
          </h4>
         </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{user.username}
          </p>

          <div className="flex gap-2 mt-1 text-xs">
            <span className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded-lg">
              {user.followersCount} followers
            </span>
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-lg">
              {user.mutualFollowersCount} mutual
            </span>
          </div>
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
  );
}