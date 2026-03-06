import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PostCardSkeleton() {
  return (
    <div className="w-full my-5">
      <div className="bg-white dark:bg-[#242526] rounded-2xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300">
        
        {/* Header Section */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Circular Profile Image Skeleton */}
              <Skeleton 
                circle 
                width={48} 
                height={48}
                baseColor="#f3f4f6"
                highlightColor="#e5e7eb"
                className="dark:!bg-[#3a3b3c] dark:!highlight-[#4a4b4c]"
              />
              
              <div className="flex flex-col gap-2 flex-1">
                {/* User Name Skeleton */}
                <Skeleton 
                  width={120} 
                  height={16}
                  baseColor="#f3f4f6"
                  highlightColor="#e5e7eb"
                  className="dark:!bg-[#3a3b3c] dark:!highlight-[#4a4b4c]"
                />
                {/* Date Skeleton */}
                <Skeleton 
                  width={80} 
                  height={12}
                  baseColor="#f3f4f6"
                  highlightColor="#e5e7eb"
                  className="dark:!bg-[#3a3b3c] dark:!highlight-[#4a4b4c]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="px-6 py-5">
          <div className="space-y-3">
            {/* Post Text Skeleton - Multiple lines */}
            <Skeleton 
              count={3} 
              height={14}
              baseColor="#f3f4f6"
              highlightColor="#e5e7eb"
              className="dark:!bg-[#3a3b3c] dark:!highlight-[#4a4b4c]"
            />
          </div>
        </div>

        {/* Image Section */}
        <div className="px-6 py-3">
          <Skeleton 
            height={320} 
            width="100%"
            borderRadius={12}
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
            className="dark:!bg-[#3a3b3c] dark:!highlight-[#4a4b4c]"
          />
        </div>

        {/* Interaction Section */}
        <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-700 flex justify-around items-center">
          {/* Like Icon Skeleton */}
          <Skeleton 
            circle 
            width={40} 
            height={40}
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
            className="dark:!bg-[#3a3b3c] dark:!highlight-[#4a4b4c]"
          />
          
          {/* Comment Icon Skeleton */}
          <Skeleton 
            circle 
            width={40} 
            height={40}
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
            className="dark:!bg-[#3a3b3c] dark:!highlight-[#4a4b4c]"
          />
          
          {/* Details Icon Skeleton */}
          <Skeleton 
            circle 
            width={40} 
            height={40}
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
            className="dark:!bg-[#3a3b3c] dark:!highlight-[#4a4b4c]"
          />
        </div>

        {/* Action Buttons Section */}
        <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-700 flex gap-3 justify-end">
          {/* Delete Button Skeleton */}
          <Skeleton 
            width={100} 
            height={40}
            borderRadius={8}
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
            className="dark:!bg-[#3a3b3c] dark:!highlight-[#4a4b4c]"
          />
          
          {/* Update Button Skeleton */}
          <Skeleton 
            width={100} 
            height={40}
            borderRadius={8}
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
            className="dark:!bg-[#3a3b3c] dark:!highlight-[#4a4b4c]"
          />
        </div>
      </div>
    </div>
  );
}