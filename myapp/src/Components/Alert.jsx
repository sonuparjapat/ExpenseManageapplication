import React from 'react';

const Alert = ({ message }) => {
    // console.log(message)
  return (
    <div className="fixed top-20 left-0 w-full bg-green-500 text-white z-50 py-4 text-center">
      {message}
    </div>
  );
};

export default Alert;