import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProfileImg from "../assets/profile.png";
import Logout from "../components/Logout";
import { Home } from "@mui/icons-material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/user", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setFname(response.data.fname);
          setLname(response.data.lname);
          setEmail(response.data.email);
          setPassword(response.data.password);
          setUserType(response.data.userType);
          setImageUrl(response.data.imageUrl);
        })
        .catch((error) => {
          setError("Error fetching user data");
          console.log("Error fetching user data:", error);
        });
    } else {
      setError("No token found");
      console.log("No token found");
    }
  }, []);

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

      const cloudData = await res.json();
      setImageUrl(cloudData.url);
      setLoading(false);
      console.log("Image Upload Successfully");
    } catch (error) {
      setLoading(false);
      setError("Error uploading image");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fname") {
      setFname(value);
    } else if (name === "lname") {
      setLname(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "userType") {
      setUserType(value);
    } else if (name === "address") {
      setUserType(value);
    } else if (name === "city") {
      setUserType(value);
    } else if (name === "contact") {
      setUserType(value);
    } else if (name === "state") {
      setUserType(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const updatedData = {
      name: fname + " " + lname,
      email,
      address,
      contact,
      city,
      state,
      userType,
      imageUrl,
    };
    axios
      .put(`http://localhost:3001/users/${user._id}`, updatedData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUser(response.data);
        setEditMode(false);
        setError(null);
      })
      .catch((error) => {
        setError("Error updating profile");
        console.error("There was an error updating the profile!", error);
      });
  };

  if (error) {
    return (
      <div className="px-36 bg-red-100 text-red-500 h-screen">{error}</div>
    );
  }

  return (
    <div className="px-36 bg-gradient-to-b from-slate-400 via-orange-300 to-orange-500">
      {user ? (
        <div className="px-36 py-10">
          {editMode ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 w-full"
            >
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-bold">Edit Profile</h1>{" "}
                <div className="flex items-center gap-5">
                  <Link
                    to="/"
                    className="w-12 h-12 btn btn-circle avatar bg-primary"
                  >
                    <Home sx={{ fontSize: "30px" }} />
                  </Link>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-circle w-12 h-12 bg-primary"
                    >
                      <img
                        src={user.imageUrl}
                        className="w-full aspect-square object-cover rounded-full opacity-80"
                        alt="Profile"
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-40 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link to="/profile" className="justify-between">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/my-appointments">Appointments</Link>
                      </li>
                      <li>
                        <Logout />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="ms-auto">
                <label htmlFor="file-upload" className="cursor-pointer">
                  {image ? (
                    <img
                      className="w-[110px] bg-primary p-[10px] aspect-square rounded-full object-cover"
                      src={URL.createObjectURL(image)}
                      alt="Profile"
                    />
                  ) : (
                    <img
                      className="w-[110px] bg-primary p-[10px] aspect-square rounded-full object-cover"
                      src={user.imageUrl}
                      alt="Profile"
                    />
                  )}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="flex gap-10">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-bold">First Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={fname}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-bold">Last Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={lname}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-bold">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="Type here"
                  value={email}
                  disabled
                  onChange={handleChange}
                  className="input input-bordered w-full "
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-bold">Contact Number</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={contact}
                  onChange={handleChange}
                  className="input input-bordered w-full "
                />
              </label>
              <div className="flex gap-10">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-bold">City</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={contact}
                    onChange={handleChange}
                    className="input input-bordered w-full "
                  />
                </label>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-bold">State</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={contact}
                    onChange={handleChange}
                    className="input input-bordered w-full "
                  />
                </label>
              </div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-bold">Password</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={password}
                  disabled
                  onChange={handleChange}
                  className="input input-bordered w-full "
                />
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="btn btn-white px-10"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-10">
                  {loading ? "Loading..." : "Save"}
                </button>
              </div>
            </form>
          ) : (
            <div className="h-[90vh]">
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-bold">Profile</h1>{" "}
                <div className="flex items-center gap-5">
                  <Link
                    to="/"
                    className="w-12 h-12 btn btn-circle avatar bg-primary"
                  >
                    <Home sx={{ fontSize: "30px" }} />
                  </Link>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-circle w-12 h-12 bg-primary"
                    >
                      <img
                        src={user.imageUrl}
                        className="w-full aspect-square object-cover rounded-full opacity-80"
                        alt="Profile"
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-40 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link to="/profile" className="justify-between">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/my-appointments">Appointments</Link>
                      </li>
                      <li>
                        <Logout />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold capitalize mb-5">
                {user.name}
              </h1>
              <p>Email: {user.email}</p>
              {contact && <p>Phone: {user.contact}</p>}
              {address && <p>Adress: {user.address}</p>}
              {city && <p>City: {user.city}</p>}
              {state && <p>State: {user.state}</p>}
              <button
                onClick={() => setEditMode(true)}
                className="btn btn-primary mt-4"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="p-36 h-screen">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
