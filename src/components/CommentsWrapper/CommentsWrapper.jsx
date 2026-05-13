import React, { useEffect } from 'react'
import { Button, Card, Drawer, DrawerHeader, DrawerItems, Textarea } from "flowbite-react";
import { useState } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import Comment from '../Comment/Comment';
import AddComment from '../AddComment/AddComment';



    
export default function CommentsWrapper({isOpen, setIsOpen,  handleClose,activePostId,postownerId}) {
  const [commentToBeUbdated,setCommentToBeUbdated]= useState()



   const token = localStorage.getItem('token'); 
    
    const headers = {
        Authorization: `Bearer ${token}`
    };

const {data ,isLoading, isFetched,isFetching,isError} = useQuery({
    queryFn: getPostComments,
    queryKey:['comments',activePostId] ,
   enabled  : Boolean(activePostId)
  })



async function getPostComments(){
 try {
  const {data} = await axios.get(`https://route-posts.routemisr.com/posts/${activePostId}/comments?page=1`,
     { headers }
  )
  console.log(data , "commentssss");
  return data
  
 } catch (error) {
  console.log(error);
  
 }
}



  return (
     <>
      <Drawer className='h-[60vh]' open={isOpen} onClose={handleClose} position="bottom">
        <DrawerHeader title="Comments" />
        <DrawerItems className="relative">
            <div className='h-[50vh] overflow-y-auto px-4'>
                     {isLoading && <Skeleton count={6} width={'100%'} height={40} baseColor='#09c'></Skeleton>}
                   {isError && <p className="text-red-500">Error loading comment</p>}
                   {isFetched && data?.data?.comments?.map((comment)=> <Comment comment={comment} setCommentToBeUbdated={setCommentToBeUbdated} activePostId={activePostId} postownerId={postownerId}/>)}

            </div>
                  <AddComment activePostId={activePostId} commentToBeUbdated={commentToBeUbdated} setCommentToBeUbdated={setCommentToBeUbdated}></AddComment>
        </DrawerItems>
      </Drawer>
    </>
  )
}
