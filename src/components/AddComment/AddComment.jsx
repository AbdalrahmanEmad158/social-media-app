import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Spinner, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

export default function AddComment({activePostId,commentToBeUbdated,setCommentToBeUbdated,
   parentCommentId,
      isReply
}) {
    const[loadingUbdating,setloadingUbdating] = useState(false)
     const {handleSubmit,register , reset,setValue,getValues} = useForm(
            {
                defaultValues : {
                    content : "",
                    
                }
            }
        )

          const headers = {
     Authorization: `Bearer ${localStorage.getItem("token")}`
       };


      async  function hundleAddComment(values)
        {
                 console.log(values);
                 console.log(activePostId);


                const formData = new FormData()
    formData.append('content',values.content)
    if (parentCommentId) {
      console.log(parentCommentId , "parentCommentId from add comment component")
   try {
                    const {data} = await axios.post(`https://route-posts.routemisr.com/posts/${activePostId}/comments/${parentCommentId}/replies`,formData,{headers})
                 console.log(data , "from add Comment")
             
                 return data
             } catch (error) {
                console.log(error , "error from add Comment")
           
                 throw error 
             }
}
else{
             try {
                    const {data} = await axios.post(`https://route-posts.routemisr.com/posts/${activePostId}/comments`,formData,{headers})
                 console.log(data , "from add Comment")
             
                 return data
             } catch (error) {
                console.log(error , "error from add Comment")
                
                 throw error 
             }
             
        }
      }


          const QueryClient = useQueryClient()
               const {mutate,isPending} =  useMutation(
               {
                     mutationFn : hundleAddComment,
                     onSuccess : ()=>{
             
                      QueryClient.invalidateQueries(["comments",activePostId]) 
              
                      toast.success('Comment Added Successfully')
                          reset()
                      
                     },
                     onError : ()=>{
                       toast.error(isReply ? 'Error adding reply' : 'Error adding comment')
                     }
               }
        
            )

            useEffect(()=>
            {  if (commentToBeUbdated) {
                console.log(commentToBeUbdated.content)
                setValue("content", commentToBeUbdated.content)
            }

            },[commentToBeUbdated])



               async  function updateComment()
        {
             try { 
                setloadingUbdating(true)
                    const formData = new FormData()
                   formData.append('content',getValues().content)
                    const {data} = await axios.put(`https://route-posts.routemisr.com/posts/${activePostId}/comments/${commentToBeUbdated._id}`,formData,{headers})
                 console.log(data , "from updateeee Comment")
            
                      QueryClient.invalidateQueries(["comments",activePostId]) 
                      reset()
                       toast.success('Comment Updated Successfully')
             } 
             catch (error) {
                console.log(error , "error from updateee Comment")
                
                toast.error('Error updating comment')
                 throw error 
             }

             finally{
              setloadingUbdating(false)
              setCommentToBeUbdated(false)
             }
        }

  return (
    <form onSubmit={handleSubmit(mutate)} className='sticky bottom-0 z-40 w-full'>
      <div className="bg-white dark:bg-[#242526] border-t border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-2xl transition-all duration-300">
        
        <div className="p-4 sm:p-6 space-y-4">
          
         
          <div>
            <Textarea
              {...register("content")}
              placeholder="Add your comment..."
              rows={3}
              className="[&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-base [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-gray-300 dark:[&_textarea]:bg-[#3a3b3c] dark:[&_textarea]:border-gray-600 dark:[&_textarea]:text-white dark:[&_textarea]:placeholder-gray-400 [&_textarea]:resize-none [&_textarea]:font-normal [&_textarea]:transition-all [&_textarea]:duration-200 [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-blue-500 [&_textarea]:focus:border-transparent"
            />
          </div>

        
          <div className="flex gap-3 justify-end">
          {!commentToBeUbdated &&   <Button
              type="submit"
              disabled={isPending}
              className="bg-[#1877f2] hover:bg-[#166fe5] dark:bg-[#1877f2] dark:hover:bg-[#166fe5] border-none text-white font-semibold text-sm py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <Spinner size="sm" />
                  <span>Adding...</span>
                </>
              ) : (
                'Add Comment'
              )}
            </Button>}

            {commentToBeUbdated && (
              <Button
                type="button"
                disabled={loadingUbdating}
                onClick={updateComment}
                className="bg-[#31a24c] hover:bg-[#2a8f41] dark:bg-[#31a24c] dark:hover:bg-[#2a8f41] border-none text-white font-semibold text-sm py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loadingUbdating ? (
                  <>
                    <Spinner size="sm" />
                    <span>Updating...</span>
                  </>
                ) : (
                  'Update Comment'
                )}
              </Button>
            )}
          </div>

        </div>
      </div>
    </form>
  )
}