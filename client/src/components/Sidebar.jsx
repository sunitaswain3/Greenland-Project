import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser, FaPlus, FaList, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-gradient-to-b from-[#6a11cb] via-[#2575fc] to-[#6dd5ed] text-white h-screen p-5 pt-8 relative duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <FaBars className="absolute cursor-pointer -right-3 top-9 w-7 h-7 bg-white text-[#2575fc] rounded-full" onClick={() => setIsOpen(!isOpen)} />
      <div className="flex flex-col items-center mt-10 bg-white/20 p-4 rounded-lg shadow-md">
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mb-2">
          <FaUser className="text-[#2575fc] text-3xl" />
        </div>
        {isOpen && <h1 className="text-lg font-semibold">Seller Name</h1>}
      </div>
      <hr className="my-6 border-white/40" />
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard/profile" className="flex items-center gap-4 hover:translate-x-1 duration-300">
          <FaUser /> {isOpen && 'Profile'}
        </Link>
        <Link to="/dashboard/create-land" className="flex items-center gap-4 hover:translate-x-1 duration-300">
          <FaPlus /> {isOpen && 'Create Land'}
        </Link>
        <Link to="/dashboard/view-lands" className="flex items-center gap-4 hover:translate-x-1 duration-300">
          <FaList /> {isOpen && 'View Lands'}
        </Link>
        <Link to="/" className="flex items-center gap-4 mt-4 hover:translate-x-1 duration-300">
          <FaSignOutAlt /> {isOpen && 'Logout'}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
