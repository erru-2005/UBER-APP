import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { userDataProvider } from "../context/UserContext";

const UserSignup = () => {
  const { data, setData } = useContext(userDataProvider);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.fullname.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      setFormData((prevState) => ({
        ...prevState,
        fullname: {
          ...prevState.fullname,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      const newUser = {
        fullname: {
          firstname: formData.fullname.firstName,
          lastname: formData.fullname.lastName,
        },
        email: formData.email,
        password: formData.password,
      };
      try {
        const resp = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/register`,
          newUser
        );
        setData(resp.data);
        localStorage.setItem("token", resp.data.token);
        if (resp.status === 201) {
         
          navigate("/home");
        }
      } catch (err) {
        if (err.response.status === 400) {
          alert("User already exists");
        }else if(resp.status===500){
          alert("Internal server error")
        }
      }
      // Reset form
      setFormData({
        fullname: {
          firstName: "",
          lastName: "",
        },
        email: "",
        password: "",
      });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join the Uber Community
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start riding or driving with us today!
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.fullname.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.fullname.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={`mt-1 block w-full rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`mt-1 block w-full rounded-md border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/Userlogin"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
