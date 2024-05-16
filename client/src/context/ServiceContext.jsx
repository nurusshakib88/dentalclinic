import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
const ServiceContext = createContext();

export const useService = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [services, setServices] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/services/all")
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, [setServices]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/services/delete/${id}`)
      .then((res) => {
        console.log(res);
        setServices(services.filter((service) => service._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      console.log("Please upload image first");
      return;
    }
    const formData = { title, desc, imageUrl };
    try {
      const response = await axios.post(
        `http://localhost:3001/services/add`,
        formData
      );
      setServices([...services, response.data]);
      setTitle("");
      setDesc("");
      setImage(null);
      setImageUrl("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "hospitalcloud");
    data.append("cloud_name", "djtvum4xg");

    try {
      setLoading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djtvum4xg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      setLoading(false);

      const cloudData = await res.json();
      setImageUrl(cloudData.url);
      console.log("Image Upload Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        title,
        setTitle,
        desc,
        setDesc,
        image,
        setImage,
        imageUrl,
        services,
        setServices,
        Submit,
        handleImageChange,
        handleDelete,
        loading,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
