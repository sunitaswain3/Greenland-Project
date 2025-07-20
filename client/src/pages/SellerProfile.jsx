import React from 'react';

const SellerProfile = () => {
  return (
    <div className="bg-white text-black p-8 rounded shadow-lg w-full max-w-md mx-auto">
      <div className="flex flex-col items-center">
        <div className="bg-green-600 rounded-full h-32 w-32 flex items-center justify-center mb-6 text-white text-5xl">
          👤
        </div>
        <h1 className="text-2xl font-bold mb-2">Seller Name</h1>
        <hr className="w-full border-gray-300 mb-4" />
        <p><strong>Email:</strong> seller@example.com</p>
        <p><strong>Phone:</strong> +91 9876543210</p>
      </div>
    </div>
  );
};

export default SellerProfile;
