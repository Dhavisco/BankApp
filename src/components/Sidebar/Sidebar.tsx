import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../icons/Logo';
import { IoLogOut } from "react-icons/io5";

const Sidebar: React.FC = () => {
  return (
    <div className="w-56 flex flex-col justify-between bg-green-100 h-full p-4">
      
      <div>
 <div className='h-10 w-10 my-4'>
        <Logo/>
        </div>

      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-gray-700 font-semibold">Home</Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/transactions" className="hover:text-gray-700 font-semibold">Transactions</Link>
        </li>
      </ul>
      </div>
     

      <div className='flex items-center hover:text-gray-700 gap-2'>
        <Link to="/" className=" font-semibold">Logout</Link>
        <IoLogOut className='h-6 w-6'/>
        </div>
    </div>
  );
};

export default Sidebar;
