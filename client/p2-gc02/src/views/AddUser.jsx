import { showErrorAlert } from "../components/Error";
import HeaderMain from "../components/HeaderMain";
import { useState } from "react";
import axios from '../config/axiosInstance'
import {useNavigate} from 'react-router-dom'

function AddUser() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState(1);

  const navigate = useNavigate()

  async function handleAddUser(e) {
    try {
      e.preventDefault();
      console.log(username, email, password, phoneNumber, address)

      const { data } = await axios({
        method: 'POST',
        url: '/add-user',
        data: {
          username, email, password, phoneNumber, address
        },
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        },
      })

      navigate('/cuisines')
    } catch (err) {
      console.log(err);
      showErrorAlert(err);
    }
  }
  
  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <HeaderMain />

      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Add User <span className="text-red-500">ONLY ADMIN!</span>
        </h1>

        <form onSubmit={handleAddUser}>
        <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm pb-1 font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm pb-1 font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm pb-1 font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm pb-1 font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm pb-1 font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="border border-[#EE1C2E] text-[#EE1C2E] bg-white px-4 py-2 font-semibold rounded-lg hover:bg-[#EE1C2E] hover:text-white transition duration-500"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser