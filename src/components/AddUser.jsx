import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [user, setUser] = useState({ name: "", email: "", mobile_no: "", address: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/users", user);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" className="form-control my-2" onChange={handleChange} required />
      <input name="email" placeholder="Email" className="form-control my-2" onChange={handleChange} required />
      <input name="mobile_no" placeholder="Mobile No" className="form-control my-2" onChange={handleChange} required />
      <input name="address" placeholder="Address" className="form-control my-2" onChange={handleChange} required />
      <button type="submit" className="btn btn-success">Add User</button>
    </form>
  );
}

export default AddUser;
