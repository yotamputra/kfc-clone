import { Outlet } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div>
      <HeaderMain/>
      <Outlet />
      <Footer/>
    </div>
  );
}
