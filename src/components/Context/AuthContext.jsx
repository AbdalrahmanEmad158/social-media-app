import React, { createContext, useEffect, useState } from 'react'

import axios from 'axios'


export const AuthContext = createContext()

export default function AuthContextProvider({children}) {
    const [token , setToken] = useState(localStorage.getItem("token"))
    const[UserData,setUserData]=useState()
    const[currentPassword,setcurrentPassword]=useState()
    const[newPhoto,setNewPhoto] = useState()
    const[NotificationNumber,setNotificationNumber] = useState()
    async function getLoggedUserData()
    {
      try {
      const {data} = await axios.get(`https://route-posts.routemisr.com/users/profile-data`,
        {
            headers :  {
         Authorization: `Bearer ${localStorage.getItem("token")}`
      }
        }
      )
      console.log(data.data)
    
    setUserData(data.data.user)
    } 
    
    catch (error) {
      console.log(error)
    }
    }

    useEffect(()=>
    {getLoggedUserData()
      console.log("token from context",token)
    },[token])
  return (

<AuthContext.Provider value={{token , setToken,UserData,
setcurrentPassword,currentPassword,setNewPhoto,newPhoto
   ,NotificationNumber,setNotificationNumber}}>
{children}
</AuthContext.Provider>
   
  )
}
