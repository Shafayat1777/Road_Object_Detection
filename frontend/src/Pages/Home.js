import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" h-screen flex justify-center">
      <div className="border w-[1100px] flex flex-col items-center text-gray-600 ">
        <h1 className="text-3xl font-semibold mt-20 underline">
          Road object Detection
        </h1>
        <h2 className="text-3xl mt-10">Welcome!</h2>
        <p className="text-lg mt-10 font-semibold">
          Please choose from what type of data do you wish to detect road
          objects from
        </p>
        <div className="mt-5">
          <Link to="/imagedetection">
            <label className="border text-lg p-2 font-semibold bg-slate-100 cursor-pointer hover:bg-slate-200 hover:border-b-2 mr-5 hover:text-gray-800">
              Image
            </label>
          </Link>
          <Link to="/videodetection">
            <label className="border text-lg p-2 font-semibold bg-slate-100 cursor-pointer hover:bg-slate-200 hover:border-b-2 mr-5 hover:text-gray-800">
              Video
            </label>
          </Link>

          <Link to="/realtimedetection">
            <label className="border text-lg p-2 font-semibold bg-slate-100 cursor-pointer hover:bg-slate-200 hover:border-b-2 mt-5 hover:text-gray-800">
              Realtime
            </label>
          </Link>
        </div>{" "}
      </div>
    </div>
  );
};

export default Home;
