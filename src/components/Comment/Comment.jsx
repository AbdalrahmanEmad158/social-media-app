import { Button, Spinner } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {formatDistanceToNow} from "date-fns" ;

export default function Comment({comment,setCommentToBeUbdated,activePostId}) {

   

    const {UserData} = useContext(AuthContext)

    const{content,createdAt,_id:CommentId,commentCreator} = comment
    const {name, _id : commentCreatorId , photo} = commentCreator
 const QueryClient = useQueryClient()
 const[loadingdelete,setloadingdelete] = useState(false)

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
  return (
    <div className="w-full my-3">
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-md dark:shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl">
        
       
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
         
            <img 
              className='w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600' 
              src={photo} 
              alt={name}
            />
            
          
            <div className="flex flex-col flex-1">
              <p className='text-gray-900 dark:text-white font-semibold text-sm'>{name}</p>
              <p className='text-gray-500 dark:text-gray-400 text-xs font-normal'>{result}</p>
            </div>
          </div>
        </div>

   
        <div className="px-5 py-4">
          <p className='text-gray-800 dark:text-gray-100 text-base leading-relaxed font-normal'>{content}</p>
        </div>

     
        {commentCreatorId === UserData?._id && (
          <div className='px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex gap-3 justify-end'>
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
        )}
      </div>
    </div>
  )
}