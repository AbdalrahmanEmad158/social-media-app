import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast';



export  function useNotification() {
async function getNotifications() {
    const token = localStorage.getItem('token');
const headers = {
    Authorization: `Bearer ${token}`
};
  try {
    const { data } = await axios.get(
      "https://route-posts.routemisr.com/notifications",
      { headers }
    );

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  };
}
    return useQuery({
        queryFn: getNotifications,
        queryKey: ["notifications"],
        refetchOnWindowFocus : false,
        staleTime:  5 * 1000
    });
  }

export function useMarkAllNotificationAsRead() {
    const query = useQueryClient()
async function MarkAllNotificationAsRead(){
    const token = localStorage.getItem('token');
const headers = {
    Authorization: `Bearer ${token}`
};
  try {
    const { data } = await axios.patch(
      "https://route-posts.routemisr.com/notifications/read-all",
     {}, { headers }
    );
   console.log(data,"data from MarkAllNotificationAsRead")
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

return  useMutation({
    mutationFn: MarkAllNotificationAsRead,

  onSuccess: () => {
    query.invalidateQueries(["notifications"]);
    query.invalidateQueries(["unReadNotificationCount"]);
    toast.success("All notifications marked as read");
    },
    onError: (error) => {   
        console.error("Error marking notifications as read:", error);
        toast.error("Failed to mark notifications as read");
    }
});;
}



export function useMarkSpecificNotficationAsRead() {
    const query = useQueryClient()
 async function MarkSpecificNotficationAsRead(notificationsID) {
    const token = localStorage.getItem('token');
const headers = {
    Authorization: `Bearer ${token}`
};
  try {
    const { data } = await axios.patch(
      `https://route-posts.routemisr.com/notifications/${notificationsID}/read/`,
     {}, { headers }
    );
   console.log(data,"data from Mark1NotificationAsRead")
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
  return useMutation({
    mutationFn: MarkSpecificNotficationAsRead,

  onSuccess: () => {
    query.invalidateQueries(["notifications"]);
    query.invalidateQueries(["unReadNotificationCount"]);
    toast.success("1 notification marked as read");
    },
    onError: (error) => {   
        console.error("Error marking 1notification1 as read:", error);
        toast.error("Failed to mark 1 notification as read");
    }
});;
}





