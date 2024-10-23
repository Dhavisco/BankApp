import React, { useState } from 'react';
import {useProfile} from '../hooks/useProfile'; // Import the hook
import { FaClipboardList } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa6";
import { SlEnergy } from "react-icons/sl";
import { RiCustomerService2Line, RiStarSmileFill } from "react-icons/ri";
import { MdAddIcCall } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Hide, Show } from '../icons/ToggleIcon';
import { SiSpringsecurity } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { data, isLoading, error } = useProfile();
   const [isHidden, setIsHidden] = useState(true);

  const balance = data.account.balance;

  const formatBalance = (balance: number) => {
  return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


  const handleToggle = () => {
    setIsHidden(!isHidden); // Toggle balance and transaction visibility
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile data</div>;
  }

  


  return (
    <div className ="profile">
    <div className='flex flex-col lg:flex-row lg:justify-between lg:gap-2'>

   <div className="bg-gradient-to-tr from-green-600 to-green-300 shadow-md rounded-lg p-4 lg:w-full">
        <div className='profile-header'>
            <div className='flex justify-between'>
                <div className='flex gap-1 items-center'>
                    <img src={data.avatar} alt="" className='w-5 h-5 rounded-full shadow-lg' />
                    <div className='text-lg font-semibold text-white'>Hi, {data.first_name}</div>
                </div>
                <div><IoSettingsOutline className='hover:cursor-pointer text-black'/></div>
            </div>
            <div className='balance mt-1 lg:mt-2'>
                <div className="flex gap-1 items-center">
                    <h2 className="md:text-base text-sm text-gray-50">Total Balance</h2>
                    <button onClick={handleToggle} className="text-gray-600 bg-gray-100 rounded-2xl p-[0.15rem] text-xs lg:text-sm lg:p-1 hover:text-black">
                        {isHidden ? <Show/> : <Hide/>}
                    </button>
                </div>
                <div className="mt-0 md:text-xl text-base font-bold text-white">
                    {isHidden ? '****' : `₦${formatBalance(balance)}`}
                </div>
            </div>
        </div>

    </div>

    <div className=" bg-white shadow-md rounded-lg p-4 lg:w-full flex flex-col gap-1 lg:gap-2 mt-3 lg:mt-0">
          <h2 className="text-xl font-semibold mb-1">Account Details</h2>
         <div>
          <strong>Account No:</strong> {data.account.account_number}
        </div>
        <div>
          <strong>Name:</strong> {data.first_name} {data.last_name}
        </div>
        <div>
          <strong>Email:</strong> {data.email}
        </div>
        {/* <div>
          <strong>Date of Birth:</strong> {data.date_of_birth}
        </div>
        <div>
          <strong>Phone Number:</strong> {data.phone_number}
        </div>
        <div>
          <strong>Address:</strong> {data.address}
        </div> */}
      </div>
    </div>
   
    <div className='flex flex-col lg:flex-row lg:justify-between lg:gap-2'>
        <div className=" bg-white shadow-md rounded-lg p-4 pt-6 lg:w-full flex flex-col gap-3 mt-3">
                    {/* Options */}
                    <div className='flex justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                        <span><FaClipboardList className='text-green-500 h-5 w-5'/></span> 
                        <div className='flex flex-col'>
                        <Link to="/dashboard/transactions"><span className='text-sm md:text-base'>Transaction History</span></Link>
                        <span className='text-xs md:text-sm text-gray-600'>View your transaction history</span>
                        </div>
                        
                        </div> 
                        <span className='text-lg text-gray-700'>{">"}</span>
                    </div>

                    <div className='flex justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                        <span><IoSpeedometer className='text-green-500 h-5 w-5'/></span> 
                        <div className='flex flex-col'>
                        <span className='text-sm md:text-base'>Account Limits</span>
                        <span className='text-xs md:text-sm text-gray-600'>View your transaction limits</span>
                        </div>                
                        </div> 
                        <span className='text-lg text-gray-700'>{">"}</span>
                    </div>

                    <div className='flex justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                        <span><FaCreditCard className='text-green-500 h-5 w-5'/></span> 
                        <div className='flex flex-col'>
                        <span className='text-sm md:text-base'>Bank Card/Account</span>
                        <span className='text-xs md:text-sm text-gray-600'>Add payment option</span>
                        </div>                
                        </div> 
                        <span className='text-lg text-gray-700'>{">"}</span>
                    </div>

                    <div className='flex justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                        <span><SlEnergy className='text-green-500 h-5 w-5'/></span> 
                        <Link to="/dashboard/deposit">
                        <div className='flex flex-col'>
                        <span className='text-sm md:text-base'>Transfer to Me</span>
                        <span className='text-xs md:text-sm text-gray-600'>Receive funds or payment</span>
                        </div></Link>                
                        </div> 
                        <span className='text-lg text-gray-700'>{">"}</span>
                    </div>
                
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
    </div>
       

</div>


  );
};

export default Profile;
