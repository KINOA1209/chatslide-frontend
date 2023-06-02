"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupForm: React.FC = () => {
  const router = useRouter();

  /* write a function that will take the form data and send it to the backend */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name: (event.target as HTMLFormElement).fname.value,
      email: (event.target as HTMLFormElement).email.value,
      password: (event.target as HTMLFormElement).password.value,
      verification: (event.target as HTMLFormElement).verification.value,
    };

    console.log("created form data");

    try {
      const response = await fetch("/api/signup", {
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
        router.push("/signin");
      } else {
        alert("Request failed: " + response.status);
        console.log(response);
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
            htmlFor="fname"
          >
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="fname"
            type="text"
            className="form-input w-full text-gray-800"
            placeholder="Enter your name"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label
            className="block text-gray-800 text-sm font-medium mb-1"
            htmlFor="email"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="form-input w-full text-gray-800"
            placeholder="Enter your email address"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label
            className="block text-gray-800 text-sm font-medium mb-1"
            htmlFor="password"
          >
            Password <span className="text-red-600">*</span>
          </label>
          <input
            id="password"
            type="password"
            className="form-input w-full text-gray-800"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label
            className="block text-gray-800 text-sm font-medium mb-1"
            htmlFor="verification"
          >
            Verification Code <span className="text-red-600">*</span>
          </label>
          <input
            id="verification"
            type="text"
            className="form-input w-full text-gray-800"
            placeholder="Enter your verfication code"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
            Sign up
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-500 text-center mt-3">
        By creating an account, you agree to the{" "}
        <a className="underline" href="#0">
          terms & conditions
        </a>
        , and our{" "}
        <a className="underline" href="#0">
          privacy policy
        </a>
        .
      </div>
    </form>
  );
};

export default SignupForm;
