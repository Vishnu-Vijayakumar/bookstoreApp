import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dialogRef = useRef(null); // Reference for the dialog

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/Login", userInfo);
      if (res.data) {
        toast.success('Successfully created!');
        localStorage.setItem("Users", JSON.stringify(res.data.existingUser));
        dialogRef.current.close(); // Close the dialog on successful login
      }
    } catch (err) {
      if (err.response) {
        console.error("Response Error:", err.response.data);
        alert("Login Error: " + err.response.data.message);
      } else if (err.request) {
        console.error("Request Error:", err.request);
        alert("Login Error: No response from server");
      } else {
        console.error("Error:", err.message);
        alert("Login Error: " + err.message);
      }
    }
  };

  const closeModal = () => {
    dialogRef.current.close(); // Close the dialog when the button is clicked
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal" ref={dialogRef}>
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 className="font-bold text-lg">Login</h3>
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-sm text-red-500">This field is required</span>}
            </div>
            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your Password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-sm text-red-500">This field is required</span>}
            </div>
            <div className="flex justify-around mt-4">
              <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">Login</button>
              <p>Not registered? <Link to="/signup" className="underline text-blue-500 cursor-pointer">Signup</Link></p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
