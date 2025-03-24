import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/users").then((res) => setUsers(res.data));
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:4000/users/${id}`).then(() => {
      setUsers(users.filter((user) => user._id !== id));
    });
  };

  return (
    <div>
      <Link to="/add" className="btn btn-primary mb-3">Add User</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile_no}</td>
              <td>{user.address}</td>
              <td>
                <Link to={`/edit/${user._id}`} className="btn btn-warning mx-1">Edit</Link>
                <button onClick={() => deleteUser(user._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
