"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function ResetPassword(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [showFields, setShowFields] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmationCode(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Perform validation and submit the email address
    // You can add your own logic here

    // Show the success message and confirmation code field
    setEmailSent(true);
    setShowFields(true);
  }

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 mb-4">Reset password</h1>
            <p className="text-xl text-gray-600">Enter the email address you used when you signed up for your account</p>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                  <input id="email" type="email" className="form-input w-full text-gray-800" placeholder="Enter your email address" value={email} onChange={handleEmailChange} required />
                </div>
              </div>

              {emailSent && (
                <p className="text-sm text-green-600 mb-4">Email sent successfully. Please check your email for the confirmation code.</p>
              )}

              {showFields && (
                <>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="newPassword">New Password <span className="text-red-600">*</span></label>
                      <input id="newPassword" type="password" className="form-input w-full text-gray-800" placeholder="Enter your new password" value={newPassword} onChange={handlePasswordChange} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="code">Confirmation Code <span className="text-red-600">*</span></label>
                      <input id="code" type="text" className="form-input w-full text-gray-800" placeholder="Enter the confirmation code" value={confirmationCode} onChange={handleCodeChange} required />
                    </div>
                  </div>
                </>
              )}

              {!showFields ? (
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Send reset link</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Reset Password</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


