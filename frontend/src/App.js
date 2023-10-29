import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import ImageDetection from "./Pages/ImageDetection";
import VideoDetection from "./Pages/VideoDetection";
import RealtimeDetection from "./Pages/RealtimeDetection";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/imagedetection" element={<ImageDetection />} />
          <Route path="/videodetection" element={<VideoDetection />} />
          <Route path="/realtimedetection" element={<RealtimeDetection />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
