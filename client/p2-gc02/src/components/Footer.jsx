import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const goToAddUser = () => {
    navigate("/add-user");
  };

  return (
    <footer className="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
      <div className="flex justify-center items-center">
        <button
          onClick={goToAddUser}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
        >
          Add User
        </button>
      </div>
      <p className="text-center mt-2 text-sm text-gray-400">
        Only admins can access this feature
      </p>
    </footer>
  );
}
