import { useEffect, useState } from "react";
import SuggestionCard from "../cardSuggestion/cardSuggestion";
import useSuggestions from "../../CustomHooks/useSuggestion";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export default function SuggestionsList() {
  const navigate=useNavigate();
      const [search, setSearch] = useState("");

  const { data ,isLoading,} = useSuggestions(search,3);

const users = data?.pages?.[0]?.data?.suggestions || [];

useEffect(() => {
  console.log(search, 'search from SuggestionsList');
}, [search]);
  console.log(users, 'users from SuggestionsList');

  return (
    <div className="p-4 rounded-2xl 
      bg-gray-50 dark:bg-gray-900 
      border border-gray-200 dark:border-gray-700">

      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
          Suggested Friends
        </h3>

        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
          {users.length}
        </span>
      </div>

      {/* search */}
      <input
        type="text"
        placeholder="Search friends..."
        className="w-full mb-4 p-2 rounded-xl 
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        text-gray-800 dark:text-gray-100
        outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      {/* list */}
      <div className="flex flex-col gap-3">
           {isLoading && (
                    <div className="col-span-2 flex items-center justify-center py-10 text-sm font-bold text-gray-500">
                      <FaSpinner className="animate-spin mr-2" /> Loading suggestions...
                    </div>
                  )}
                  {!isLoading && users.length === 0 && (
                    <div className="col-span-2 flex items-center justify-center py-10 text-sm font-bold text-gray-500">
                      No users matched your search.
                    </div>
                  )}
        {users.map((user) => (
          <SuggestionCard key={user.id} user={user} />
        ))}
      </div>

      {/* button */}
      <button className="w-full mt-4 py-2 rounded-xl 
        border border-gray-200 dark:border-gray-700 
        text-gray-600 dark:text-gray-300 
        hover:bg-gray-100 dark:hover:bg-gray-800 transition"
         onClick={()=>navigate('/SuggestionsPage')}>
         
        View more
      </button>
    </div>
  );
}