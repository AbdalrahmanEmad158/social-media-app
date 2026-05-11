import {
  Link, 
  useParams} from "react-router-dom";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import ThemeToggle from "../themeToggele/themeToggle";
import { IoIosNotifications } from "react-icons/io";



export default  function AppNavbar() {
   const params = useParams()

  const {token,setToken,UserData,newPhoto,NotificationNumber} = useContext(AuthContext)
  const {name , email } = UserData /* user data become from Api   
  in first it is undifiend and we can not destruct this const {name , email } from it */
    || {}  // return first true . , const{} =  truthy value
    console.log(UserData)
      const navigate = useNavigate()
  function logOut()
  {
    localStorage.removeItem("token")
    setToken(null)
      setTimeout(() => {
        navigate('/Login'); 
      }, 500);
  }

   function GoToSeetings()
  {
    
      setTimeout(() => {
        navigate('/settings'); 
      }, 500);
  }

  
  return (
    <Navbar 
      fluid 
      rounded 
      className="bg-white dark:bg-[#242526] border-b border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg sticky top-0 z-50 transition-all duration-300"
    >
    
      

    
      {token && (
        <div className="flex md:order-2 gap-4 items-center">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar 
                alt="User settings" 
                img={newPhoto||UserData?.photo} 
                rounded
                className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200"
              />
            }
          >
            <DropdownHeader className="px-4 py-3 dark:bg-[#3a3b3c]">
              <span className="block text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
              <span className="block truncate text-xs font-normal text-gray-600 dark:text-gray-400 mt-1">{email}</span>
            </DropdownHeader>
         
            <DropdownItem onClick={GoToSeetings} className="dark:hover:bg-[#3a3b3c] dark:text-gray-200">
             
             
                Settings
          
            </DropdownItem>
           
            <DropdownDivider className="dark:border-gray-600" />
            <DropdownItem 
              onClick={logOut}
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
            >
              Sign out
            </DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
      )}

    
      <NavbarBrand as={Link} to="/" className="hover:opacity-80 transition-opacity duration-200">
        <span className="self-center whitespace-nowrap text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
          SocialSphere
        </span>
      </NavbarBrand>


      <NavbarCollapse className="md:flex md:gap-8">
        {token ? (
          <>
            <NavbarLink 
              as={Link} 
              to="/" 
               active
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium 
              transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 pb-1"
            >
            Community  Posts
            </NavbarLink>
            <NavbarLink 
              as={Link} 
               active
              to="/profile"
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 pb-1"
            >
              Profile
            </NavbarLink>


             <NavbarLink 
              as={Link} 
               active
              to="/Feed Following Posts"
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 pb-1"
            >
              Feed Posts
            </NavbarLink>




                 <NavbarLink 
              as={Link} 
               active
              to="/Notification"
              className="relative text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 pb-1"
            >
              <IoIosNotifications className="" size={24} >  </IoIosNotifications>
              <span className="absolute -top-1.5 -right-1.5">{NotificationNumber}</span>
            </NavbarLink>


          </>
        ) : (
          <>
            <NavbarLink 
              as={Link} 
              to="/Register"
               active
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 pb-1"
            >
              Register
            </NavbarLink>
            <NavbarLink 
              as={Link} 
              to="/login"
               active
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 pb-1"
            >
              Login
            </NavbarLink>
          </>
        )}
      </NavbarCollapse>
      <div className="z-50">
        <ThemeToggle />
      </div>
    </Navbar>
  );
}