import React, { useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SiteLogo from "../assets/logo.png";
import FBIcon from "../assets/fbicon.png";
import GoogleIcon from "../assets/googleicon.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [shareReg, setShareReg] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Generate options for days (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Generate options for months (January - December)
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));

  // Generate options for years from 1900 to the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  );

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", {
        name,
        email,
        gender: selectedGender,
        age: [date, month, year],
        shareReg,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gradient-to-b from-slate-400 via-orange-300 to-orange-500 flex flex-col items-center justify-center py-16">
      <div className="w-[592px]">
        {error && <div className="error">{error}</div>}
        <div>
          <img src={SiteLogo} className="w-[48px] mx-auto" alt="" />
          <h1 className="text-secondary text-[32px] font-medium mb-10 text-center">
            Sign up for free to start booking
          </h1>
          <div className="flex flex-col gap-3">
            <button className="btn btn-outline rounded-full bg-white hover:bg-secondary">
              <img src={FBIcon} className="w-7" alt="fbicon" />
              Sign up with Facebook
            </button>
            <button className="btn btn-outline rounded-full bg-white hover:bg-secondary">
              <img src={GoogleIcon} className="w-7" alt="googleicon" />
              Sign up with Google
            </button>
          </div>
        </div>

        <div className="divider my-10">OR</div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <h1 className="text-secondary font-medium text-center">
            Sign up with your email address
          </h1>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Profile Name</span>
            </div>
            <input
              type="text"
              placeholder="Enter Your Profile Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input input-secondary w-full bg-transparent rounded-xl"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-secondary w-full bg-transparent rounded-xl"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
              <span className="label-text">
                <button
                  type="button"
                  onClick={() => setVisibility(!visibility)}
                  className="flex gap-2 items-center"
                >
                  {visibility ? <Visibility /> : <VisibilityOff />}
                  {visibility ? "Unhide" : "Hide"}
                </button>
              </span>
            </div>
            <input
              type={visibility ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-secondary w-full bg-transparent rounded-xl"
            />
            <div className="label">
              <span className="label-text text-xs">
                Use 8 or more characters with a mix of letters, numbers and
                symbols
              </span>
            </div>
          </label>
          <div>
            <h1>What's your gender?</h1>
            <div className="flex gap-3">
              <label className="label cursor-pointer flex gap-2 justify-start">
                <input
                  type="radio"
                  value="male"
                  className="radio radio-sm"
                  checked={selectedGender === "male"}
                  onChange={handleGenderChange}
                />
                <span className="label-text">Male</span>
              </label>
              <label className="label cursor-pointer flex gap-2 justify-start">
                <input
                  type="radio"
                  value="female"
                  className="radio radio-sm"
                  checked={selectedGender === "female"}
                  onChange={handleGenderChange}
                />
                <span className="label-text">female</span>
              </label>
              <label className="label cursor-pointer flex gap-2 justify-start">
                <input
                  type="radio"
                  value="nonbinary"
                  className="radio radio-sm"
                  checked={selectedGender === "nonbinary"}
                  onChange={handleGenderChange}
                />
                <span className="label-text">non binary</span>
              </label>
            </div>
          </div>
          <div>
            <h1>What's your date of birth?</h1>
            <div className="grid grid-cols-3 gap-3">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Month</span>
                </div>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                  className="select select-bordered bg-transparent select-secondary rounded-xl"
                >
                  <option value="">Select Month</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Date</span>
                </div>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="select select-bordered bg-transparent select-secondary rounded-xl"
                >
                  <option value="">Select Date</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Year</span>
                </div>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="select select-bordered bg-transparent select-secondary rounded-xl"
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <label className="label cursor-pointer items-start flex justify-start gap-2">
            <input
              type="checkbox"
              value="nonbinary"
              className="checkbox checkbox-sm rounded-md checkbox-secondary"
              onChange={() => setShareReg(!shareReg)}
            />
            <span className="label-text">
              Share my registration data with our content providers for
              marketing purposes
            </span>
          </label>
          <p>
            By creating an account, you agree to the Terms of use and Privacy
            Policy.
          </p>
          <button
            type="submit"
            className="btn border-0 text-white bg-opacity-55 rounded-full bg-[#111111] hover:bg-secondary"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-center">
            Already have an ccount?{" "}
            <NavLink to="/login" className="underline">
              Log in
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
