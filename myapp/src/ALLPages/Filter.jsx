import React from 'react'
import ViewExpenses from './Data'
import { useEffect,useState } from 'react'
import { Dispatch,useSelector } from 'react'
import { useSearchParams } from 'react-router-dom'
export default function Filter() {
    const [searchParams,setSearchParams]=useSearchParams()
    const [name,setName]=useState(searchParams.get("name")||"")
    const [dateofexpense,setDateofexpense]=useState(searchParams.get("date")||"")
    const [showCreateModal, setShowCreateModal] = useState(false);
    const handlemodel=()=>{
        setShowCreateModal(!showCreateModal)
    }
    useEffect(()=>{
        let params={}
        name&&(params.name=name)
        dateofexpense&&(params.date=dateofexpense)
        setSearchParams(params)
          
        },[name,dateofexpense])
  return (
    <>
    <div>
 <div className="flex-col md:flex-row  justify-between bg-gray-100 p-8 rounded-lg shadow-lg">
        {/* First Child */}
        <div className="flex justify-center items-center">
        <p className='font-bold'>My Expense Manager</p>
        </div>
        {/* Second Child */}
        <div className="flex flex-col md:flex-row justify-between gap-6 p-8 rounded-lg shadow-lg" >
     
       <div> 
        
                <input
                  id="date"
                  name="date"
                  type="date"
                  // selected={dateofexpense}
                  onChange={(e)=>setDateofexpense(e.target.value)}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  dateFormat="yyyy-MM-dd"
                  required
                />
      </div> 
      <div>
   
          {/* <label className="block text-gray-700 font-bold mb-2">Search by Name:</label> */}
          {/* You can add the search input component here */}
          <input
            type="text"
            onChange={(e)=>setName(e.target.value)}
            placeholder="Search by name..."
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          /></div>


          <div>
          <button
        className="bg-blue-500 text-white  px-4 py-2 rounded-lg "
        onClick={handlemodel}
      >
        Create Expense
      </button>
          </div>
        </div>
      </div>
    



    </div>

<ViewExpenses showCreateModal={showCreateModal} handlemodel={handlemodel}/>


    </>
  )
}
