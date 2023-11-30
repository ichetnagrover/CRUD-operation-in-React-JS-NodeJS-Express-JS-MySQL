import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, contact } = state;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/get/${id}`).then((res) => {
        setState({ ...res.data.data[0] });
      });
    } else {
      // Reset state for new contact
      setState({ ...initialState });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide a value for each field");
    } else {
      const apiUrl = id
        ? `http://localhost:5000/update/${id}`
        : "http://localhost:5000/insert";

      axios
        .request({
          url: apiUrl,
          method: id ? "put" : "post",
          data: { name, email, contact },
        })
        .then(() => {
          setState({ name: "", email: "", contact: "" });
          toast.success(
            `Contact ${id ? "Updated" : "Added"} Successfully`
          );
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name...."
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email...."
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter your contact...."
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
