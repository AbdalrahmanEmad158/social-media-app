import { formatDistanceToNowStrict } from "date-fns";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { BsShareFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { FaCommentAlt } from "react-icons/fa";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

export default function NotificationCard({ notification, onMarkOne }) {
  const navigate = useNavigate()
  const time = notification.createdAt
    ? formatDistanceToNowStrict(new Date(notification.createdAt), {
        addSuffix: true,
      })
        .replace(/ seconds?/, "s")
        .replace(/ minutes?/, "m")
        .replace(/ hours?/, "h")
        .replace(/ days?/, "d")
        .replace(/ months?/, "mo")
        .replace(/ years?/, "y")
    : "now";




      const {
    actor,
    isRead,
    type,
    _id: notificationId,
    entityType,
    entityId,
    createdAt,
  } = notification;

  const { name, photo ,_id:actorId} = actor;


  const config = {
    follow_user: {
      message: "started following you",
      icon: <HiUserAdd size={14} strokeWidth={2.5} />,
      color: "text-emerald-500",
    },
    comment_post: {
      message: "commented on your post",
      icon: <FaCommentAlt size={14} strokeWidth={2.5} />,
      color: "text-blue-600",
    },
    share_post: {
      message: "shared your post",
      icon: <BsShareFill size={14} strokeWidth={2.5} />,
      color: "text-purple-500",
    },
    like_post: {
      message: "liked your post",
      icon: <FcLike size={14} strokeWidth={2.5} />,
      color: "text-pink-500",
    },

   
  };

  const currentConfig = config[type] || config.comment_post;
  const linkItem =
    entityType === "post" ? `/details/${entityId}` : entityType === "user" ? `/GetUserProfile/${entityId}` : `/details/${notification.entity.post}`;
  return <>
   <div
   onClick={() => navigate(linkItem)}
      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition 
      ${
        !notification.isRead
          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
          : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
      }`}
    >
      <div className="flex items-center gap-4 ">
        {/* Avatar */}
      <div className="relative">
      <Link to={`/GetUserProfile/${actorId}`}>
          <img
          src={notification.actor?.photo || "/avatar.png"}
          alt=""
          className="w-12 h-12 rounded-full"
        />
        </Link>

           
    <span
            className={`absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 ${currentConfig.color}`}
          >
            {currentConfig.icon}
          </span>
      </div>
        {/* Text */}
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            <Link to={`/GetUserProfile/${actorId}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            {notification.actor?.name}
            
            </Link>{" "}
            <span className="font-normal text-gray-600 dark:text-gray-400">
              {notification.entityType === "comment" &&
                "replied to your comment"}
              {notification.entityType === "user" &&
                "started following you"}
              {notification.entityType === "post" &&
                notification.type === "like_post" &&
                "liked your post"}
              {notification.entityType === "post" &&
                notification.type === "comment_post" &&
                "commented on your post"}
              {notification.entityType === "post" &&
                notification.type === "share_post" &&
                "shared your post"}
            </span>
          </p>

          {/* Status */}
          <div
            className={`text-sm flex items-center gap-1 rounded-2xl px-2 py-1 w-max mt-1 cursor-pointer
            ${
              notification.isRead
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            }`}
            onClick={(e) => {
              e.preventDefault();
              onMarkOne(notification._id);
            }}
          >
            <FaCheck />
            {notification.isRead ? "Read" : "Mark as read"}
          </div>
        </div>
      </div>

      {/* Time */}
      <span className="text-sm text-gray-400 dark:text-gray-500">
        {time}
      </span>
    </div>
    </>
}