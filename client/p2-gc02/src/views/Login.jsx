import { useState } from "react";
import axios from "../config/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { showErrorAlert } from "../components/Error";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    try {
      e.preventDefault();
      const { data } = await axios({
        method: "POST",
        url: "/login",
        data: {
          email,
          password,
        },
      });

      localStorage.setItem("access_token", data.access_token);
      navigate("/cuisines");
    } catch (err) {
      console.log(err.response.data.message);
      showErrorAlert(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full shadow-2xl max-w-md bg-white p-8">
        <h2 className="text-2xl font-bold text-center text-[#EE1C2E] mb-6 italic">
          LOGIN
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 pb-1"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 pb-1"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center">
          <p className="mt-4">
            Explore our{" "}
            <Link to="/pub" className="underline">
              Public Page
            </Link>{" "}
            without login
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
