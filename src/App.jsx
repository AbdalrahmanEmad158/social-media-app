import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './pages/Login/Login'
import Posts from './pages/Posts/Posts'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import AuthGuards from './Guards/AuthGuards'
import PostsGuards from './Guards/PostsGuards'
import AuthContextProvider from './components/Context/AuthContext';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import PostDetails from './pages/PostDetails/PostDetails'
import {Toaster} from "react-hot-toast"
import Settings from './components/Settings/Settings'


const queryClient = new QueryClient()
function App() {

 const routes = createBrowserRouter([
      {path:'' , element:<Layout/> , children:[
       { index:true , element:<PostsGuards> <Posts/> </PostsGuards>},
      { path:'details/:id' , element:<PostsGuards> <PostDetails/> </PostsGuards>},
      { path:'Login' , element:<AuthGuards> <Login/> </AuthGuards>},
      { path:'Register' , element:<AuthGuards><Register/></AuthGuards>},
      { path:'Profile' , element:<PostsGuards> <Profile/> </PostsGuards>},
       { path:'settings' , element:<PostsGuards> <Settings/> </PostsGuards>},
        ]}
     ])

  return (
    <>

 <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
       <RouterProvider router={routes}/>
       <Toaster/>
    </AuthContextProvider>
</QueryClientProvider>
    </>
  )
}

export default App
