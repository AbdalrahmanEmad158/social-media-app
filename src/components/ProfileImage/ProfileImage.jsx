import { useRef, useState } from "react";
import axios from "axios";

export default function ProfileImage({ UserData }) {
  const [preview, setPreview] = useState(UserData?.photo);
  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

 
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

  
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "https://route-posts.routemisr.com/users/upload-photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-28 h-28">
      <img
        src={
          preview ||
          "https://randomuser.me/api/portraits/men/75.jpg"
        }
        alt="profile"
        className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
      />

      <button
        onClick={handleImageClick}
        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition"
      >
        📷
      </button>

  
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}