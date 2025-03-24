import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile_no: "",
    address: "",
  });

  // Fetch user details when component loads
  useEffect(() => {
    axios.get(`http://localhost:4000/users/${id}`).then((res) => setUser(res.data));
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/users/${id}`, user);
    navigate("/");
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={user.name} className="form-control my-2" onChange={handleChange} required />
        <input name="email" value={user.email} className="form-control my-2" onChange={handleChange} required />
        <input name="mobile_no" value={user.mobile_no} className="form-control my-2" onChange={handleChange} required />
        <input name="address" value={user.address} className="form-control my-2" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
