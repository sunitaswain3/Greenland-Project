import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditLand = () => {
  const { id } = useParams();
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/api/land/getLandById/${id}`);
        setLand(res.data.data);
      } catch (err) {
        console.log('Error:', err);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleSimpleChange = (e) => {
    const { name, value } = e.target;
    let temp = land;
    if (name === "title") temp.title = value;
    if (name === "description") temp.description = value;
    if (name === "price") temp.price = value;
    setLand({ ...temp }); // Trigger re-render
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    let temp = land;
    if (!temp.address) temp.address = {};
    if (name === "state") temp.address.state = value;
    if (name === "city") temp.address.city = value;
    if (name === "area") temp.address.area = value;
    if (name === "pincode") temp.address.pincode = value;
    setLand({ ...temp }); // Trigger re-render
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const res = await axios.put(`http://localhost:3000/api/land/updateLand/${id}`,land,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
      alert("Land updated successfully")
      Navigate("/dashboard/view-lands")
    } catch (err) {
      console.log ('Error:',err)
    }
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (!land) return <p className="text-center text-red-500">Land not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-center mb-4 text-indigo-600">Edit Land - {id}</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium ">Title</label>
        <input
          name="title"
          value={land.title}
          onChange={handleSimpleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={land.description}
          onChange={handleSimpleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={land.price}
          onChange={handleSimpleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">State</label>
        <input
          name="state"
          value={land.address?.state || ''}
          onChange={handleAddressChange}
          className="w-full border px-3 py-2 rounded text-black"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">City</label>
        <input
          name="city"
          value={land.address?.city || ''}
          onChange={handleAddressChange}
          className="w-full border px-3 py-2 rounded text-black"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Area</label>
        <input
          name="area"
          value={land.address?.area || ''}
          onChange={handleAddressChange}
          className="w-full border px-3 py-2 rounded text-black"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Pincode</label>
        <input
          name="pincode"
          value={land.address?.pincode || ''}
          onChange={handleAddressChange}
          className="w-full border px-3 py-2 rounded text-black"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Images</label>
        <div className="flex gap-2">
          {land.imageUrls && land.imageUrls.length > 0 ? (
            land.imageUrls.map((url, i) => (
              <img key={i} src={url} alt={`img-${i}`} className="w-20 h-20 rounded border" />
            ))
          ) : (
            <p>No images</p>
          )}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Save
      </button>
    </div>
  );
};

export default EditLand;