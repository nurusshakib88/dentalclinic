import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLogin } from "../context/LoginContext";
import SiteLogo from "../assets/logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const { setUserId } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        const user_id = response.data.userId;
        setUserId(user_id);
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          setError("You are not registered to this service");
          navigate("/register");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Failed to login. Please check your email and password and try again."
        );
      });
  };

  return (
    <div className="bg-gradient-to-b from-slate-400 via-orange-300 to-orange-500 flex flex-col items-center justify-center py-12 min-h-screen">
      <div className="w-[640px]">
        <Link to="/">
          <img
            src={SiteLogo}
            className="w-[48px] mx-auto mb-8"
            alt="Site Logo"
          />
        </Link>
        <div className="w-full p-[32px] border border-secondary rounded-3xl">
          <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-secondary input-bordered bg-transparent rounded-xl"
                required
              />
            </label>
            <label className="form-control">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-secondary input-bordered bg-transparent rounded-xl"
                required
              />
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="btn border-0 text-white bg-opacity-55 rounded-full bg-[#111111] hover:bg-secondary"
            >
              Login
            </button>
            <p className="text-sm">
              By continuing, you agree to the{" "}
              <Link className="underline font-medium">Terms of uses</Link> and{" "}
              <Link className="underline font-medium">Privacy Policy</Link>.
            </p>
          </form>
        </div>
        <div className="divider divider-secondary font-medium my-10">
          New to our community
        </div>
        <NavLink
          to="/register"
          type="button"
          className="w-full btn btn-outline btn-secondary rounded-full"
        >
          Create an Account
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
