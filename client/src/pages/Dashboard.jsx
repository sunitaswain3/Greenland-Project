import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SellerProfile from './SellerProfile';
import CreateLand from './CreateLand';
import ViewLands from './ViewLands';
import EditLand from './EditLand';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen">
        <Routes>
          <Route path="profile" element={<SellerProfile />} />
          <Route path="create-land" element={<CreateLand />} />
          <Route path="view-lands" element={<ViewLands />} />
          <Route path="edit-lands/:id" element={<EditLand />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
