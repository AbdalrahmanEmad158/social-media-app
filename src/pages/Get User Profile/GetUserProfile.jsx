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
import { useParams } from 'react-router-dom'
import ProfileUserDetails from '../../components/ProfileUserDetails/ProfileUserDetails'

export default function GetUserProfile() {
   
    const { id } = useParams()
    useEffect(() => {
       window.scrollTo(0, 0);
      }, [id]);
    console.log(id, "id from GetUserProfile")
     const [profilePostslength, setprofilePostslength] = useState(0);
      
    
      
     
    
     const {data ,isLoading, isFetched,isFetching,isError} = usePosts(['userPosts',id],Boolean(id),`users/${id}/posts` )
       console.log(data, " posts frommmm profile user profile diffferent")
      useEffect(() => {
      if (data?.data?.posts) {
        setprofilePostslength(data.data.posts.length);
      }
    }, [data]);


     const {data:data2 ,isLoading:isLoading2, isFetched:isFetched2,isFetching:isFetching2,isError:isError2} = usePosts(['userData',id],Boolean(id),`users/${id}/profile` )
       console.log(data2, " UserData frommmm profile user profile diffferent")
     
       const UserData = data2?.data?.user
       console.log(UserData, "UserData from GetUserProfile")
    


       
    
          const [isOpen, setIsOpen] = useState(false);
        const [activePostId, setActivePostId] = useState(false);
         
    
          
           const handleClose = () => setIsOpen(false);
    
             
    const { UserData:MyData } = useContext(AuthContext)
    const isMyProfile = MyData?._id == id
    console.log(MyData?._id, "MyData?._id from GetUserProfile")
    console.log(id, "id from GetUserProfile")
    console.log(isMyProfile, "isMyProfile from GetUserProfile")
           
  return <>
    <title>profile</title>
  {isError2 ? <div className='text-center text-red-500'>Error fetching user data</div> : <>
    <div className='container mx-auto md:w-1/2'>
      
        <ProfileUserDetails UserData={UserData} profilePostslength={profilePostslength}  isMyProfile={ isMyProfile}></ProfileUserDetails>
        
         {!data &&   /*(isLoading || Boolean(UserData?._id ==false)*/ 
          
          <PostCardSkeleton></PostCardSkeleton>}
       {isFetched && data?.data?.posts?.map((post)=> <PostCard key={post.id} post={post} 
       setIsOpen={setIsOpen} setActivePostId={setActivePostId} 
        />)}
      </div>
       <CommentsWrapper isOpen={isOpen} setIsOpen={setIsOpen}  handleClose={handleClose} activePostId={activePostId}></CommentsWrapper>
   
  
  </>
}

    </>

}