import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import React, { useEffect, useState } from 'react'

import usePosts from '../../CustomHooks/usePosts';
import PostCard from '../../components/PostCard/PostCard';
import PostCardSkeleton from '../../components/PostCard/postCardSkeleton/PostCardSkeketon';
import AddPost from '../../components/AddPost/AddPost';
import CommentsWrapper from '../../components/CommentsWrapper/CommentsWrapper';


export default function Posts() {

  const {data ,isLoading, isFetched,isFetching,isError} = usePosts(['allPosts'],true ,"posts?limit=50&sort=-createdAt" )
 console.log(data, " data frommmm posts")
 useEffect(()=>
{
  console.log("isFetched",isFetched)
},[isFetched])

console.log("FINAL DATA:", data);
console.log("POSTS LENGTH:", data?.data?.posts?.length);

   const [isOpen, setIsOpen] = useState(false);
 const [activePostId, setActivePostId] = useState(false);
 const handleClose = () => setIsOpen(false);
    const[PostToBeUbdated,setPostToBeUbdated]= useState()



  const[PostToBeShare,setPostToBeShare]= useState()
     const [isShareOpen, setIsShareOpen] = useState(false);
     
   

  return (
    <>
    <title>posts</title>
    {isError?<div className='text-center text-red-500'>Error fetching data</div> : <>
      <div className="container mx-auto md:w-1/2">
        <AddPost PostToBeUbdated={PostToBeUbdated}></AddPost>
           {isLoading && <PostCardSkeleton></PostCardSkeleton>}
           {isError && <p className="text-red-500">Error loading posts</p>}
           {isFetched && data?.data?.posts?.map((post)=> <PostCard key={post.id} post={post} setIsOpen={setIsOpen} 
           setActivePostId={setActivePostId} setPostToBeUbdated={setPostToBeUbdated}
           setIsShareOpen={setIsShareOpen} setPostToBeShare={setPostToBeShare}/>)}
      </div>
       <CommentsWrapper isOpen={isOpen} setIsOpen={setIsOpen}  handleClose={handleClose} activePostId={activePostId}></CommentsWrapper>
       
    </>}
    
 
    </>
  )
}
