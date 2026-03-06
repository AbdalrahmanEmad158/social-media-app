import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import { loginScehma } from '../../Schemas/AuthSchemas';
import AppAlert from '../../components/AppAlert/AppAlert';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../components/Context/AuthContext';

export default function Login() {
  const navigate = useNavigate()
  const [msg, setMsg] = useState()
  const [loadingBtn, setLoadingBtn] = useState(false)
  const { setToken , setcurrentPassword } = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onsubmit',
    resolver: zodResolver(loginScehma),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data) {
    setLoadingBtn(true)
    try {
      const response = await axios.post("https://route-posts.routemisr.com/users/signin", data);
      if (response.data.message === "signed in successfully") {
        setMsg(response.data.message)
        console.log(data);
        console.log(response.data.data.token);
        
        localStorage.setItem('token', response.data.data.token)
        setToken(response.data.data.token)
        setcurrentPassword (data.password)
        setTimeout((data) => {
          navigate('/');
        }, 500);
      }
    } catch (error) {
      setMsg(error.response?.data?.errors || "Invalid email or password");
    } finally {
      setLoadingBtn(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f0f2f5] dark:bg-[#18191a] font-sans px-4 transition-colors duration-500">
      
   
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left p-4 lg:p-12 mb-8 lg:mb-0">
        <h1 className="text-[#1877f2] dark:text-[#2e89ff] text-5xl lg:text-6xl font-black tracking-tight mb-4">
          SocialSphere
        </h1>
        <p className="text-[#1c1e21] dark:text-[#e4e6eb] text-xl lg:text-2xl font-normal leading-tight max-w-[500px]">
          Connect with friends and the world around you on SocialSphere.
        </p>
      </div>

   
      <div className="w-full max-w-[400px]">
        <div className="bg-white dark:bg-[#242526] shadow-2xl rounded-lg p-4 sm:p-5 border-none transition-colors duration-500">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
         
            <div>
              <TextInput
                {...register('email')}
                type="email"
                placeholder="Email address"
                className="[&_input]:py-3.5 [&_input]:text-lg [&_input]:rounded-md dark:[&_input]:bg-[#3a3b3c] dark:[&_input]:border-gray-600 dark:[&_input]:text-white focus:ring-1 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>

         
            <div>
              <TextInput
                {...register('password')}
                type="password"
                placeholder="Password"
                className="[&_input]:py-3.5 [&_input]:text-lg [&_input]:rounded-md dark:[&_input]:bg-[#3a3b3c] dark:[&_input]:border-gray-600 dark:[&_input]:text-white focus:ring-1 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
            </div>

          
            <Button
              type="submit"
              disabled={loadingBtn}
              className="w-full bg-[#1877f2] hover:bg-[#166fe5] border-none text-white font-bold text-xl py-1 rounded-md transition-all duration-200"
            >
              {loadingBtn ? <><Spinner size="sm" className="mr-2" /> Logging in...</> : 'Log In'}
            </Button>

         
            {msg && (
              <div className="mt-2">
                <AppAlert color={msg === 'signed in successfully' ? 'success' : 'failure'} content={msg} />
              </div>
            )}

            <div className="text-center">
              <Link to="/forgot-password" size="sm" className="text-[#1877f2] hover:underline text-sm">
                Forgotten password?
              </Link>
            </div>

         
            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

           
            <div className="text-center pt-2">
              <Button
                onClick={() => navigate('/Register')}
                type="button"
                className="bg-[#42b72a] hover:bg-[#36a420] border-none text-white font-bold text-lg px-4 py-0.5 rounded-md inline-block mx-auto transition-colors"
              >
                Create new account
              </Button>
            </div>
          </form>
        </div>
        
 
        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
          <span className="font-bold hover:underline cursor-pointer">Create a Page</span> for a celebrity, brand or business.
        </p>
      </div>
    </div>
  )
}