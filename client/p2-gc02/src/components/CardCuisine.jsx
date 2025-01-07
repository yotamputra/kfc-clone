import { useNavigate } from "react-router-dom";

function CardCuisine({ data }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/pub/${data.id}`)
  }

  return (
    <div onClick={handleClick} className="bg-white rounded-lg shadow p-4 cursor-pointer group relative">
      <img
        src={data.imgUrl}
        alt={data.name}
        className="w-full h-33 object-cover rounded-lg mb-4 group-hover:scale-110 transition-transform duration-500"
      />
      <h2 className="text-lg font-semibold mb-2">{data.name}</h2>
      <p className="text-sm text-gray-600 mb-4 pb-3">{data.description}</p>

      <p className="text-red-500 absolute bottom-4 right-4 text-s">
        Click to see detail
      </p>
    </div>
  );
}

export default CardCuisine;
