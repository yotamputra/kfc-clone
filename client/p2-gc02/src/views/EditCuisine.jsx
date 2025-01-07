import { useNavigate, useParams } from "react-router-dom";
import { showErrorAlert } from "../components/Error";
import { useState, useEffect } from "react";
import axios from "../config/axiosInstance";
import showLoading from "../components/Loading"
import Swal from "sweetalert2";

function addCuisine() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams()

  async function fetchCuisineById() { //Fetch data by id dari db to display
    try {
      setIsLoading(true);

      const access_token = localStorage.getItem("access_token");

      const { data } = await axios({
        method: "GET",
        url: "/cuisines/" + id,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // console.log(data, "<---");
      const { name, description, price, imgUrl, categoryId } = data
      setName(name)
      setDescription(description)
      setPrice(price)
      setImgUrl(imgUrl)
      setCategoryId(categoryId)
    } catch (err) {
      // console.log(err, "<---");
      showErrorAlert(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    showLoading();
  } else {
    Swal.close();
  }

  useEffect(() => {
    fetchCuisineById();
  }, []);

  async function handleAdd(e) {
    try {
      e.preventDefault();
      // console.log(name, description, price, imgUrl, categoryId);

      const { data } = await axios({
        method: 'PUT',
        url: '/cuisines/' + id,
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
          Edit Menu
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
            Update Menu
          </button>
        </form>
      </div>
    </div>
  );
}

export default addCuisine;
