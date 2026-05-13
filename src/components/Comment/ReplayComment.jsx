import React, { useState, useContext, useEffect } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { AuthContext } from '../Context/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from "date-fns";
import { RiDislikeLine } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import AddComment from '../AddComment/AddComment';

export default function ReplyComment({ reply, activePostId, parentCommentId, setCommentToBeUbdated, isPostOwner}) {
  const { UserData } = useContext(AuthContext);

  const [loadingDelete, setLoadingDelete] = useState(false);
  const queryClient = useQueryClient();

  const { content, createdAt, _id: replyId, commentCreator, likes } = reply;
   const [likelength,setlikelength] = useState(likes.length)
  const isUserLiked = likes?.some(id => id === UserData?._id);
  const img = reply?.image
  console.log(likelength , "likelength from reply comment component")

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });


  async function handleDelete() {
    const token = localStorage.getItem('token');
    setLoadingDelete(true);
    try {
      await axios.delete(`https://route-posts.routemisr.com/posts/${activePostId}/comments/${replyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      queryClient.invalidateQueries(["comments", activePostId]);
      toast.success('Reply deleted');
    } catch (error) {
      toast.error('Error deleting reply');
    } finally {
      setLoadingDelete(false);
    }
  }

  async function handleLikebtn ()
   {
        const token = localStorage.getItem('token'); 
    
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        };
  try {
    
      const resp = await axios.put(`https://route-posts.routemisr.com/posts/${activePostId}/comments/${replyId}/like`, {}, { headers }
      
    )
     console.log(resp)
      queryClient.invalidateQueries(["comments",activePostId]) 
     setlikelength(resp.data.data.likesCount)
     
     
     return resp
    
  } catch (error) {
    console.log(error)
    return error
  }
   }

  return (
    <div className="ml-8 mt-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
      <div className="flex items-center gap-2 mb-1">
        <img src={commentCreator?.photo} className="w-6 h-6 rounded-full" alt="" />
        <span className="text-sm font-bold dark:text-white">{commentCreator?.name}</span>
        <span className="text-xs text-gray-500">{timeAgo}</span>
      </div>
      
      <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#3a3b3c] p-2 rounded-lg">
        {content}
      </p>

     {img && (
  <div className="px-5 pb-4">
    <div className="relative  rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
      <img 
        src={img} 
        alt="comment attachment"
        className="w-full max-h-[450px] object-contain cursor-pointer hover:opacity-95 transition-opacity duration-200"
      
      />
    </div>
  </div>
)}

      <div className="flex gap-4 mt-1 text-xs items-center">
        <div className='flex gap-1 items-center'>
            <button onClick={handleLikebtn} className="hover:text-blue-500 flex items-center gap-1">
          {isUserLiked ? <FcLike /> : <RiDislikeLine />} Like
        </button>
        <span>{likelength}</span>
        </div>
        
       

        {commentCreator?._id === UserData?._id ? (
          <>
            <button onClick={() => setCommentToBeUbdated(reply)} className="text-blue-600">Update</button>
            <button onClick={handleDelete} className="text-red-500">
              {loadingDelete ? <Spinner size="xs" /> : 'Delete'}
            </button>
          </>
        ) : isPostOwner ? (
          <button onClick={handleDelete} className="text-red-500">
            {loadingDelete ? <Spinner size="xs" /> : 'Delete'}
          </button>
        ) : null}
      </div>

      
    </div>
  );
}