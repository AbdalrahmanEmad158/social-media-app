import React, { useContext, useState } from "react";
import { FaBell, FaCheck } from "react-icons/fa";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import { useMarkAllNotificationAsRead, useMarkSpecificNotficationAsRead, useNotification } from "../../CustomHooks/useNotification";
import { AuthContext } from "../../components/Context/AuthContext";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const { data: resOfGetNot ,isFetching} = useNotification() || [];
  const { mutate: onMarkAll } = useMarkAllNotificationAsRead();
    const { mutate: onMarkOne } = useMarkSpecificNotficationAsRead();

    console.log(resOfGetNot,"resOfGetNot from Notifications.jsx")
    
  const filtered =
    activeTab === "all"
      ? resOfGetNot?.data.notifications
      : resOfGetNot?.data.notifications.filter((n) => !n.isRead);
      

      const{setNotificationNumber}= useContext(AuthContext)
      setNotificationNumber(resOfGetNot?.data.notifications.filter((n) => !n.isRead).length)
  return (
    <section className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <FaBell size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-gray-500 text-sm">
              Realtime updates for likes, comments, and follows.
            </p>
          </div>
        </div>

        <button
          onClick={onMarkAll}
          className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-100"
        >
          <FaCheck />
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("all")  

          } 
          className={`px-4 py-2 rounded-xl ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setActiveTab("unread")  
          }
          className={`px-4 py-2 rounded-xl ${
            activeTab === "unread"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Unread
        </button>
      </div>

      {/* List */}
      {isFetching && <p>Loading notifications...</p>}
      <div className="space-y-4">
        {filtered?.map((n) => (
          <NotificationCard key={n?.id} notification = {n} onMarkOne={onMarkOne}></NotificationCard>
        ))}
      </div>
    </section>
  );
}
