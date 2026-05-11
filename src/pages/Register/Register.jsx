import { Button, Label, Radio, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import { RegistritionScehma } from '../../Schemas/AuthSchemas';
import AppAlert from '../../components/AppAlert/AppAlert';
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [msg, setMsg] = useState()
  const navigate = useNavigate()
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showRePass, setShowRePass] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onsubmit',
    resolver: zodResolver(RegistritionScehma),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: "",
      gender: ""
    },
  })

  async function onSubmit(data) {
    setLoadingBtn(true)
    try {
      const response = await axios.post("https://route-posts.routemisr.com/users/signup", data);
      if (response.data.message === "account created") {
        setMsg(response.data.message)
        setTimeout(() => { navigate('/Login') }, 500);
      }
    } catch (error) {
      const errMsg = error?.response?.data?.error || error?.response?.data?.message || "Something went wrong";
      setMsg(errMsg);
    } finally {
      setLoadingBtn(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f0f2f5] dark:bg-[#18191a] font-sans px-4 transition-colors duration-300">
      
    
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left p-4 lg:p-12 mb-8 lg:mb-0">
        <h1 className="text-[#1877f2] dark:text-[#2e89ff] text-5xl lg:text-6xl font-black tracking-tight mb-4">
          SocialSphere
        </h1>
        <p className="text-[#1c1e21] dark:text-[#e4e6eb] text-xl lg:text-2xl font-normal leading-tight max-w-[500px]">
          SocialSphere helps you connect and share with the people in your life.
        </p>
      </div>

      <div className="w-full max-w-[432px]">
        <div className="bg-white dark:bg-[#242526] shadow-xl rounded-lg p-4 sm:p-6 border-none transition-colors">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign Up</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">It's quick and easy.</p>
            </div>

          
            <div>
              <TextInput
                {...register('name')}
                type="text"
                placeholder="Full Name"
                className="[&_input]:py-3 [&_input]:rounded-md dark:[&_input]:bg-[#3a3b3c] dark:[&_input]:border-gray-600 dark:[&_input]:text-white"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 px-1">{errors.name.message}</p>}
            </div>

          
            <div>
              <TextInput
                {...register('email')}
                type="email"
                placeholder="Email address"
                className="[&_input]:py-3 [&_input]:rounded-md dark:[&_input]:bg-[#3a3b3c] dark:[&_input]:border-gray-600 dark:[&_input]:text-white"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 px-1">{errors.email.message}</p>}
            </div>

      
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <TextInput
                  {...register('password')}
                  type={showPass ? "text" : "password"}
                  placeholder="password"
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
                  {...register('rePassword')}
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
                {errors.rePassword && <p className="text-red-500 text-xs mt-1 px-1">{errors.rePassword.message}</p>}
              </div>
            </div>

         
            <div>
              <Label className="text-[12px] text-gray-500 dark:text-gray-400 ml-1">Date of birth</Label>
              <TextInput
                {...register('dateOfBirth')}
                type="date"
                className="[&_input]:py-2 [&_input]:rounded-md dark:[&_input]:bg-[#3a3b3c]"
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1 px-1">{errors.dateOfBirth.message}</p>}
            </div>

          
            <div>
               <Label className="text-[12px] text-gray-500 dark:text-gray-400 ml-1">Gender</Label>
               <div className="flex gap-4 mt-1">
                  <div className="flex-1 flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-[#3a3b3c]">
                    <Label className="dark:text-gray-200 text-sm cursor-pointer">Male</Label>
                    <Radio {...register('gender')} value="male" />
                  </div>
                  <div className="flex-1 flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-[#3a3b3c]">
                    <Label className="dark:text-gray-200 text-sm cursor-pointer">Female</Label>
                    <Radio {...register('gender')} value="female" />
                  </div>
               </div>
               {errors.gender && <p className="text-red-500 text-xs mt-1 px-1">{errors.gender.message}</p>}
            </div>

            <p className="text-[11px] text-gray-500 leading-tight">
              By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy.
            </p>

            
            <div className="pt-2 text-center">
              <Button
                type="submit"
                disabled={loadingBtn}
                className="w-full sm:w-48 mx-auto bg-[#42b72a] hover:bg-[#36a420] border-none text-white font-bold text-lg rounded-md transition-all duration-200"
              >
                {loadingBtn ? <Spinner size="sm" /> : 'Sign Up'}
              </Button>
            </div>

            {msg && (
              <div className="mt-4">
                 <AppAlert color={msg === 'account created' ? 'success' : 'failure'} content={msg} />
              </div>
            )}

            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
               <button 
                type="button"
                onClick={() => navigate('/Login')}
                className="text-[#1877f2] hover:underline text-sm font-semibold cursor-pointer"
               >
                 Already have an account?
               </button>
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





/*import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import {useForm} from 'react-hook-form'
import { zodResolver } from './../../../node_modules/@hookform/resolvers/zod/src/zod';
import { axios } from './../../../node_modules/axios/dist/esm/axios';
import axios from './../../../node_modules/axios/lib/axios';
import { Axios } from './../../../node_modules/axios/index.d';
import AppAlert from './../../components/AppAlert/AppAlert';


export default function Register() {


  const {register,handleSubmit,formState: { errors } ,formState , getValues} = useForm(
    {
      defaultValues:{
        name:'',
        email:'',
        password:'',
        rePassword:'',
        dateOfBirth:'',
        gender :''
      },
      mode:'onsubmit'
    
    }
  )
  console.log(register());

  function onSubmit(data){
    console.log(data);
  }

  return (
 <form action="" onSubmit={handleSubmit(onSubmit)}>
    <div className="container mx-auto my-10 max-w-md bg-amber-800">
     <div>
        <div className="mb-2 block">
          <Label htmlFor="name">Your name</Label>
        </div>
        <TextInput {... register('name',
          {required:{value:true,message:'Name is required'},
          minLength:{value:3,message:'Name must be at least 3 characters'},
          maxLength:{value:20,message:'Name must be less than 20 characters'},
          pattern:{value:/^[A-Za-z\s]+$/,message:'Name must contain only letters and spaces'}
        }
        )} id="name" type="text" placeholder="Your name" className='mb-5'  />
        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
        {errors.name && formState.touchedFields.name && <p className='text-red-600'>{errors.name.message}</p>}
      </div>
      


      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Your email</Label>
        </div>
        <TextInput {... register('email',
          {
            required:{value:true,message:'Email is required'},
            pattern:{value:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,message:'Invalid email address'}

          }
        )} id="email1" type="email" placeholder="name@flowbite.com"className='mb-5' />
      </div>
       {errors.email&& <p className='text-red-600'>{errors.email.message}</p>}


        <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Your password</Label>
        </div>
        <TextInput {... register('password',
          {
            required:{value:true,message:'Password is required'},
            minLength:{value:6,message:'Password must be at least 6 characters'},
            pattern:{value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,message:'Password must contain at least one letter, one number and one special character'}

          }
        )} id="password" type="text" placeholder="Your password" className='mb-5'/>
      </div>
      {errors.password && <p className='text-red-600'>{errors.password.message}</p>}


       <div>
        <div className="mb-2 block">
          <Label htmlFor="rePassword">Confirm password</Label>
        </div>
        <TextInput {... register('rePassword',
          {
            required:{value:true,message:'Confirm Password is required'},
            //validate:(value,formValues)=> value === formValues.password || 'Passwords do not match'
            validate:(value)=> value === getValues('password') || 'Passwords do not match'
          }
        )} id="repassword" type="text" placeholder="Your password" className='mb-5' />
      </div>
      {errors.rePassword && <p className='text-red-600'>{errors.rePassword.message}</p>}


       <div>
        <div className="mb-2 block">
          <Label htmlFor="dob">Date Of Birth</Label>
        </div>
        <TextInput {... register('dateOfBirth',{
          required:{value:true,message:'Date of birth is required'},
          //valueAsDate:true ,
          
          validate:(value)=>{
            const today = new Date();
            const dob = new Date(value);//selected date of birth
            let age = today.getFullYear() /*current year*//*- dob.getFullYear() /*selected year*/;
            /*const monthDiff = today.getMonth() /*current month*/// - dob.getMonth() /*selected month*/;
            /*console.log(age);
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate()  /*current day*/ //< dob.getDate()))
               /*selected day*///{
             /* age--;
            }
            console.log(age);
            console.log(dob.getDate());
            console.log(today.getDate());
            console.log(monthDiff);

            return age >= 13 || 'You must be at least 13 years old to register';
          }
          // validate: (value) => {new Date().getFullYear() - new Date(value).getFullYear() >= 13 || 'You must be at least 13 years old to register';
         // validate: (value) => {new Date(value)< new Date() || 'data of birth must be in the past';
        })} 
        id="dob" type="date" placeholder="Your date of birth" className='mb-5' />
      </div>
{errors.dateOfBirth && <p className='text-red-600'>{errors.dateOfBirth.message}</p>}


<div className='mt-3 flex items-center'>
  <label htmlFor="female">female:</label>
  <input className='ms-2' type="radio" name="gender" id="female" value="female" {... register('gender',
    {
      required:{value:true,message:'Gender is required'
      }
    }
  )} />
</div>


<div className='mt-3 flex items-center'>
  <label htmlFor="male">male:</label>
  <input className='ms-2' type="radio" name="gender" id="male" value="male" {... register('gender')} />
</div>
{errors.gender&& <p className='text-red-600'>{errors.gender.message}</p>}
      <Button type="submit">submit</Button>
   </div>
   
 </form>
  )
}
  */
