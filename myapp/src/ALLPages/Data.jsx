import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ViewExpenses.css';
const ViewExpenses = () => {
  // Dummy data for the table
  const expenses = [
    {
      id: 1,
      name: 'Expense 1',
      remarks: 'Lorem ipsum dolor sit amet',
      category: 'Food',
      date: '2023-07-25',
      amount: 20,
      updatedAt: '2023-07-26 10:30 AM',
      createdBy: 'me',
      userEmail: '',
    },
    {
      id: 2,
      name: 'Expense 2',
      remarks: 'Consectetur adipiscing elit',
      category: 'Travel',
      date: '2023-07-26',
      amount: 50,
      updatedAt: '2023-07-26 11:45 AM',
      createdBy: 'someone_else',
      userEmail: 'john.doe@example.com',
    },
    // Add more dummy data here if needed
  ];
const [value,setValue]=useState({
  "myvalue":""
})
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [updatemodel,setUpdatemodel]=useState(false)
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
    setSelectedExpense(expense);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Here, you can perform the actual delete operation
    // For demonstration purposes, we'll just log a message.
    console.log('Expense deleted:', selectedExpense);

    // Close the modal after the delete action is performed
    setShowDeleteModal(false);
  };

  const handleSubmit = () => {
    // Perform form submission logic here
    // ...

    // Reset the form fields
    setFormData({
      name: '',
      date: null,
      category: '',
      description: '',
      amount: '',
    });

    // Close the modal after form submission
    setShowCreateModal(false);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setShowDeleteModal(false);
  };

  // updatepart>>>>>>>>>>>>>>>>>>>>>>>
  const handleupdateChange=(e)=>{
    const {name,value}=e.target
setValue((pre)=>({...pre,[name]:value}))
  }
  return (
    <div className="p-8">
      {/* Create Expense CTA Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => setShowCreateModal(true)}
      >
        Create Expense
      </button>

      {/* Table for View Expenses */}
      <div  className="table-container">
      <table className="expenses-table">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remarks
            </th>
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
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.remarks}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${expense.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.updatedAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.createdBy === 'me' ? 'me' : expense.userEmail}
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
                  setValue((pre)=>({...pre,myvalue:expense.id}))
                  setUpdatemodel(!updatemodel)}} className="text-blue-500 hover:text-blue-700">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
                onClick={closeModal}
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
            <form>
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
                <DatePicker
                  id="date"
                  name="date"
                  selected={formData.date}
                  onChange={handleDateChange}
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
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleSubmit}
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
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="myvalue"
                  value={value.myvalue}
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
                <DatePicker
                  id="date"
                  name="date"
                  selected={formData.date}
                  onChange={handleDateChange}
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
                  onClick={()=>setUpdatemodel(!updatemodel)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )} 
 















    </div>
  );
};

export default ViewExpenses;
