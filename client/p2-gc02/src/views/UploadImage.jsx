import { showErrorAlert } from "../components/Error";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../config/axiosInstance";
import Swal from "sweetalert2";
import showLoading from "../components/Loading";

function EditImage() {
  const { id } = useParams();
  const [cuisine, setCuisine] = useState({});
  const access_token = localStorage.getItem("access_token");
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const fetchCuisineById = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/cuisines/" + id,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // console.log(data);

      setCuisine(data);
    } catch (err) {
      console.log(err);
      showErrorAlert(err);
    }
  };

  useEffect(() => {
    fetchCuisineById();
  }, []);

  const handleUpdateImage = async () => {
    setIsLoading(true);

    // console.log(file)
    if (!file) {
      Swal.fire("Please insert new Image");
    }

    const formData = new FormData();
    formData.append("imgUrl", file);

    try {
      await axios({
        method: "PATCH",
        url: `/cuisines/` + id,
        data: formData,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      navigate('/cuisines')
    } catch (err) {
      // console.log(err)
      showErrorAlert(err);
    } finally {
      setIsLoading(false);
    }
  };

  if(isLoading) {
    showLoading()
  } else {
    Swal.close()
  }

  return (
    <div className="font-sans">
      <hr className="border-t-2 border-black" />

      <main className="p-6 flex items-center justify-center">
        <div className="w-2/3 pr-15 group">
          <img
            src={cuisine.imgUrl}
            alt={cuisine.name}
            className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="w-2/3 pl-20">
          <h1 className="text-5xl font-semibold text-gray-800 mb-4">
            {cuisine.name}
          </h1>

          <p className="text-2xl text-gray-600 mb-4">{cuisine.description}</p>

          <p className="text-xl font-bold text-red-500 mb-6">
            Rp {cuisine.price}
          </p>

          <label
            htmlFor="categoryId"
            className="block text-sm pb-1 font-medium text-gray-600"
          >
            Insert New Image
          </label>
          <input
            type="file"
            className="border border-gray-300 rounded-lg mb-4 p-2"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={handleUpdateImage}
            className="border border-[#EE1C2E] text-[#EE1C2E] bg-white px-4 py-2 font-semibold rounded-lg hover:bg-[#EE1C2E] hover:text-white transition duration-500"
          >
            Update Image
          </button>
        </div>
      </main>
    </div>
  );
}

export default EditImage;
