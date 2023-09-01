'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

function GoBackButton() {
  const router = useRouter();
  return (
    <div className="max-w-sm mx-auto">
        <div className="flex flex-wrap -mx-3 mt-6">
            <div className="w-full px-3">
                <button 
                  className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full"
                  onClick={() => router.back()}
                >
                    Go Back
                </button>
            </div>
        </div>
    </div>
  );
}

export default GoBackButton;
