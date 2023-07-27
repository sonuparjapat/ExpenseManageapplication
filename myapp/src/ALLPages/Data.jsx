import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import Alert from '../Components/Alert';
import 'react-datepicker/dist/react-datepicker.css';
import './ViewExpenses.css';
import { useraddtask, useraddtaskfailure, useraddtasksuccess } from '../Redux/UserAddtask/Action';
import { useDispatch, useSelector } from 'react-redux';
import { getusertask } from '../Redux/UserNotes/Action';
import { useSearchParams,useLocation } from 'react-router-dom';
import { deletetask, deletetaskfailure, deletetasksuccess } from '../Redux/Deltetask/Action';
import { useredittask, useredittaskfailure, useredittasksuccess } from '../Redux/EditUsertask/Action';

// converting into properdate
function getMonthName(monthNumber) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  return monthNames[monthNumber - 1];
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthName = getMonthName(month);

  return `${day} ${monthName}, ${year}`;
}
const initialupdatedata={
  
name:"",
description:"",

category:"",

amount:"",

date:""

}
const ViewExpenses = ({showCreateModal,handlemodel}) => {
  const [properdate,setProperdate]=useState("")
  // Dummy data for the table
 
const [value,setValue]=useState({
  "myvalue":""
})

const [searchParams]=useSearchParams()



  
  const [allexpenses,setAllExpenses]=useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false);



// console.log(dateofexpense)

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [alertdata,setAlertdata]=useState("")
  const [updatemodel,setUpdatemodel]=useState(false)
  const dispatch=useDispatch()
  const data=useSelector((state)=>state.useraddtaskreducer)
  const myallexpenses=useSelector((state)=>state.usernotesreducer)
  const {isLoading,usernotes}=myallexpenses

// getting data first fetching
const [againfetch,setAgainfetch]=useState(false)
const userdata=useSelector((state)=>state.usersigninreducer)

