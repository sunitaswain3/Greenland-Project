import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateLand = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [pincode, setPincode] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [ok, setOk] = useState(false);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = [];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

    for (let file of files) {
      console.log("File type:", file.type); // Log the file type to debug

      // Validate the image type
      if (!validImageTypes.includes(file.type)) {
        console.error(`Invalid image type: ${file.type}`);
        continue; // Skip invalid image files
      }

      try {
        // Create a FileReader to read the file
        const base64 = await convertToBase64(file);
        base64Images.push(`data:${file.type};base64,${base64}`);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }

    setImageUrls(base64Images);
  };

  // Convert image to base64 using FileReader
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]); // Extract the base64 string
      };

      reader.onerror = () => reject("Error reading file.");

      reader.readAsDataURL(file); // Start reading the file
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      price,
      address: { state, city, area, pincode },
      images: imageUrls,
    };
    console.log("Data to be sent to the backend: ", data);


    try {
      const token = localStorage.getItem('authToken')

      const response = await axios.post(
        "http://localhost:3000/api/land/createLand",data,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log("Land created");
      setOk(response.data.message);
      setTimeout(() => setOk(""), 3000);

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setPincode("");
      setState("");
      setCity("");
      setArea("");
      setImageUrls([]);
    } catch (error) {
      console.log("Error creating land:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Land</h1>
      {ok ? <p>{ok}</p> : null}
      <form className="space-y-4 text-black" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          className="w-full p-2 border rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          placeholder="Description"
          className="w-full p-2 border rounded"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          value={price}
          placeholder="Price"
          className="w-full p-2 border rounded"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          value={state}
          placeholder="State"
          className="w-full p-2 border rounded"
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          value={city}
          placeholder="City"
          className="w-full p-2 border rounded"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          value={area}
          placeholder="Area"
          className="w-full p-2 border rounded"
          onChange={(e) => setArea(e.target.value)}
        />
        <input
          type="text"
          value={pincode}
          placeholder="Pincode"
          className="w-full p-2 border rounded"
          onChange={(e) => setPincode(e.target.value)}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full p-2"
          onChange={handleImageChange}
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateLand;



