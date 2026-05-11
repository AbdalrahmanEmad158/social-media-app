import { Alert, Avatar, Button, Card, Spinner ,Textarea ,NavbarLink} from 'flowbite-react'
import React, { useState } from 'react'
import { FcLike } from "react-icons/fc";
import { FaCommentAlt } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { Link, Links } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {formatDistanceToNow} from "date-fns" ;

import { RiDislikeLine } from "react-icons/ri";
import { BsShareFill } from "react-icons/bs";

import { useForm } from 'react-hook-form'

import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
export default function PostCard({post,setIsOpen,setActivePostId,setPostToBeUbdated,setPostToBeShare}) {

     const {handleSubmit,register,setValue,getValues,reset} = useForm(
          {
              defaultValues : {
                  body : ""
                  
              }
          }
      )
     
  
  const {UserData} = useContext(AuthContext)
    const {body,createdAt:postDate,id:postId , image:postImg,likesCount
      ,sharedPost,isShare,commentsCount,sharesCount} = post ||{}

    const {name,photo:userImg,_id:userId} = post?.user || {}

    if (isShare) {
       var{body:sahredPostbody,id:sahredPostId,user:sahredPostUser,image:SahredPostimage}=sharedPost || {}
       var{name:sahredPostUser_Name,photo:sahredPostuserImg,_id:sahredPostuserId,username:sahredPostUser_username}=sahredPostUser || {}
    }
 
    
   

    const isUserLiked = post.likes.some(id => id === UserData?._id);
    const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
const [likesList, setLikesList] = useState([]);


const [openShareModal, setOpenShareModal] = useState(false);




    const result = formatDistanceToNow(
      new Date(postDate),
      {
        addSufix : true
      }
    )
   const QueryClient = useQueryClient()
   const {mutate:mutateDeletePost,isPending} =  useMutation(
   {
         mutationFn : deletePost,
         onSuccess : ()=>{
 
          QueryClient.invalidateQueries(["allPosts"]) 
          QueryClient.invalidateQueries(["userPosts"]) 
          QueryClient.invalidateQueries(["FeedFollowingPosts"]) 
          
          toast.success('Post Deleted Successfully')
         },
         onError : ()=>{

          alert("error in deletePost")
         }
   }
  )
   async function deletePost()
   {
     const token = localStorage.getItem('token'); 
    
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        };
  try {
      const resp = await axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, { headers }
       
    )
     return resp
    
  } catch (error) {
    return error
  }
   }

   async function handleLikebtn ()
   {
        const token = localStorage.getItem('token'); 
    
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        };
  try {
    
      const resp = await axios.put(`https://route-posts.routemisr.com/posts/${postId}/like`, {}, { headers }
      
    )
     console.log(resp)
      QueryClient.invalidateQueries(["allPosts"]) 
      if (userId === UserData._id) {
         QueryClient.invalidateQueries(["userPosts"]) 
      }
     
     
     return resp
    
  } catch (error) {
    console.log(error)
    return error
  }
   }

   async function showLikes() {
  try {
      const token = localStorage.getItem('token'); 
    
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        };
    const { data } = await axios.get(`https://route-posts.routemisr.com/posts/${postId}/likes?page=1&limit=20`, { headers });
   console.log(data);

   
    setLikesList(data.data.likes || []); 
   
    
    setIsLikesModalOpen(true);
  } catch (error) {
    console.error("Error fetching likes", error);
  }
}

 function HandleSharePostIcon() {
  setOpenShareModal(true);
}


       const {mutate:mutateHandleSharePost,isPending:isPendingShare} =  useMutation(
       {
             mutationFn : HandleSharePost,
             onSuccess : ()=>{
     
              QueryClient.invalidateQueries(["allPosts","userPosts","FeedFollowingPosts"]) 
            //  QueryClient.invalidateQueries(["userPosts"]) 
              toast.success('Post sahared Successfully')
             },
             onError : ()=>{
    
        
             }
       }

    )



