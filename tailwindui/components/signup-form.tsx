"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userInfo } from "os";

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [countdown, setCountdown] = useState(15);

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  async function sendVerificationCode() {
    try {
      const response = await fetch("/api/send_verification_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      console.log(email);
      console.log(response);

      if (response.ok) {
        setDisabled(true);
        const interval = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
          setDisabled(false);
          setCountdown(15);
        }, 15000);

        const emailSentInfo = await response.json();
        console.log(emailSentInfo);
        if (emailSentInfo.status === "success") {
          toast.success(emailSentInfo.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(emailSentInfo.message, {
            position: "top-center",
            autoClose: 3000,
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
  }

  /* write a function that will take the form data and send it to the backend */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      username: (event.target as HTMLFormElement).username.value,
      email: (event.target as HTMLFormElement).email.value,
      password: (event.target as HTMLFormElement).password.value,
      verification_code: (event.target as HTMLFormElement).verification_code
        .value,
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
        if (userInfoJson.status === "success") {
          setTimeout(() => {
            console.log(router.push("/signin?signed_up=true"));
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
            htmlFor="username"
          >
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="username"
            type="text"
            className="form-input w-full text-gray-800"
            placeholder="Enter your username"
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
            value={email}
            onChange={handleEmailChange}
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
            htmlFor="verification_code"
          >
            Verification Code <span className="text-red-600">*</span>
          </label>
          <input
            id="verification_code"
            type="text"
            className="form-input w-full text-gray-800 mb-2"
            placeholder="Enter your verfication code"
            required
          />
          <button
            onClick={sendVerificationCode}
            type="button"
            className="bg-slate-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
          >
            {disabled
              ? `Retry after: ${countdown} seconds`
              : "Send Verification Code"}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
            Sign up
          </button>
          <ToastContainer />
        </div>
      </div>
      <div className="text-sm text-gray-500 text-center mt-3">
        By creating an account, you agree to the{" "}
        <a className="underline" href="/terms">
          terms & conditions
        </a>
        , and our{" "}
        <a className="underline" href="/privacy">
          privacy policy
        </a>
        .
      </div>
    </form>
  );
};

export default SignupForm;
