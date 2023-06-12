"use client";

// export const metadata = {
//   title: 'Workflow - Dr. Lambda',
//   description: 'Create new content',
// }

import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function WorkflowIntro() {
  // const signed_in = useSearchParams().toString();
  const signed_in = localStorage.getItem("signed_in");
  useEffect(() => {
    console.log(signed_in);
    if (signed_in && signed_in === "true") {
      toast.success("Sign in successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.removeItem("signed_in");
    }
  });
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Workflow Introduction</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form action="/workflow-step1">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <p>
                    Starting from here, you can interactively create your
                    customized educational video with a few words.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                    Start
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center mt-3">
                By using our service, you agree to the{" "}
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
          </div>
        </div>
      </div>
    </section>
  );
}
