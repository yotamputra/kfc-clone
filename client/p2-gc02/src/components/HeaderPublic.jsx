import { useNavigate } from "react-router-dom";

function HeaderPublic() {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/pub");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <header className="bg-white text-red-600 p-7 flex items-center justify-between">
      <h1 className="italic text-3xl font-bold">Restaurant YFC</h1>
      <div>
        <button
          onClick={goToMenu}
          className="border border-[#EE1C2E] text-[#EE1C2E] bg-white px-4 py-2 font-semibold rounded-lg hover:bg-[#EE1C2E] hover:text-white transition duration-500 mr-3"
        >
          Menus
        </button>
        <button onClick={goToLogin} className="border border-[#EE1C2E] text-white bg-[#EE1C2E] px-4 py-2 font-semibold rounded-lg hover:bg-transparent hover:text-[#EE1C2E] hover:border-[#EE1C2E] transition duration-500">
          Log In
        </button>
      </div>
    </header>
  );
}

export default HeaderPublic;
