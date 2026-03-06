import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import usePosts from '../../CustomHooks/usePosts'
import PostCardSkeleton from '../../components/PostCard/postCardSkeleton/PostCardSkeketon'
import PostCard from '../../components/PostCard/PostCard'
import CommentsWrapper from './../../components/CommentsWrapper/CommentsWrapper';

export default function PostDetails() {
  const params = useParams()
  const {data ,isLoading, isFetched,isFetching,isError} = usePosts(['details',params.id],true ,`posts/${params.id}` )
  console.log(data)

    const [isOpen, setIsOpen] = useState(false);
      const [activePostId, setActivePostId] = useState(false);
        
         const handleClose = () => setIsOpen(false);
  return (
    <>
    <title>{data?.data?.post?.body}</title>
       <div className="container mx-auto">
           {isLoading && <PostCardSkeleton></PostCardSkeleton>}
           {isFetched && <PostCard post={data?.data?.post} setIsOpen={setIsOpen} setActivePostId={setActivePostId}/>}
      </div>
       <CommentsWrapper isOpen={isOpen} setIsOpen={setIsOpen}  handleClose={handleClose} activePostId={activePostId}></CommentsWrapper>
      
    </>
  )
}
