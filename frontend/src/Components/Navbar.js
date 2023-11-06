import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul className=" flex justify-center py-5 border-b">
        <Link
          to="/"
          className=" border-b-2 border-white hover:border-gray-600 mr-5 p-2 hover:bg-slate-100 hover:text-gray-600 font-semibold text-gray-500 "
        >
          <li>Home</li>
        </Link>
        <Link
          to="/imagedetection"
          className=" border-b-2 border-white hover:border-gray-600 mr-5 p-2 hover:bg-slate-100 hover:text-gray-600 font-semibold text-gray-500"
        >
          <li>Image Detection</li>
        </Link>
        <Link
          to="/videodetection"
          className=" border-b-2 border-white hover:border-gray-600 mr-5 p-2 hover:bg-slate-100 hover:text-gray-600 font-semibold text-gray-500"
        >
          <li>Video Detection</li>
        </Link>
        <Link
          to="/realtimedetection"
          className=" border-b-2 border-white hover:border-gray-600 mr-5 p-2 hover:bg-slate-100 hover:text-gray-600 font-semibold text-gray-500"
        >
          <li>Realtime Detection</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
