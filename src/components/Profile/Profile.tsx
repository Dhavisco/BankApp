import React, { useState } from 'react';
import {useProfile} from '../hooks/useProfile'; // Import the hook
import { FaClipboardList } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa6";
import { SlEnergy } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { Hide, Show } from '../icons/ToggleIcon';
import { Link } from 'react-router-dom';
import Preloader from '../UI/Preloader';

const Profile: React.FC = () => {
  const { data, isLoading} = useProfile();
   const [isHidden, setIsHidden] = useState(true);

   const profile = data?.data;

  const balance = profile?.account.balance;

  const formatBalance = (balance: number) => {
  return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


  const handleToggle = () => {
    setIsHidden(!isHidden); // Toggle balance and transaction visibility
  };

  if (isLoading) {
    return <div>
      <Preloader/>
    </div>;
  }

//   if (error) {
//     return <div> <div className="error-container bg-red-100 p-6 rounded-lg shadow-lg text-center">
//   <img src="/error-icon.png" alt="Error Icon" className="error-icon w-16 h-16 mx-auto mb-4" />
//   <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h1>
//   <p className="text-gray-700 mb-4">We’re sorry, but there was an issue with this part of the application.</p>
//   <button className="error-button bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300">
//     Try Again
//   </button>
// </div></div>;
//   }


  return (
    <div className ="profile md:mt-4">
    <div className='flex flex-col lg:flex-row lg:justify-between lg:gap-2'>

   <div className="bg-gradient-to-tr from-green-600 to-green-300 shadow-md rounded-lg p-4 lg:w-full">
        <div className='profile-header'>
            <div className='flex justify-between'>
                <div className='flex gap-1 items-center'>
                    <img src={profile?.avatar} alt="" className='w-5 h-5 rounded-full shadow-lg' />
                    <div className='text-lg font-semibold text-white'>Hi, {profile?.first_name}</div>
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
          <strong>Account No:</strong> {profile.account.account_number}
        </div>
        <div>
          <strong>Name:</strong> {profile.first_name} {profile.last_name}
        </div>
        <div>
          <strong>Email:</strong> {profile.email}
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
                     <Link to="/dashboard/transactions">
                    <div className='flex justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                        <span><FaClipboardList className='text-green-500 h-5 w-5'/></span> 
                        <div className='flex flex-col'>
                        <span className='text-sm md:text-base'>Transaction History</span>
                        <span className='text-xs md:text-sm text-gray-600'>View your transaction history</span>
                        </div>
                        
                        </div> 
                        <span className='text-lg text-gray-700'>{">"}</span>
                    </div>
                    </Link>

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

                     <Link to="/dashboard/deposit">
                    <div className='flex justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                        <span><SlEnergy className='text-green-500 h-5 w-5'/></span> 
                       
                        <div className='flex flex-col'>
                        <span className='text-sm md:text-base'>Transfer to Me</span>
                        <span className='text-xs md:text-sm text-gray-600'>Receive funds or payment</span>
                        </div>                
                        </div> 
                        <span className='text-lg text-gray-700'>{">"}</span>
                    </div>
                    </Link>
                
        </div>
    </div>

    
       

</div>


  );
};

export default Profile;