async function HandleSharePost(value) {
  setOpenShareModal(false);
   console.log(value)
  
 try {
      const token = localStorage.getItem('token'); 
    
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        };
    const { data } = await axios.post(`https://route-posts.routemisr.com/posts/${postId}/share`,value.body, { headers });
   console.log(data);
  

  
  } catch (error) {
    console.error("Error fetching likes", error);
  }
    

}



   function handleClickCommentIcon()
   {
       setIsOpen(true)
       setActivePostId(postId)
   }

  
  return (
    <div className="w-full my-5">
      <div className="bg-white dark:bg-[#242526] rounded-2xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl">
        
        {/* Header Section */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">

  <Link
              
              to={`/GetUserProfile/${userId}`}
           >
               <img 
                className='w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600' 
                src={userImg} 
                alt={name} 
              />
            </Link>


              <div className="flex flex-col">
              <Link   to={`/GetUserProfile/${userId}`}
              > <p className='text-gray-900 dark:text-white font-semibold text-base'>{name}</p>
               
               </Link>
               
                <p className='text-gray-500 dark:text-gray-400 text-xs font-normal'>{result}</p>
              </div>
            </div>
          </div>
        </div>

     
        <div className="px-6 py-5">
          <p className='text-gray-800 dark:text-gray-100 text-base leading-relaxed font-normal'>{body}</p>
        </div>
          {isShare&&
         <div className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex justify-between items-start transition-colors duration-300">


      <div className="flex gap-3">
        {/* Avatar */}
        <Link to= {`/GetUserProfile/${sahredPostuserId}`}>
          <img
          src={sahredPostuserImg}
          alt="sahredPostuserImg"
          className="w-10 h-10 rounded-full object-cover"
        />
        </Link>
      

        <div>
           <Link to= {`/GetUserProfile/${sahredPostuserId}`}>  
          <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
           {sahredPostUser_Name}
          </h3>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {sahredPostUser_username}
          </p>

         
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {sahredPostbody}
          </p>
          {SahredPostimage&&
          (
          <div className="px-6 py-3">
            <img 
              className='w-full max-h-96 object-contain rounded-xl' 
              src={SahredPostimage} 
              alt="SahredPostimage" 
            />
          </div>
        )}
        </div>
      </div>

   
      <Link 
            to={`/details/${sahredPostId}`}
            className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'
          >
            Oroginal Details
           
          </Link>
    </div>
  
          }
    
        {postImg && (
          <div className="px-6 py-3">
            <img 
              className='w-full max-h-96 object-contain rounded-xl' 
              src={postImg} 
              alt="Post content" 
            />
          </div>
        )}

      
        <div className='px-6 py-5 border-t border-gray-100 dark:border-gray-700 flex justify-around items-center'>
         <div className='flex gap-0.5'>
           <button onClick={handleLikebtn} className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'>
            {isUserLiked ? <FcLike size={24} /> : <RiDislikeLine size={24} />} 
            <span className='text-sm font-medium hidden sm:inline'>Like</span> 

          </button>
          <button onClick={showLikes} className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'>{likesCount}</button>
         </div>
        
{isLikesModalOpen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999] p-4">
    <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-fade-in">
 
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white">People who reacted</h3>
        <button onClick={() => setIsLikesModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

 
      <div className="max-h-[400px] overflow-y-auto p-2">
        {likesList.length > 0 ? (
          likesList.map((user) => (
            <div key={user._id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Link to={`/GetUserProfile/${user._id}`}>
                 <img 
                  src={user.photo} 
                  alt={user.name} 
                  className="w-11 h-11 rounded-full border dark:border-gray-600 object-cover"
                  onError={(e) => e.target.src = "https://via.placeholder.com/150"} // صورة افتراضية في حال الخطأ
                />
                </Link>
               
                <div className="flex flex-col">
                  <Link to={`/GetUserProfile/${user._id}`}>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</span>
                  </Link>
                  <span className="text-xs text-gray-500">{user.username}</span>
                </div>
              </div>
              
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500">لا يوجد معجبين بعد</p>
        )}
      </div>
    </div>
  </div>
)}

          <div className='flex '>
            <button 
            onClick={handleClickCommentIcon}
            className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'
          >
            <FaCommentAlt size={24} />
            <span className='text-sm font-medium hidden sm:inline'>Comment</span>
          </button>
          <span className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'>
            {commentsCount}
            </span>
          </div>
          
          <Link 
            to={`/details/${postId}`}
            className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'
          >
            <FaInfoCircle size={24} />
            <span className='text-sm font-medium hidden sm:inline'>Details</span>
          </Link>


          

           <div className='flex '>
         <button 
            onClick={HandleSharePostIcon}
            className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'
          >
            <BsShareFill size={24} />
            <span className='text-sm font-medium hidden sm:inline'>share</span>
          </button>
          <span className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]'>
            {sharesCount}
            </span>
          </div>
        {openShareModal && (
  <Modal 
    dismissible 
    show={openShareModal} 
    onClose={() => setOpenShareModal(false)}
    size="md" 
  >
                <form onSubmit={handleSubmit(mutateHandleSharePost)} className="p-6 sm:p-8 space-y-5">
    <ModalHeader className="border-b-0 pb-0">
      <div className='flex justify-between gap-3 items-center'>
        <Avatar img={userImg} rounded bordered />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Share Post</span>
      </div>
    
     
    </ModalHeader>
    
    <ModalBody className="pt-4">
      <div className="flex flex-col space-y-4">
      
        {body && (
          <div className="px-2">

                      
                    
                      <div>
                        <Textarea
                          {...register('body')}
                          placeholder="What's on your mind?"
                          rows={5}
                          className="[&_textarea]:px-4 [&_textarea]:py-3.5 [&_textarea]:text-base [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-gray-300 dark:[&_textarea]:bg-[#3a3b3c] dark:[&_textarea]:border-gray-600 dark:[&_textarea]:text-white dark:[&_textarea]:placeholder-gray-400 [&_textarea]:resize-none [&_textarea]:font-normal [&_textarea]:transition-all [&_textarea]:duration-200 [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-blue-500 [&_textarea]:focus:border-transparent"
                        />
                      </div>
            
                   

            <p className="text-gray-700 dark:text-gray-300 text-lg font-medium leading-snug">
              {body}
            </p>
          </div>
        )}
        
      
        {postImg && (
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <img
              className="w-full h-auto max-h-[400px] object-cover"
              src={postImg}
              alt="Post content"
            />
          </div>
        )}
      </div>
    </ModalBody>

    <ModalFooter className="border-t-0 flex justify-end gap-3 pt-2">
      <Button type='button'
        color="gray" 
        pill 
        onClick={() => setOpenShareModal(false)}
      >
        Cancel
      </Button>
      <Button 
        className="bg-blue-600 hover:bg-blue-700" 
        pill 
        type="submit"
        disabled={isPendingShare}
      >
        Share Now
      </Button>
    </ModalFooter>
    </form>
  </Modal>
)}





        </div>
        






        {userId === UserData?._id && (
          <div className='px-6 py-5 border-t border-gray-100 dark:border-gray-700 flex gap-3 justify-end'>
            <Button
              disabled={isPending}
              onClick={mutateDeletePost}
              className='bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 border-none text-white font-semibold text-sm py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2'
            >
              {isPending && <Spinner size="sm" />}
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>

            <Button
              onClick={() => setPostToBeUbdated(post)}
              className='bg-[#1877f2] hover:bg-[#166fe5] dark:bg-[#1877f2] dark:hover:bg-[#166fe5] border-none text-white font-semibold text-sm py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg'
            >
              Update
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}