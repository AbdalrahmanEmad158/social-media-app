import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useSuggestions(search, limit) {
  const fetchSuggestions = async ({ pageParam = 1 }) => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      `https://route-posts.routemisr.com/users/suggestions?limit=${limit}&page=${pageParam}${search ? `&q=${search}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data, 'data from useSuggestions');

    return data;
  };

  return useInfiniteQuery({
    queryKey: ["suggestions", search, limit],
    queryFn: fetchSuggestions,
    getNextPageParam: (lastPage) =>
      lastPage?.meta?.pagination?.nextPage ?? undefined,
  });
}