import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCommentReplies(activePostId, commentId) {
  const token = localStorage.getItem("token");

  async function getReplies() {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/posts/${activePostId}/comments/${commentId}/replies?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data, "replies data");

    return data;
  }

  return useQuery({
    queryKey: ["replies", commentId],
    queryFn: getReplies,
    enabled: !!commentId,
  });
}