import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { captainData, updateCaptainData } = useContext(CaptainContext);

  const [form, setForm] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
    phoneNumber: "",
    vehicle: {
      color: "",
      type: "",
      plate: "",
      capacity: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested updates
    if (name === "firstName" || name === "lastName") {
      setForm((prev) => ({
        ...prev,
        fullName: {
          ...prev.fullName,
          [name]: value,
        },
      }));
    } else if (
      name === "color" ||
      name === "type" ||
      name === "plate" ||
      name === "capacity"
    ) {
      setForm((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., send data to your server
    const newCaptain = {
      fullname: {
        firstname: form.fullName.firstName,
        lastname: form.fullName.lastName,
      },
      email: form.email,
      password: form.password,
      phoneNumber: form.phoneNumber,
      vehicle: {
        color: form.vehicle.color,
        plate: form.vehicle.plate,
        capacity: form.vehicle.capacity,
        vehicleType: form.vehicle.type,
      },
    };
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/captains/register`,
        newCaptain
      );
      if (resp.status === 201) {
        // Assuming the response contains the captain data
        updateCaptainData(resp.data);

        navigate("/captain-home");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Captain already exists");
      }
    }
    // Reset form after submission
    setForm({
      fullName: { firstName: "", lastName: "" },
      email: "",
      password: "",
      phoneNumber: "",
      vehicle: {
        color: "",
        type: "",
        plate: "",
        capacity: "",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <div className="bg-black text-white text-center py-4 rounded-lg mb-6">
          <h2 className="text-2xl font-bold">Become an Uber Captain</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="input-style"
              name="firstName"
              placeholder="First Name"
              value={form.fullName.firstName}
              onChange={handleChange}
              required
            />
            <input
              className="input-style"
              name="lastName"
              placeholder="Last Name"
              value={form.fullName.lastName}
              onChange={handleChange}
              required
            />
            <input
              className="input-style sm:col-span-2"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="input-style sm:col-span-2"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              className="input-style sm:col-span-2"
              name="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              className="input-style"
              name="color"
              placeholder="Vehicle Color"
              value={form.vehicle.color}
              onChange={handleChange}
              required
            />
            <select
              className="input-style"
              name="type"
              value={form.vehicle.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
            <input
              className="input-style"
              name="plate"
              placeholder="Vehicle Plate"
              value={form.vehicle.plate}
              onChange={handleChange}
              required
            />
            <input
              className="input-style"
              name="capacity"
              type="number"
              placeholder="Vehicle Capacity"
              value={form.vehicle.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
