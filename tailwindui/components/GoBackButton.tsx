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
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
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
