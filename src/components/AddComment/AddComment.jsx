import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Spinner, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiCamera, HiX } from "react-icons/hi";

export default function AddComment({ activePostId, commentToBeUbdated, setCommentToBeUbdated, parentCommentId, isReply }) {
    const [loadingUbdating, setloadingUbdating] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { handleSubmit, register, reset, setValue, getValues, watch } = useForm({
        defaultValues: {
            content: "",
        }
    });

    
    const contentValue = watch("content");

    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    };

  
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const clearSelection = () => {
        setSelectedImage(null);
        setImagePreview(null);
    };

    async function hundleAddComment(values) {
     
        if (!values.content && !selectedImage) {
            toast.error("Please add a comment or an image");
            return;
        }

        const formData = new FormData();
        if (values.content) formData.append('content', values.content);
        if (selectedImage) formData.append('image', selectedImage);

        const url = parentCommentId 
            ? `https://route-posts.routemisr.com/posts/${activePostId}/comments/${parentCommentId}/replies`
            : `https://route-posts.routemisr.com/posts/${activePostId}/comments`;

        try {
            const { data } = await axios.post(url, formData, { headers });
            return data;
        } catch (error) {
            throw error;
        }
    }

    const QueryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: hundleAddComment,
        onSuccess: () => {
            QueryClient.invalidateQueries(["comments", activePostId]);
            toast.success(isReply ? 'Reply Added Successfully' : 'Comment Added Successfully :)');
            reset();
            clearSelection();
        },
        onError: () => {
            toast.error(isReply ? 'Error adding reply' : 'Error adding comment');
        }
    });

    useEffect(() => {
        if (commentToBeUbdated) {
            setValue("content", commentToBeUbdated.content);
        }
    }, [commentToBeUbdated, setValue]);

    async function updateComment() {
        if (!getValues().content && !selectedImage) {
            toast.error("Comment cannot be empty");
            return;
        }

        try {
            setloadingUbdating(true);
            const formData = new FormData();
            if (getValues().content) formData.append('content', getValues().content);
            if (selectedImage) formData.append('image', selectedImage);

            const { data } = await axios.put(
                `https://route-posts.routemisr.com/posts/${activePostId}/comments/${commentToBeUbdated._id}`, 
                formData, 
                { headers }
            );

            QueryClient.invalidateQueries(["comments", activePostId]);
            reset();
            clearSelection();
            toast.success(isReply ? 'Reply Updated Successfully' : 'Comment Updated Successfully');
        } catch (error) {
            toast.error(isReply ? 'Error updating reply' : 'Error updating comment');
            throw error;
        } finally {
            setloadingUbdating(false);
            setCommentToBeUbdated(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(mutate)} className='sticky bottom-0 z-40 w-full'>
            <div className="bg-white dark:bg-[#242526] border-t border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300">
                <div className="p-4 sm:p-6 space-y-4">
                    
                  
                    <div>
                        <Textarea
                            {...register("content")}
                            placeholder={isReply ? `Add your reply...` : `Add your Comment...`}
                            rows={3}
                            className="[&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-base [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-gray-300 dark:[&_textarea]:bg-[#3a3b3c] dark:[&_textarea]:border-gray-600 dark:[&_textarea]:text-white [&_textarea]:resize-none [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-blue-500"
                        />
                    </div>

                
                    {imagePreview && (
                        <div className="relative w-24 h-24 group">
                            <img 
                                src={imagePreview} 
                                className="w-full h-full object-cover rounded-lg border-2 border-blue-500 shadow-md" 
                                alt="preview" 
                            />
                            <button 
                                type="button"
                                onClick={clearSelection}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                            >
                                <HiX size={14} />
                            </button>
                        </div>
                    )}

                    <div className="flex gap-3 justify-end items-center">
                        
                      
                        <div className="relative mr-auto">
                            <input
                                type="file"
                                id="image-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <label 
                                htmlFor="image-upload" 
                                className="cursor-pointer flex items-center gap-2 text-gray-500 hover:text-[#1877f2] dark:text-gray-400 dark:hover:text-blue-400 transition-all p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a3b3c]"
                            >
                                <HiCamera size={24} />
                                <span className="text-sm font-medium hidden sm:inline">Photo</span>
                            </label>
                        </div>

                       
                        {!commentToBeUbdated ? (
                            <Button
                                type="submit"
                                disabled={isPending || (!contentValue && !selectedImage)}
                                className="bg-[#1877f2] hover:bg-[#166fe5] border-none text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-md disabled:opacity-50"
                            >
                                {isPending ? (
                                    <>
                                        <Spinner size="sm" className="mr-2" />
                                        <span>Adding...</span>
                                    </>
                                ) : (
                                    'Add Comment'
                                )}
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    color="gray"
                                    onClick={() => {
                                        setCommentToBeUbdated(false);
                                        reset();
                                        clearSelection();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    disabled={loadingUbdating}
                                    onClick={updateComment}
                                    className="bg-[#31a24c] hover:bg-[#2a8f41] border-none text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-md"
                                >
                                    {loadingUbdating ? (
                                        <>
                                            <Spinner size="sm" className="mr-2" />
                                            <span>Updating...</span>
                                        </>
                                    ) : (
                                        'Update Comment'
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}