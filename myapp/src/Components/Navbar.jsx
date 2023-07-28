import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Site Logo */}
          <Link to="/" className="text-white text-xl font-bold hidden xs:block sm:block">Expense Manager</Link>

          {/* Navbar Buttons */}
          <div className="flex justify-between items-center w-full md:w-2/5 lg:w-1/5 " >
           <Link to="/login"> <button className="mr-4 text-white">Login</button></Link>
           <Link to="/expenses"> <button className="text-white bg-blue-700 px-4 py-2 rounded">View Expenses</button></Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
