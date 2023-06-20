import React from 'react';
import { useNavigate } from 'react-router-dom';

function GoBackButton() {
  let navigate = useNavigate();
  return (
    <div className="max-w-sm mx-auto">
        <div className="flex flex-wrap -mx-3 mt-6">
            <div className="w-full px-3">
                <button 
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                  onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
            </div>
        </div>
    </div>
  );
}

export default GoBackButton;
