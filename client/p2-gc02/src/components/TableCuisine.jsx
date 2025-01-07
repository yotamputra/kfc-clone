import { useNavigate } from "react-router-dom";
import axios from '../config/axiosInstance'
import { showErrorAlert } from "./Error";

function TableCuisine({ item, fetchCuisines }) {
  // console.log(item)
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: '/cuisines/' + item.id,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
        },
      })

      fetchCuisines()
    } catch (err) {
      // console.log(err)
      showErrorAlert(err)
    }
  }

  const goToEdit = () => {
    navigate("/cuisines/edit/" + item.id);
  };

  const goToUpload = () => {
    navigate("/cuisines/upload/" + item.id);
  };

  return (
    <>
      <tr key={item.id}>
        <td className="py-2 px-4">{item.name}</td>
        <td className="py-2 px-4">{item.description}</td>
        <td className="py-2 px-4">{item.price}</td>
        <td className="py-2 px-4">
          <img
            src={item.imgUrl}
            alt={item.name}
            className="w-16 h-16 object-cover"
          />
        </td>
        <td className="py-2 px-4">{item.User.username}</td>
        <td className="py-2 px-4 space-x-2">
          <button
            onClick={goToEdit}
            className="bg-red-600 text-white py-1 px-4 rounded-md border-2 border-red-600 hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={goToUpload}
            className="bg-white text-red-600 py-1 px-4 rounded-md border-2 border-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
          >
            Upload Image
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-1 px-4 rounded-md border-2 border-red-600 hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
          >
            DELETE
          </button>

        </td>
      </tr>
    </>
  );
}

export default TableCuisine;
