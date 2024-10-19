import { Outlet } from "react-router-dom";
import Navbar from "./components/nav/Navbar.jsx";

function App() {
  return (
    <>
    <div className="flex justify-center bg-gray-100">
      <Navbar />
      </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-5">
      <Outlet />
    </div>
    </>
  );
}

export default App;
