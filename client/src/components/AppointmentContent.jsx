import React, { useState, useEffect } from "react";
import { useAppointment } from "../context/AppointmentContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Logout from "./Logout";
import {
  AccessTime,
  AccountCircleOutlined,
  Add,
  Cached,
  Close,
  Delete,
  EditNote,
  MoreVert,
  NotificationsNoneOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

const AppointmentContents = () => {
  const {
    appointments,
    handleDelete,
    updateAppointment,
    setDate,
    setTime,
    setMsg,
    setPhone,
  } = useAppointment();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // State variables
  const [selectedRows, setSelectedRows] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [keywordFilter, setKeywordFilter] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Constants
  const rowsPerPage = 10;
  // Event handlers
  const handleRowSelect = (appointmentId) => {
    if (selectedRows.includes(appointmentId)) {
      setSelectedRows(selectedRows.filter((id) => id !== appointmentId));
    } else {
      setSelectedRows([...selectedRows, appointmentId]);
    }
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((id) => handleDelete(id));
    setSelectedRows([]);
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    updateAppointment(appointmentId, { status: newStatus });
  };

  const handleSearch = () => {
    setKeywords([...keywords, searchKeyword]);
    setKeywordFilter(searchKeyword);
  };

  const handleRemoveKeyword = (keyword) => {
    const updatedKeywords = keywords.filter((kw) => kw !== keyword);
    setKeywords(updatedKeywords);
    setKeywordFilter(""); // Clear keyword filter when a keyword is removed
  };

  const filteredAppointments = appointments.filter((appointment) => {
    // Apply date filter
    if (dateFilter && appointment.date.split("T")[0] !== dateFilter) {
      return false;
    }
    // Apply keyword filter
    if (
      keywordFilter &&
      !(
        appointment.patientName
          .toLowerCase()
          .includes(keywordFilter.toLowerCase()) ||
        appointment.service
          .toLowerCase()
          .includes(keywordFilter.toLowerCase()) ||
        appointment.msg.toLowerCase().includes(keywordFilter.toLowerCase()) ||
        appointment.status.toLowerCase().includes(keywordFilter.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });

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

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAppointments.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pt-3 pb-20 ps-3 pe-20">
      <div className="navbar z-40 mb-20">
        <div className="navbar-start flex gap-5">
          <select className="select select-bordered w-56">
            <option selected>All</option>
            <option>Select</option>
            <option>Select</option>
          </select>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search"
              id="keywordFilter"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="input input-bordered w-56"
            />
            <button className="btn btn-ghost" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="navbar-end">
          <div className="flex gap-4 items-center">
            <div className="btn btn-circle">
              <SettingsOutlined />
            </div>
            <div className="btn btn-circle">
              <NotificationsNoneOutlined />
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-circle avatar">
                <AccountCircleOutlined />
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
            <div>{user && user.name}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-medium">Appointments</h1>

        <div className="flex items-center gap-5">
          <input
            type="date"
            id="dateSelector"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="text-[14px] input"
          />

          <Link to="/appointment" className="btn btn-success text-white">
            <Add /> New Appointment
          </Link>
        </div>
      </div>
      {/* Keywords section */}
      <div className="keywords flex gap-3 items-end flex-wrap">
        {keywords.map((keyword, index) => (
          <button
            key={index}
            onClick={() => handleRemoveKeyword(keyword)}
            className="badge flex items-center gap-2"
          >
            {keyword}
            <Close sx={{ fontSize: "10px" }} />
          </button>
        ))}
      </div>

      {/* Display the count of filtered rows */}
      <div className="flex items-center justify-between pt-10">
        <p>
          Showing
          <span className="font-semibold">{` ${filteredAppointments.length} Appointments`}</span>
        </p>

        <div className="flex gap-5">
          <label className="label cursor-pointer gap-3">
            <input type="checkbox" className="checkbox rounded-none" />
            <span className="label-text">Hide Visited</span>
          </label>
          <label className="label cursor-pointer gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox rounded-none"
            />
            <span className="label-text">Show Empty</span>
          </label>

          <select className="select select-bordered w-56">
            <option selected>Display Columns</option>
            <option>Select</option>
            <option>Select</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="table mt-10">
        <thead>
          <tr className="text-lg">
            <th></th>
            <th>Time</th>
            <th>Patient</th>
            <th>Service</th>
            <th>Request</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((appointment) => (
            <tr key={appointment._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(appointment._id)}
                  onChange={() => handleRowSelect(appointment._id)}
                  className="checkbox rounded-none"
                />
              </td>
              <td className="truncate">{appointment.time}</td>

              <td className="w-32 text-ellipsis">{appointment.patientName}</td>
              <td className="w-40 text- text-ellipsis">
                {appointment.service}
              </td>
              <td>{appointment.msg}</td>
              <td>2118 Thornridge Cir. Syracuse, Connecticut 35624</td>
              <td className="w-32">
                <select
                  value={appointment.status}
                  onChange={(e) =>
                    handleStatusChange(appointment._id, e.target.value)
                  }
                  className="input"
                >
                  <option value="waiting" className="flex flex-col flex-wrap">
                    Waiting
                  </option>

                  <option value="scheduled">Scheduled</option>
                  <option value="visited">Visited</option>
                </select>
              </td>
              <td>
                <MoreVert />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete button */}
      <div className="flex justify-end mt-8">
        <button
          type="button"
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
          className="btn btn-circle disabled:bg-transparent text-gray-500"
        >
          <Delete />
        </button>{" "}
        <button className="btn btn-circle text-gray-500">
          <EditNote />
        </button>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-circle text-gray-500"
        >
          <Cached />
        </button>
      </div>

      {/* Pagination */}
      <div className="flex mt-5 justify-end">
        <ul className="pagination flex gap-3 text-[14px]">
          {/* First page button */}
          <li>
            <button
              className="btn"
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
          </li>
          {/* Previous page button */}
          <li>
            <button
              className="btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>
          {/* Display up to 5 page buttons */}
          {Array.from(
            {
              length: Math.min(
                5,
                Math.ceil(filteredAppointments.length / rowsPerPage)
              ),
            },
            (_, index) => {
              const pageNumber =
                currentPage <= 3 ? index + 1 : currentPage + index - 2;
              return (
                <li key={index}>
                  <button
                    className={`${
                      currentPage === pageNumber ? "btn btn-primary" : "btn"
                    }`}
                    onClick={() => paginate(pageNumber)}
                    disabled={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            }
          )}
          {/* Next page button */}
          <li>
            <button
              className="btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredAppointments.length / rowsPerPage)
              }
            >
              Next
            </button>
          </li>
          {/* Last page button */}
          <li>
            <button
              className="btn"
              onClick={() =>
                paginate(Math.ceil(filteredAppointments.length / rowsPerPage))
              }
              disabled={
                currentPage ===
                Math.ceil(filteredAppointments.length / rowsPerPage)
              }
            >
              Last
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AppointmentContents;
