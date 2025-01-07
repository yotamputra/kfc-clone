import { useNavigate } from "react-router-dom";
import TableCategory from "../components/TableCategory";

function Cuisine() {
  const data = [
    {
        "id": 1,
        "name": "Chicken",
        "createdAt": "2024-11-15T09:34:30.458Z",
        "updatedAt": "2024-11-15T09:34:30.458Z"
    },
    {
        "id": 2,
        "name": "Soup",
        "createdAt": "2024-11-15T09:34:30.458Z",
        "updatedAt": "2024-11-15T09:34:30.458Z"
    }
  ];

  const navigate = useNavigate()

  const goToAddMenu = () => {
    navigate('/cuisines/add')
  }

  return (
    <div className="bg-gray-100 font-sans">

      <main className="p-6">
      <div className="flex items-center justify-between">
            <h1 className="pb-5 px-4 text-left text-lg font-semibold">
              List Category
            </h1>
            <button onClick={goToAddMenu} className="bg-red-600 text-white px-6 py-3 mb-5 font-semibold rounded-lg hover:bg-red-700 border-2 border-solid border-white shadow-lg transition duration-300 transform hover:scale-105">
              Add Menu
            </button>
          </div>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left text-lg font-semibold text-gray-700">Name</th>
            </tr>
          </thead>

          <tbody >
            {data.map((item) => (
              <TableCategory key={item.id} item={item}/>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Cuisine;
