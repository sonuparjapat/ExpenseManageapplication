import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalPages }) => {
    const [searchParams,setSearchParams]=useSearchParams()
    const [currentpage,setCurrentpage]=useState(searchParams.get("page")||1)
    useEffect(()=>{
setSearchParams({
    "page":currentpage
})
    },[currentpage])
  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => setCurrentpage((pre)=>pre-1)}
        disabled={+currentpage === 1}
        className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-gray-600">
        Page {currentpage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentpage((pre)=>+Number(pre)+1)}
        disabled={+currentpage === +totalPages}
        className="px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;