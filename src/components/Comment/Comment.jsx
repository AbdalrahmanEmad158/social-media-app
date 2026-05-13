import { Button, Spinner } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {formatDistanceToNow} from "date-fns" ;
import { Link } from 'react-router-dom'
import { RiDislikeLine } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import AddComment from '../AddComment/AddComment'
import useCommentReplies from '../../CustomHooks/useCommentReplies'
import ReplyComment from './ReplayComment'


export default function Comment({comment,setCommentToBeUbdated,activePostId,postownerId}) {

   const [showReplyInput, setShowReplyInput] = useState(false);
   console.log(showReplyInput , "showReplyInput from comment component")

    const {UserData} = useContext(AuthContext)

    const{content,createdAt,_id:CommentId,commentCreator,likes,parentComment,repliesCount} = comment||{}
    const img = comment.image
    const [likelength,setlikelength] = useState(likes?.length)
    useEffect(()=>{
      setlikelength(likes.length)
    },[likes.length])
    const {name, _id : commentCreatorId , photo} = commentCreator
 const QueryClient = useQueryClient()
 const[loadingdelete,setloadingdelete] = useState(false)

 const isPostOwner = UserData?._id === postownerId;

 const result = formatDistanceToNow(
      new Date(createdAt),
      {
        addSufix : true
      }
    )
   async function deleteComment ()
    {
       const token = localStorage.getItem('token'); 
    
    const headers = {
        Authorization: `Bearer ${token}`
    };
   setloadingdelete(true)
            try { 
                             
                             
                              const {data} = await axios.delete(`https://route-posts.routemisr.com/posts/${activePostId}/comments/${CommentId}`,{headers})
                           console.log(data , "delete Comment")
                          
                                QueryClient.invalidateQueries(["comments",activePostId]) 
                                   setloadingdelete(false)
                                 toast.success('Comment Deleted Successfully')
                       } 
                       catch (error) {
                          console.log(error , "error from delete Comment")
                          setloadingdelete(false)
                          toast.error('Error deleting comment')
                           throw error 
                       }
    }


    const isUserLiked = comment.likes.some(id => id === UserData?._id);
    
   async function handleLikebtn ()
   {
        const token = localStorage.getItem('token'); 
    
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        };
  try {
    
      const resp = await axios.put(`https://route-posts.routemisr.com/posts/${activePostId}/comments/${CommentId}/like`, {}, { headers }
      
    )
     console.log(resp)
      QueryClient.invalidateQueries(["comments",activePostId]) 
     setlikelength(resp.data.data.comment.likesCount)
     
     
     return resp
    
  } catch (error) {
    console.log(error)
    return error
  }
   }

   const {
  data: repliesData,
  isLoading: repliesLoading,
} = useCommentReplies(activePostId, CommentId);
const replies = repliesData?.data?.replies || [];

  return (
    <div className="w-full my-3">
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-md dark:shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl">
        
       
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
         <Link to={`/GetUserProfile/${commentCreatorId}`}>
          <img 
              className='w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600' 
              src={photo} 
              alt={name}
            />
         </Link>
           
            
          
            <div className="flex flex-col flex-1">
              <Link to={`/GetUserProfile/${commentCreatorId}`}>
              <p className='text-gray-900 dark:text-white font-semibold text-sm'>{name}</p>
            </Link>
              <p className='text-gray-500 dark:text-gray-400 text-xs font-normal'>{result}</p>
            </div>
          </div>
        </div>

   
        <div className="px-5 py-4">
          <p className='text-gray-800 dark:text-gray-100 text-base leading-relaxed font-normal'>{content}</p>
        </div>
{img && (
  <div className="px-5 pb-4">
    <div className="relative overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
      <img 
        src={img} 
        alt="comment attachment"
        className="w-full max-h-[450px] object-cover cursor-pointer hover:opacity-95 transition-opacity duration-200"
      
      />
    </div>
  </div>
)}

        <div>

        </div>

     <div className='flex justify-between items-center px-5 py-4 border-t border-gray-100 dark:border-gray-700'>
        <div className='flex gap-2'>
           <div className='flex gap-0.5'>
                 <button onClick={handleLikebtn} className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'>
                  {isUserLiked ? <FcLike size={24} /> : <RiDislikeLine size={24} />} 
                  <span className='text-sm font-medium hidden sm:inline'>Like</span> 
      
                </button>
                <button className='flex items-center gap-2 text-gray-600 
                dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400
                 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'>
                  {likelength}</button>
               </div>


               <div className='flex gap-0.5 items-center'>
                 <button className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 
                 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100
                  dark:hover:bg-[#3a3b3c]' onClick={()=>setShowReplyInput(!showReplyInput)}>
                  
                  <span className='text-sm font-medium  '>replay</span> 
      
                </button>
               <span className='text-sm font-medium'>{repliesCount}</span>
               </div>
        </div>
    {commentCreatorId === UserData?._id ? (
  <div className='flex gap-3 justify-end'>
    <Button 
      onClick={() => setCommentToBeUbdated(comment)}
      className='bg-[#1877f2] hover:bg-[#166fe5] dark:bg-[#1877f2] dark:hover:bg-[#166fe5] border-none text-white font-semibold text-sm py-2.5 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg'
    >
      Update
    </Button>

    <Button 
      disabled={loadingdelete} 
      onClick={deleteComment}
      className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 border-none text-white font-semibold text-sm py-2.5 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {loadingdelete ? (
        <>
          <Spinner size="sm" />
          <span>Deleting...</span>
        </>
      ) : (
        'Delete'
      )}
    </Button>
  </div>
) : (
  isPostOwner && (
    <div className='flex justify-end'>
      <Button 
        disabled={loadingdelete} 
        onClick={deleteComment}
        className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 border-none text-white font-semibold text-sm py-2.5 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loadingdelete ? (
          <>
            <Spinner size="sm" />
            <span>Deleting...</span>
          </>
        ) : (
          'Delete'
        )}
      </Button>
    </div>
  )
)}
        
     </div>
     
{showReplyInput && (
  <div className="mt-4 space-y-2">
    {repliesLoading ? (
      <p className="ml-12 text-xs">Loading replies...</p>
    ) : (
      replies.map((reply) => (
        <ReplyComment
          key={reply._id} 
          reply={reply} 
          activePostId={activePostId} 
          parentCommentId={CommentId}
          setCommentToBeUbdated={setCommentToBeUbdated}
          handleLikebtn={handleLikebtn}
       isPostOwner={isPostOwner}
        />
      ))
    )}
    
    <div className="ml-8 mt-2">
      <AddComment
        activePostId={activePostId}
        parentCommentId={CommentId}
        isReply={true}
      />
    </div>
  </div>
)}
       
      </div>
    </div>
  )
}