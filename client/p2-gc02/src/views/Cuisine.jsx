import TableCuisine from "../components/TableCuisine";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import { showErrorAlert } from "../components/Error";
import showLoading from "../components/Loading";
import Swal from "sweetalert2";

function Cuisine() {
  const [cuisines, setCuisines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCuisines() {
    try {
      setIsLoading(true);

      const access_token = localStorage.getItem("access_token");

      const { data } = await axios({
        method: "GET",
        url: "/cuisines",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // console.log(data, "<---");

      setCuisines(data);
    } catch (err) {
      // console.log(err, "<---");
      showErrorAlert(err)
    } finally {
      setIsLoading(false);
    }
  }

  if(isLoading) {
    showLoading()
  } else {
    Swal.close()
  }

  useEffect(() => {
    fetchCuisines();
  }, []);

  const navigate = useNavigate();

  const goToAddMenu = () => {
    navigate("/cuisines/add");
  };

  return (
    <>
      <div className="bg-gray-100 font-sans">
        <main className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="pb-5 px-4 text-left text-lg font-semibold">
              List Menu
            </h1>
            <button
              onClick={goToAddMenu}
              className="bg-red-600 text-white px-6 py-3 mb-5 font-semibold rounded-lg hover:bg-red-700 border-2 border-solid border-white shadow-lg transition duration-300 transform hover:scale-105"
            >
              Add Menu
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Author</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {cuisines.map((item) => (
                <TableCuisine key={item.id} item={item} fetchCuisines={fetchCuisines}/>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}

export default Cuisine;
