import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { headerDataObj } from '../../components/helpers/headersObj';
import usePosts from '../../CustomHooks/usePosts';
import PostCard from '../../components/PostCard/PostCard';
import PostCardSkeleton from '../../components/PostCard/postCardSkeleton/PostCardSkeketon';
import AddPost from '../../components/AddPost/AddPost';
import CommentsWrapper from '../../components/CommentsWrapper/CommentsWrapper';
import useSuggestions from '../../CustomHooks/useSuggestion';
import SuggestionsList from '../../components/SuggestionsList/SuggestionsList';



export default function FeedFollowingPosts() {
   const {data ,isLoading, isFetched,isFetching,isError} = usePosts(['FeedFollowingPosts'],true ,"posts/feed?only=following&limit=50" )
  console.log(data, " data frommmm FeedFollowingposts")
  useEffect(()=>
 {
   console.log("isFetched",isFetched)
 },[isFetched])
 
 console.log("FINAL DATA FeedFollowingposts:", data);
 console.log("POSTS FeedFollowingposts LENGTH:", data?.data?.posts?.length);
 
    const [isOpen, setIsOpen] = useState(false);
  const [activePostId, setActivePostId] = useState(false);
  const handleClose = () => setIsOpen(false);
     const[PostToBeUbdated,setPostToBeUbdated]= useState()
 
 
 
   const[PostToBeShare,setPostToBeShare]= useState()
      const [isShareOpen, setIsShareOpen] = useState(false);
      
    

 
   return (
     <>
     <title>postsFollwing</title>
  <div className="container mx-auto flex flex-col md:flex-row gap-6">

  {/* suggestions */}
  <div className="w-full md:w-1/3 order-1 md:order-2 md:sticky md:top-20 h-fit">
    <SuggestionsList />
  </div>

  {/* posts */}
  <div className="w-full md:w-2/3 order-2 md:order-1">
    <AddPost PostToBeUbdated={PostToBeUbdated} />

    {isLoading && <PostCardSkeleton />}
    {isError && <p className="text-red-500">Error loading posts</p>}

    {isFetched &&
      data?.data?.posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          setIsOpen={setIsOpen}
          setActivePostId={setActivePostId}
          setPostToBeUbdated={setPostToBeUbdated}
          setIsShareOpen={setIsShareOpen}
          setPostToBeShare={setPostToBeShare}
        />
      ))}
  </div>

</div>
        <CommentsWrapper isOpen={isOpen} setIsOpen={setIsOpen}  handleClose={handleClose} activePostId={activePostId}></CommentsWrapper>
        
  
     </>
   )
 }

 