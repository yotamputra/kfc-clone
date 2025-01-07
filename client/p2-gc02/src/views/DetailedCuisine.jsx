import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from '../config/axiosInstance'
import { showErrorAlert } from "../components/Error"

function DetailedCuisine() {
  // const data = {
  //   name: "Cream Soup",
  //   description: "Delicious cream soup.",
  //   price: 10000,
  //   imgUrl: "https://static.order.kfcku.com/images/items/lg/8378.jpg?v=ELErO4",
  //   categoryId: 2,
  //   authorId: 2,
  // };

  const { id } = useParams()
  const [cuisine, setCuisine] = useState({})

  const fetchCuisineById = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/pub/" + id
      })

      setCuisine(data)
    } catch(err) {
      console.log(err)
      showErrorAlert(err)
    }
  }

  useEffect(() => {
    fetchCuisineById()
  }, [])

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

          <p className="text-xl font-bold text-red-500 mb-6">Rp {cuisine.price}</p>
        </div>
      </main>
    </div>
  );
}

export default DetailedCuisine;
