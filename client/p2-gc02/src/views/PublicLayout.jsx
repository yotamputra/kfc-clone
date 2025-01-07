import { Outlet } from "react-router-dom";
import HeaderPublic from "../components/HeaderPublic";

export default function PublicLayout() {
  return (
    <div>
      <HeaderPublic />
      <Outlet />
    </div>
  );
}
