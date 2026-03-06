import { Button, Label, Radio, Spinner, TextInput } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import { ChangePasswordScehma} from '../../Schemas/AuthSchemas';
import AppAlert from '../../components/AppAlert/AppAlert';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

export default function Register() {
  const [msg, setMsg] = useState()
  const navigate = useNavigate()
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showRePass, setShowRePass] = useState(false)
   const {currentPassword,setToken,token} = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onsubmit',
    resolver: zodResolver(ChangePasswordScehma(currentPassword)),
    defaultValues: {
     
      password: '',
      newPassword: '',
      reNewPassword:''
    },
  })

 async function onSubmit(data) {
  setLoadingBtn(true);

  try {
    const token = localStorage.getItem("token");
    console.log("TOKEN before change:", localStorage.getItem("token"));
     console.log("currentPassword", currentPassword);

    const response = await axios.patch(
      "https://route-posts.routemisr.com/users/change-password",
      {
        password: data.password,
        newPassword: data.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          
        }
      }
    );

    console.log(response.data);

    setMsg(response.data.message);

          setToken(response.data.data.token)
       localStorage.setItem("token", response.data.data.token);
          console.log(response.data.data.token , "after change ")
         setTimeout(() => { navigate('/') }, 500);

  } catch (error) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Something went wrong";

    setMsg(errMsg);
  } finally {
    setLoadingBtn(false);
  }
}

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f0f2f5] dark:bg-[#18191a] font-sans px-4 transition-colors duration-300">
      
   
      <div className="w-full max-w-[432px]">
        <div className="bg-white dark:bg-[#242526] shadow-xl rounded-lg p-4 sm:p-6 border-none transition-colors">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Change Password</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Keep your account secure by using a strong password.</p>
            </div>

         
           

       
            <div className="grid grid-cols-1 gap-3">
              <div className="relative">
                <TextInput
                  {...register('password')}
                  type={showPass ? "text" : "password"}
                  placeholder="current password"
                  className="[&_input]:py-3 [&_input]:rounded-md dark:[&_input]:bg-[#3a3b3c]"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2 top-3 text-[11px] text-blue-600 font-semibold uppercase"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1 px-1">{errors.password.message}</p>}
              </div>

              <div className="relative">
                <TextInput
                  {...register('newPassword')}
                  type={showRePass ? "text" : "password"}
                  placeholder="newPassword"
                  className="[&_input]:py-3 [&_input]:rounded-md dark:[&_input]:bg-[#3a3b3c]"
                />
                <button 
                   type="button" 
                   onClick={() => setShowRePass(!showRePass)}
                   className="absolute right-2 top-3 text-[11px] text-blue-600 font-semibold uppercase"
                >
                  {showRePass ? "Hide" : "Show"}
                </button>
                {errors.newPassword && <p className="text-red-500 text-xs mt-1 px-1">{errors.newPassword.message}</p>}
              </div>


                  <div className="relative">
                <TextInput
                 {...register('reNewPassword')}
                 
                  type={showRePass ? "text" : "password"}
                  placeholder="Confirm password"
                  className="[&_input]:py-3 [&_input]:rounded-md dark:[&_input]:bg-[#3a3b3c]"
                />
                <button 
                   type="button" 
                   onClick={() => setShowRePass(!showRePass)}
                   className="absolute right-2 top-3 text-[11px] text-blue-600 font-semibold uppercase"
                >
                  {showRePass ? "Hide" : "Show"}
                </button>
                {errors.reNewPassword && <p className="text-red-500 text-xs mt-1 px-1">{errors.reNewPassword.message}</p>}
              </div>
            </div>

          

         
            <div className="pt-2 text-center">
              <Button
                type="submit"
                disabled={loadingBtn}
                className="w-full sm:w-48 mx-auto bg-[#42b72a] hover:bg-[#36a420] border-none text-white font-bold text-lg rounded-md transition-all duration-200"
              >
                {loadingBtn ? <Spinner size="sm" /> : 'Update Password'}
              </Button>
            </div>

            {msg && (
              <div className="mt-4">
                 <AppAlert color={msg === 'password changed successfully' ? 'success' : 'failure'} content={msg} />
              </div>
            )}

          

          </form>
        </div>
      </div>
    </div>
  )
}
