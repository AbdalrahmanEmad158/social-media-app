import React, { createContext, useEffect, useState } from 'react'
import { headerDataObj } from '../helpers/headersObj'
import axios from 'axios'


export const AuthContext = createContext()

export default function AuthContextProvider({children}) {
    const [token , setToken] = useState(localStorage.getItem("token"))
    const[UserData,setUserData]=useState()
    const[currentPassword,setcurrentPassword]=useState()
    const[newPhoto,setNewPhoto] = useState()
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
    {getLoggedUserData()},[token])
  return (

<AuthContext.Provider value={{token , setToken,UserData,setcurrentPassword,currentPassword,setNewPhoto,newPhoto}}>
{children}
</AuthContext.Provider>
   
  )
}
