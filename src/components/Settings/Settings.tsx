import React from 'react'
import { IoIosLogOut } from 'react-icons/io';
import { MdAddIcCall } from 'react-icons/md';
import { RiCustomerService2Line, RiStarSmileFill } from 'react-icons/ri';
import { SiSpringsecurity } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';



const Settings:React.FC = () => {


    const {data} = useProfile();

    const profile = data?.data;

  return (
    <div className ="Settings">
   
    <div className='flex flex-col lg:justify-between lg:gap-2'>

         <div className="  shadow-md p-4 pt-6 lg:w-full flex flex-col gap-3 mt-3">
            {/* User Info */}
           <div className="flex items-center gap-2">
          <img src={profile?.avatar} alt="User Avatar" className="w-8 h-8 rounded-full"/>
           <h1 className="md:text-2xl text-xl font-semibold">Hi, {profile?.first_name}</h1>
        </div>
        <p className='text-sm text-gray-500'>Do you need Help?</p> 
        
        </div>
        
        <div className=" bg-white shadow-md rounded-lg p-4 pt-6 lg:w-full flex flex-col gap-3 mt-3">
            {/* Support */}
            <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <span><SiSpringsecurity className='text-green-500 h-5 w-5'/></span> 
                <div className='flex flex-col'>
                <span className='text-sm md:text-base'>Security Center</span>
                <span className='text-xs md:text-sm text-gray-600'>Protect your funds</span>
                </div>
                
                </div> 
                <span className='text-lg text-gray-700'>{">"}</span>
            </div>

            <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <span><MdAddIcCall className='text-green-500 h-5 w-5'/></span> 
                <div className='flex flex-col'>
                <span className='text-sm md:text-base'>USSD</span>
                {/* <span className='text-xs md:text-sm text-gray-600'>USSD Code</span> */}
                </div>                
                </div> 
                <span className='text-lg text-gray-700'>{">"}</span>
            </div>

            <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <span><RiCustomerService2Line className='text-green-500 h-5 w-5'/></span> 
                <div className='flex flex-col'>
                <span className='text-sm md:text-base'>Customer Service Suport</span>
                {/* <span className='text-xs md:text-sm text-gray-600'>CS Support</span> */}
                </div>                
                </div> 
                <span className='text-lg text-gray-700'>{">"}</span>
            </div>

            <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <span><RiStarSmileFill className='text-green-500 h-5 w-5'/></span> 
                <div className='flex flex-col'>
                <span className='text-sm md:text-base'>Rate Us</span>
                {/* <span className='text-xs md:text-sm text-gray-600'>Rating</span> */}
                </div>                
                </div> 
                <span className='text-lg text-gray-700'>{">"}</span>
            </div>
        
        </div>

         <div className=" bg-white shadow-md rounded-lg p-4 pt-6 lg:w-full flex flex-col gap-3 mt-3">
            {/* Logout */}
            <Link to ="/" className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <span><IoIosLogOut className='text-green-500 h-5 w-5'/></span> 
                <div className='flex flex-col'>
                <span className='text-sm md:text-base'>Logout</span>
                </div>
                
                </div> 
                <span className='text-lg text-gray-700'>{">"}</span>
            </Link>
        
        </div>
    </div>

    
       

</div>


  );
}

export default Settings