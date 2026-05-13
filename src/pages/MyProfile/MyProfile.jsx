
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/Context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import usePosts from '../../CustomHooks/usePosts'
import PostCard from '../../components/PostCard/PostCard'
import PostCardSkeleton from '../../components/PostCard/postCardSkeleton/PostCardSkeketon'
import AddPost from '../../components/AddPost/AddPost'
import CommentsWrapper from '../../components/CommentsWrapper/CommentsWrapper'
import ProfileDetails from '../../components/ProfileDetails/ProfileDetails'

export default function Profile() {
  const [profilePostslength, setprofilePostslength] = useState(0);
  
    const {UserData} = useContext(AuthContext)
    useEffect(()=>
    {console.log(UserData, " UserData frommmm profile")},[UserData])

 const {data ,isLoading, isFetched,isFetching,isError} = usePosts(['userPosts'],Boolean(UserData?._id),`users/${UserData?._id}/posts` )
   console.log(data, " data frommmm profile")

  useEffect(() => {
  if (data?.data?.posts) {
    setprofilePostslength(data.data.posts.length);
  }
}, [data]);
   

      const [isOpen, setIsOpen] = useState(false);
    const [activePostId, setActivePostId] = useState(false);
    const postownerId = data?.data?.posts[0]?.user?._id;
     

      
       const handleClose = () => setIsOpen(false);

           console.log(Boolean(UserData?._id ==false) )
       console.log(isLoading)

       const[PostToBeUbdated,setPostToBeUbdated]= useState()

  return (
   <>
    <title>profile</title>
     {isError ? <div className='text-center text-red-500'>Error fetching data</div> :
      <>
       <div className='container mx-auto md:w-1/2'>
     
     
      <ProfileDetails UserData={UserData} profilePostslength={profilePostslength}></ProfileDetails>
      <AddPost PostToBeUbdated={PostToBeUbdated} 
      setPostToBeUbdated={setPostToBeUbdated}></AddPost>
       {!data &&   /*(isLoading || Boolean(UserData?._id ==false)*/ 
        
        <PostCardSkeleton></PostCardSkeleton>}
     {isFetched && data?.data?.posts?.map((post)=> <PostCard key={post.id} post={post} 
     setIsOpen={setIsOpen} setActivePostId={setActivePostId} 
      setPostToBeUbdated={setPostToBeUbdated}/>)}
    </div>
     <CommentsWrapper isOpen={isOpen} setIsOpen={setIsOpen}  handleClose={handleClose} activePostId={activePostId} postownerId={postownerId}></CommentsWrapper>
  
      </>}
   
  </>
  )
} 









/*import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../components/Context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { headerDataObj } from '../../components/helpers/headersObj'

export default function Profile() {
  
    const {UserData} = useContext(AuthContext)
console.log(UserData)
 /* const {data ,isLoading, isFetched,isFetching,isError,refetch} = useQuery(
    {
      queryFn: getUserPosts,
      queryKey:['userPosts'],
    
    }
  )*/
  
  
  
   /* async function getUserPosts()
    {
      try {
        console.log("testtt")
        const {data} = await axios.get(`https://linked-posts.routemisr.com/users/${UserData._id}/posts?limit=2`
          ,headerDataObj)
      console.log(data)
    // return data.posts
      } 
      
      catch (error) {
        console.log(error)
      //  return error
      }
    }
    useEffect(()=>
    {
      if (UserData?._id) {
        getUserPosts()
      }
    },[UserData])
  return (
    <div>
      {UserData?._id ? <>heloooo true</> : <>heloooo false</>}
    </div>
  )
} */
