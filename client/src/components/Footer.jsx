import { Link, NavLink } from "react-router-dom";
import SiteLogo from "../assets/logo.png";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="px-36 py-10 grid grid-cols-12 gap-10">
      <div className="col-span-4">
        <img src={SiteLogo} className="w-[150px]" alt="" />

        <div className="mt-5 flex gap-3 text-footer">
          <Link to="https://www.twitter.com" target="_blank">
            <Twitter sx={{ fontSize: "30px" }} />
          </Link>
          <Link to="https://www.facebook.com" target="_blank">
            <Facebook sx={{ fontSize: "30px" }} />
          </Link>
          <Link to="https://www.instagram.com" target="_blank">
            <Instagram sx={{ fontSize: "30px" }} />
          </Link>
        </div>
      </div>

      <div className="col-span-2">
        <h1 className="font-semibold mb-4">Company</h1>

        <div className="flex flex-col gap-3">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">About Us</NavLink>
          <NavLink to="/">Services</NavLink>
          <NavLink to="/">Contact</NavLink>
        </div>
      </div>
      <div className="col-span-2">
        <h1 className="font-semibold mb-4">Products</h1>

        <div className="flex flex-col gap-3">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">About Us</NavLink>
          <NavLink to="/">Services</NavLink>
          <NavLink to="/">Contact</NavLink>
        </div>
      </div>
      <div className="col-span-2">
        <h1 className="font-semibold mb-4">Resources</h1>

        <div className="flex flex-col gap-3">
          <NavLink to="/">Blog</NavLink>
          <NavLink to="/error">404</NavLink>
          <NavLink to="/">Services</NavLink>
          <NavLink to="/">Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
