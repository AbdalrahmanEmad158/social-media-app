import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Spinner, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaImage } from 'react-icons/fa'


export default function AddPost({PostToBeUbdated}) {
  const[loadingUpdatingPost,setloadingUpdatingPost] = useState()
  const [imagePreview, setImagePreview] = useState(null)
  const token = localStorage.getItem('token'); 
    
     const headers = {
     Authorization: `Bearer ${localStorage.getItem("token")}`
       };
    const {handleSubmit,register,setValue,getValues,reset} = useForm(
        {
            defaultValues : {
                body : "",
                image : null
            }
        }
    )

      const QueryClient = useQueryClient()
       const {mutate,isPending} =  useMutation(
       {
             mutationFn : addPost,
             onSuccess : ()=>{
     
              QueryClient.invalidateQueries(["allPosts","userPosts"]) 
            //  QueryClient.invalidateQueries(["userPosts"]) 
              toast.success('Post Added Successfully')
             },
             onError : ()=>{
    
        
             }
       }

    )
async function addPost(value)
{
    

    console.log(value)
    const formData = new FormData()
    formData.append('body',value.body)
     if (value.image && value.image.length > 0) {
        formData.append('image',value.image[0])
        console.log(value.image[0],"img frpm add post")
     }
   try {
     const response =await axios.post("https://route-posts.routemisr.com/posts",formData, {headers}
    )
    console.log(response)
    reset()
    setImagePreview(null)
    return response
   } catch (error) {
    console.log(error)
    
   }
}

   useEffect(()=>
            {  if (PostToBeUbdated) {
                console.log(PostToBeUbdated.body)
                setValue("body", PostToBeUbdated.body)
                   setImagePreview(PostToBeUbdated.image)
                 console.log(PostToBeUbdated.image,"img from useEffect update 1")
            }

            },[PostToBeUbdated])

          async function updatePost()
            {
                  try { 
                                setloadingUpdatingPost(true)
                                    const formData = new FormData()
                                   formData.append('body',getValues().body)
                                   if (getValues().image && getValues().image.length > 0) {
                                   formData.append('image',getValues().image[0])
                                    console.log(getValues().image[0],"img from update post update 2   if")
     }
    

                                    const {data} = await axios.put(`https://route-posts.routemisr.com/posts/${PostToBeUbdated.id}`,formData,{headers})
                                 console.log(data , "from updateeee Post")
                                setloadingUpdatingPost(false)
                                      QueryClient.invalidateQueries(["userPosts"]) 
                                      QueryClient.invalidateQueries(["allPosts"]) 
                                      reset()
                                       toast.success('Post Ubdated Successfully')
                                       reset()
                             } 
                             catch (error) {
                                console.log(error , "error from updateee Post")
                                 throw error 
                             }
            }

  return (
    <div className="w-full my-5">
      <div className="bg-white dark:bg-[#242526] rounded-2xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300">
        
        <form onSubmit={handleSubmit(mutate)} className="p-6 sm:p-8 space-y-5">
          
        
          <div>
            <Textarea
              {...register('body')}
              placeholder="What's on your mind?"
              rows={5}
              className="[&_textarea]:px-4 [&_textarea]:py-3.5 [&_textarea]:text-base [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-gray-300 dark:[&_textarea]:bg-[#3a3b3c] dark:[&_textarea]:border-gray-600 dark:[&_textarea]:text-white dark:[&_textarea]:placeholder-gray-400 [&_textarea]:resize-none [&_textarea]:font-normal [&_textarea]:transition-all [&_textarea]:duration-200 [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-blue-500 [&_textarea]:focus:border-transparent"
            />
          </div>

         
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="preview"
                className="w-full max-h-96 object-contain rounded-xl border border-gray-200 dark:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors duration-200 shadow-lg"
                title="Remove image"
              >
                ✕
              </button>
            </div>
          )}

       
          <div>
            <input
              type="file"
              id="postImg"
              {...register("image")}
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  setImagePreview(URL.createObjectURL(file))
                }
              }}
            
              accept="image/*"
            />
            <label
              htmlFor="postImg"
              className="flex items-center justify-center gap-3 w-full px-4 py-4 border-2 border-dashed border-blue-400 dark:border-blue-500 rounded-lg bg-blue-50 dark:bg-[#3a3b3c] hover:bg-blue-100 dark:hover:bg-[#3a3b3c]/80 cursor-pointer transition-all duration-200"
            >
              <FaImage size={24} className="text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                Click to add image
              </span>
            </label>
          </div>

        
          <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-[#1877f2] hover:bg-[#166fe5] dark:bg-[#1877f2] dark:hover:bg-[#166fe5] border-none text-white font-semibold text-base py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Spinner size="sm" />
                  <span>Adding...</span>
                </>
              ) : (
                'Add Post'
              )}
            </Button>

            {PostToBeUbdated && (
              <Button
                type="button"
                disabled={loadingUpdatingPost}
                onClick={updatePost}
                className="flex-1 bg-[#31a24c] hover:bg-[#2a8f41] dark:bg-[#31a24c] dark:hover:bg-[#2a8f41] border-none text-white font-semibold text-base py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loadingUpdatingPost ? (
                  <>
                    <Spinner size="sm" />
                    <span>Updating...</span>
                  </>
                ) : (
                  'Update Post'
                )}
              </Button>
            )}
          </div>

        </form>
      </div>
    </div>
  )
}