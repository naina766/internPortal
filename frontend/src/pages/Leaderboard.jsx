// File: frontend/src/pages/Leaderboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Leaderboard.css";

const Leaderboard = () => {
  const { dark, toggleTheme } = useTheme();
  const [leaders, setLeaders] = useState([]);
  const [formData, setFormData] = useState({ name: "", code: "", donations: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchLeaderboard();
  }, [search, page, limit]);

  const fetchLeaderboard = () => {
    axios.get(`http://localhost:5000/api/leaderboard?search=${search}&page=${page}&limit=${limit}`)
      .then(res => {
        setLeaders(res.data.data);
        setTotal(res.data.total);
      })
      .catch(err => console.error(err));
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const endpoint = editingId ? `/api/leaderboard/${editingId}` : "/api/leaderboard";
    const method = editingId ? "put" : "post";

    axios[method](`http://localhost:5000${endpoint}`, formData)
      .then(() => {
        fetchLeaderboard();
        setFormData({ name: "", code: "", donations: "" });
        setEditingId(null);
        setError(null);
        setSuccess(editingId ? "Entry updated successfully" : "Entry added successfully");
        setTimeout(() => setSuccess(null), 3000);
      })
      .catch(err => {
        const msg = err.response?.data?.message || "Invalid input or server error";
        setError(msg);
        setTimeout(() => setError(null), 3000);
      });
  };

  const handleEdit = leader => {
    setFormData({ name: leader.name, code: leader.code, donations: leader.donations });
    setEditingId(leader._id);
  };

  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      axios.delete(`http://localhost:5000/api/leaderboard/${id}`)
        .then(() => {
          fetchLeaderboard();
          setSuccess("Entry deleted successfully");
          setTimeout(() => setSuccess(null), 3000);
        })
        .catch(() => {
          setError("Failed to delete entry");
          setTimeout(() => setError(null), 3000);
        });
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container">
      <button onClick={toggleTheme} className="theme-toggle">
        Switch to {dark ? "Light" : "Dark"} Mode
      </button>
      <div className="banner">
  {/* <img className="leaderboard-logo"
    src={
      leaders.length === 0
        ? "/no-data-placeholder.png"
        : "/myPortalLogo.png"
    }
    alt={leaders.length === 0 ? "No entries" : "Portal Logo"} */}
  {/* /> */}
</div>


      <h2 className="leaderboard-title">Leaderboard</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Donations</th>
            <th>Actions</th>
          </tr>
        </thead>
      <tbody>
  {leaders.length > 0 ? (
    leaders.map((l, i) => (
      <tr key={i}>
        <td>{l.name}</td>
        <td>{l.code}</td>
        <td>₹{l.donations}</td>
        <td>
          <button className="btn edit" onClick={() => handleEdit(l)}>Edit</button>
          <button className="btn delete" onClick={() => handleDelete(l._id)}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="no-data">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
          alt="No interns"
          className="no-data-img"
        />
        <p>No interns found yet on the leaderboard.</p>
      </td>
    </tr>
  )}
</tbody>

      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>Prev</button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)}>Next</button>
      </div>

      <h3>{editingId ? "Edit Entry" : "Add New Entry"}</h3>
      <form className="entry-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="code" placeholder="Referral Code" value={formData.code} onChange={handleChange} required />
        <input name="donations" type="number" placeholder="Donations" value={formData.donations} onChange={handleChange} required />
        <button className="btn primary" type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      {error && <p className="message error">{error}</p>}
      {success && <p className="message success">{success}</p>}

      <Link to="/dashboard" className="btn link">Back to Dashboard</Link>
    </div>
  );
};

export default Leaderboard;