const {useremail}=userdata
// console.log("useremail",useremail)
const location=useLocation()
useEffect(()=>{
const obj={
  params:{
    "name":searchParams.get("name"),
    "date":searchParams.get("date")
  }
}
dispatch(getusertask(obj))



},[location.search,againfetch])



  // creation part
 
  const handlecreatesubmit=(e)=>{
    e.preventDefault()
    // console.log(formData)
    const {amount}=formData
    let newamount=+amount
    setFormData((pre)=>({...pre,amount:+newamount}))
    dispatch(useraddtask(formData)).then((res)=>{
      dispatch(useraddtasksuccess())
      // console.log(res)
    
      setAlertdata(res.data.msg)
      closeModal()
      setAgainfetch(!againfetch)
      setTimeout(()=>{
 setAlertdata("")
      },3000)
    }).catch((err)=>{
      dispatch(useraddtaskfailure())
     setAlertdata(err.response.data.msg)
     closeModal()
     setTimeout(()=>{
setAlertdata("")
     },3000)
      
    })
  }
  const [formData, setFormData] = useState({
    name: '',
    date: null,
    category: '',
    description: '',
    amount: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date,
    }));
  };

  const handleDelete = (expense) => {
    const {_id}=expense
    setSelectedExpense(_id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Here, you can perform the actual delete operation
    // For demonstration purposes, we'll just log a message.
    // console.log(selectedExpense)
  dispatch(deletetask(selectedExpense)).then((res)=>{
    dispatch(deletetasksuccess())
    setAlertdata(res.data.msg)
    deleteModal()
    setAgainfetch(!againfetch)
    setTimeout(()=>{
      setAlertdata("")
    },3000)
    // console.log(res)
  }).catch((err)=>{
    // console.log(err)
    setAlertdata(err.response.data.msg)
    deleteModal()
    
    setTimeout(()=>{
      setAlertdata("")
    },3000)
    dispatch(deletetaskfailure())
  })

    // Close the modal after the delete action is performed
 
  };


const deleteModal=()=>{
  setShowDeleteModal(false);
}
  const closeModal = () => {
    handlemodel()
   
  };

  // updatepart>>>>>>>>>>>>>>>>>>>>>>>
  const [updateid,setUpdateId]=useState("")
  const [updatevalue,setUpdatevalue]=useState(initialupdatedata)
  const handleupdateChange=(e)=>{
    const {name,value}=e.target
setUpdatevalue((pre)=>({...pre,[name]:value}))
  }
  const handleupdatesubmit=(e)=>{
    e.preventDefault()
    const {amount,category,name,description,date}=updatevalue
    
    let obj={
amount:+amount,
category,
name,
description,date
    }
    // console.log(updateid)

  dispatch(useredittask(updateid,obj)).then((res)=>{
    setAlertdata(res.data.msg)
    dispatch(useredittasksuccess())
    setAgainfetch(!againfetch)
    setUpdatemodel(!updatemodel)
    setTimeout(()=>{
setAlertdata("")
    },3000)
  }).catch((err)=>{
    dispatch(useredittaskfailure())
    setAlertdata(err.response.data.msg)
    setTimeout(()=>{
      setAlertdata("")
    },3000)
  })
  }
  return (
    <>
    {alertdata&&<Alert message={alertdata}/>} 
   
    <div className="p-8">
      {/* Create Expense CTA Button */}
   



      {/* Table for View Expenses */}
      <div  className="table-container">
      <table className="expenses-table">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            {/* <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remarks
            </th> */}
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date of Expense
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated At
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created By
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {typeof usernotes&&usernotes.length>=1?usernotes.map((expense) => (
            <tr key={expense.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.name}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.remarks}
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(expense.date)}
                </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                INR {expense.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.updatedAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                 { useremail&&expense.createdby === useremail ? "me" : expense.createdby}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {/* Action buttons with icons */}
                <button
                  className="text-red-500 hover:text-red-700 mr-2"
                  onClick={() => handleDelete(expense)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button onClick={()=>{
                  setUpdateId(expense._id)
                 setUpdatevalue((pre)=>({...pre,name:expense.name,category:expense.category,date:expense.date,description:expense.description,amount:expense.amount}))
                  setUpdatemodel(!updatemodel)}} className="text-blue-500 hover:text-blue-700">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
      )) :""}
        </tbody>
      </table>

     {typeof usernotes&&usernotes.length==0&& <div className='flex justify-center items-center'><p className='font-bold '>No Expenses found</p></div>} 




      </div>
      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <p className="text-gray-800 mb-4">
              Are you sure you want to delete this expense?
            </p>
            <div className="flex justify-end">
              <button
                className="text-red-500 hover:text-red-700 mr-4"
                onClick={deleteModal}
              >
                No
              </button>
              <button
                className="text-green-500 hover:text-green-700"
                onClick={confirmDelete}
              >
                Yes, delete this
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Expense Form modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create Expense</h2>
            <form onSubmit={handlecreatesubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  maxLength="140"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block font-medium">
                  Date of Expense
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  selected={formData.date}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  dateFormat="yyyy-MM-dd"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block font-medium">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Health">Health</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Travel">Travel</option>
                  <option value="Education">Education</option>
                  <option value="Books">Books</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block font-medium">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  min="0"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  // onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{/* update part */}
{updatemodel && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>
            <form onSubmit={handleupdatesubmit}> 
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatevalue.name}
                  onChange={handleupdateChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  maxLength="140"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block font-medium">
                  Date of Expense
                </label>
                <input
                type="date"
                  id="date"
                  name="date"
                  value={updatevalue.date}
                  // selected={formData.date}
                  onChange={handleupdateChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  dateFormat="yyyy-MM-dd"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block font-medium">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={updatevalue.category}
                  onChange={handleupdateChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Health">Health</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Travel">Travel</option>
                  <option value="Education">Education</option>
                  <option value="Books">Books</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={updatevalue.description}
                  onChange={handleupdateChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block font-medium">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={updatevalue.amount}
                  onChange={handleupdateChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2"
                  min="0"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4"
                  onClick={()=>setUpdatemodel(!updatemodel)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  // onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )} 
 















    </div>
    </>
  );
};

export default ViewExpenses;
