import { useContext } from 'react'
import {set, z} from 'zod'
import { AuthContext } from '../components/Context/AuthContext'


   export  const RegistritionScehma = z.object({
            name:z.string().min(3,"Name must be at least 3 characters").max(15,'Name must be less than 15 characters'),
              email:z.string().min(1,'Email is required').email("email is Not Valid"),
              password:z.string().min(1,'password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                'Password must contain at least one letter small ,one letter capital, one number and one special character'),
              rePassword:z.string().min(1,'rePassword is required'),
              dateOfBirth:z.string().refine((value)=> new Date(value) < new Date(),'Date must be in the bast'),
              gender :z.enum(['male','female'])
        }).refine((values)=> values.password===values.rePassword,
      {
        message :'Passwords do not match',
        path : ["rePassword"]
      })



        export  const loginScehma = z.object({
              email:z.string().min(1,'Email is required').email("email is Not Valid"),
              password:
              z.string()
              .min(1,'password is required')
              .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                'Password must contain at least one letter small ,one letter capital, one number and one special character'),
      })



         export  const ChangePasswordScehma =(currentPassword) => z.object({
                        password:z.string().refine((value)=> value===currentPassword,'this is not current password'),
              
              newPassword:z.string().min(1,'password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                'Password must contain at least one letter small ,one letter capital, one number and one special character'),
             
                reNewPassword:z.string().min(1,'rePassword is required'),
            
        }).refine((values)=> values.newPassword===values.reNewPassword,
      {
        message :'Passwords do not match',
        path : ["reNewPassword"]
      })
