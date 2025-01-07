import { useNavigate } from "react-router-dom";
import { showErrorAlert } from "../components/Error";
import { useState } from "react";
import axios from '../config/axiosInstance'

function addCuisine() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState(1);

  async function handleAdd(e) {
    try {
      e.preventDefault();
      console.log(name, description, price, imgUrl, categoryId)

      const { data } = await axios({
        method: 'POST',
        url: '/cuisines',
        data: {
          name, description, price, imgUrl, categoryId
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
    <div className="bg-gray-100 font-sans min-h-screen pt-5">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Add Menu
        </h1>

        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm pb-1 font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm pb-1 font-medium text-gray-600"
            >
              Description
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm pb-1 font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="imgUrl"
              className="block text-sm pb-1 font-medium text-gray-600"
            >
              Image URL
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setImgUrl(e.target.value)}
              value={imgUrl}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="categoryId"
              className="block text-sm pb-1 font-medium text-gray-600"
            >
              Category
            </label>
            <select
              id="categoryId"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
            >
              <option value={1}>Chicken</option>
              <option value={2}>Soup</option>
            </select>
          </div>

          <button
            type="submit"
            className="border border-[#EE1C2E] text-[#EE1C2E] bg-white px-4 py-2 font-semibold rounded-lg hover:bg-[#EE1C2E] hover:text-white transition duration-500"
          >
            Add Menu
          </button>
        </form>
      </div>
    </div>
  );
}

export default addCuisine;
