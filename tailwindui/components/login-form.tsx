"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const router = useRouter();

  /* write a function that will take the form data and send it to the backend */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      email: (event.target as HTMLFormElement).email.value,
      password: (event.target as HTMLFormElement).password.value,
      remember: (event.target as HTMLFormElement).remember.value,
    };

    console.log("created form data");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(formData);
      console.log(response);

      if (response.ok) {
        const userInfoJson = await response.json();
        console.log(userInfoJson);
        if (userInfoJson.status === "success") {
          localStorage.setItem("access_token", userInfoJson.access_token);
          localStorage.setItem("signed_in", "true");
          setTimeout(() => {
            router.push("/workflow-intro");
          }, 500);
        } else {
          toast.error(userInfoJson.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label
            className="block text-gray-800 text-sm font-medium mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-input w-full text-gray-800"
            placeholder="Enter your email address"
            maxLength={32}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <div className="flex justify-between">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <Link
              href="/reset-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Having trouble signing in?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            className="form-input w-full text-gray-800"
            placeholder="Enter your password"
            minLength={8}
            maxLength={16}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <div className="flex justify-between">
            <label className="flex items-center" htmlFor="remember">
              <input id="remember" type="checkbox" className="form-checkbox" />
              <span className="text-gray-600 ml-2">Keep me signed in</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
            Sign in
          </button>
          <ToastContainer />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
