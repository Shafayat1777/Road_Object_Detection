import { Helmet } from "react-helmet";
import React, { useState, useRef } from "react";

const VideoDetection = () => {
  const PUBLISHABLE_ROBOFLOW_API_KEY = "rf_7xdrVJjmZZgcvqzqFZEEHHnqRV03";
  const MODEL_NAME = "capstone-c-final-dataset-1-vgfa5";
  const MODEL_VERSION = 3;
  const [file, setFile] = useState(null);
  const [videoLoad, setVideoLoad] = useState(false);
  const [frames, setFrames] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const getModel = () => {
    window.roboflow
      .auth({
        publishable_key: PUBLISHABLE_ROBOFLOW_API_KEY,
      })
      .load({
        model: MODEL_NAME,
        version: MODEL_VERSION,
        onMetadata: function (m) {
          console.log("model loaded");
        },
      })
      .then((model) => {
        if (frames.length > 0) {
          frames.forEach((frame) => {
            console.log("starting new frame...");
            detect(model, frame);
          });
        } else {
          console.log("no frames available");
        }
        console.log(predictions);
      });

    //const detections = await model.detect(video);

    // context.drawImage(video, 0, 0, 640, 640);
    // console.log("Model: ", model);
  };

  const detect = (model, frame) => {
    model.detect(frame).then((pred) => {
      setPredictions((prevPredictions) => [...prevPredictions, pred]);
      console.log(pred);
      // console.log(`Done ${predictions.length}/${frames.length} ${pred.time.toFixed(2)}ms : ${pred}`);
    });
  };

  const handleVideoUpload = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!file) return;

    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      setVideoLoad(true);
    };
  };

  const extractFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //const detections = await model.detect(video);

    context.drawImage(video, 0, 0, 640, 640);
    // drawBoxes(detections, context);
    // You can save or process the frame as needed.
    //const frameDataUrl = canvas.toDataURL("image/jpeg");
    // setIsvideo(canvas);
    // setFrames((prevFrames) => [...prevFrames, canvas]);
    // Advance the video by 10ms (0.01 seconds)
    // if (video.currentTime < video.duration) video.currentTime += 0.03;

    setFrames((prevFrames) => [...prevFrames, video]);
    // Schedule the next frame extraction
    if (video.currentTime < video.duration) {
      video.currentTime += 1;
      setTimeout(extractFrame, 10);
    } else {
      console.log("extraction done");
    }
  };

  // const drawBoxes = (detections, ctx) => {
  //   ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  //   detections.forEach((row) => {
  //     if (true) {
  //       //video
  //       var temp = row.bbox;
  //       temp.class = row.class;
  //       temp.color = row.color;
  //       temp.confidence = row.confidence;
  //       row = temp;
  //     }

  //     if (row.confidence < 0) return;

  //     //dimensions
  //     var x = row.x - row.width / 2;
  //     var y = row.y - row.height / 2;
  //     var w = row.width;
  //     var h = row.height;

  //     //box
  //     ctx.beginPath();
  //     ctx.lineWidth = 1;
  //     ctx.strokeStyle = row.color;
  //     ctx.rect(x, y, w, h);
  //     ctx.stroke();

  //     //shade
  //     ctx.fillStyle = "black";
  //     ctx.globalAlpha = 0.2;
  //     ctx.fillRect(x, y, w, h);
  //     ctx.globalAlpha = 1.0;

  //     //label
  //     var fontColor = "black";
  //     var fontSize = 12;
  //     ctx.font = `${fontSize}px monospace`;
  //     ctx.textAlign = "center";
  //     var classTxt = row.class;
  //     var confTxt = (row.confidence * 100).toFixed().toString() + "%";
  //     var msgTxt = classTxt + " " + confTxt;
  //     const textHeight = fontSize;
  //     var textWidth = ctx.measureText(msgTxt).width;

  //     if (textHeight <= h && textWidth <= w) {
  //       ctx.strokeStyle = row.color;
  //       ctx.fillStyle = row.color;
  //       ctx.fillRect(
  //         x - ctx.lineWidth / 2,
  //         y - textHeight - ctx.lineWidth,
  //         textWidth + 2,
  //         textHeight + 1
  //       );
  //       ctx.stroke();
  //       ctx.fillStyle = fontColor;
  //       ctx.fillText(msgTxt, x + textWidth / 2 + 1, y - 1);
  //     } else {
  //       textWidth = ctx.measureText(confTxt).width;
  //       ctx.strokeStyle = row.color;
  //       ctx.fillStyle = row.color;
  //       ctx.fillRect(
  //         x - ctx.lineWidth / 2,
  //         y - textHeight - ctx.lineWidth,
  //         textWidth + 2,
  //         textHeight + 1
  //       );
  //       ctx.stroke();
  //       ctx.fillStyle = fontColor;
  //       ctx.fillText(confTxt, x + textWidth / 2 + 1, y - 1);
  //     }
  //   });
  // };

  return (
    <div>
      {/* <div className="head">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Video Detection</title>
        </Helmet>
      </div> */}
      <div className=" h-screen flex justify-center">
        <div className="border w-[1100px]">
          <div className="">
            <h1 className="text-center text-2xl p-2 font-semibold">
              Object Detection Demo using YOLOv7
            </h1>
            <div className="p-5">
              <h1 className="font-semibold p-2">
                Please upload a video file for road object detection and click
                the detect objects button
              </h1>
              <input
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                className=" border rounded-md py-1 "
                type="file"
                id="videoInput"
              />

              <button
                className="ml-2 border rounded-md px-2 py-1 text-lg hover:bg-slate-100 hover:shadow-sm font-semibold"
                onClick={handleVideoUpload}
              >
                Upload video
              </button>
              <button
                className="ml-2 border rounded-md px-2 py-1 text-lg hover:bg-slate-100 hover:shadow-sm font-semibold"
                onClick={extractFrame}
              >
                Display frame
              </button>
              <button
                className="ml-2 border rounded-md px-2 py-1 text-lg hover:bg-slate-100 hover:shadow-sm font-semibold"
                onClick={getModel}
              >
                Detect
              </button>
              <div className=" bg-gray-200 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center mt-5">
                <div
                  className=" inline-block h-full bg-gray-600 absolute top-0 left-0"
                  style={{ width: "100%" }}
                ></div>
                <div className=" relative z-10 text-xs font-semibold text-center text-white">
                  100%
                </div>
              </div>
            </div>
            <video
              ref={videoRef}
              className={`h-[640px] ${videoLoad?"":"hidden"}`}
              controls
            />

            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetection;
