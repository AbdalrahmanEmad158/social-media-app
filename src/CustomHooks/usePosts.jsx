
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function usePosts(queryKey, isEnabled, endPoint) {
  
  async function getPosts() {
   
    const token = localStorage.getItem('token'); 
    
    const headers = {
        Authorization: `Bearer ${token}`
    };

    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/${endPoint}`, 
        { headers } 
      );
      console.log(data)
      return data;
    } catch (error) {
    
      throw error; 
    }
  }

  return useQuery({
    queryFn: getPosts,
    queryKey: [... queryKey],
    enabled: isEnabled,
    refetchOnWindowFocus : false,
    staleTime:  60 * 1000
  });
}