import { Helmet } from "react-helmet";
import React, { useState } from "react";

const VideoDetection = () => {
  const PUBLISHABLE_ROBOFLOW_API_KEY = "rf_7xdrVJjmZZgcvqzqFZEEHHnqRV03";
  const MODEL_NAME = "capstone-c-final-dataset-1-vgfa5";
  const MODEL_VERSION = 3;

  const getModel = async () => {
    var model = await window.roboflow
      .auth({
        publishable_key: PUBLISHABLE_ROBOFLOW_API_KEY,
      })
      .load({
        model: MODEL_NAME,
        version: MODEL_VERSION,
        onMetadata: function (m) {
          console.log("model loaded");
        },
      });

    console.log("Model: ", model);
    return model;
  };

  const handleVideoUpload = () => {
    const fileInput = document.getElementById("videoInput");
    if (fileInput && fileInput.files.length > 0) {
      const video = fileInput.files[0];

      console.log(video);
      //   if (video) {
      //     var initialized_model = getModel();

      //     initialized_model.then(function (model) {
      //       if (video) {
      //         model.detect(video).then(function (predictions) {
      //           console.log("Predictions:", predictions);
      //         });
      //       } else {
      //         console.error("Video is null.");
      //       }
      //     });
      //   } else {
      //     console.error("No video selected.");
      //   }
    }
  };

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
                Please upload an image for road object detection and click the
                detect objects button
              </h1>
              <input
                className=" border rounded-md py-1 "
                type="file"
                id="videoInput"
              />
              <button
                className="ml-2 border rounded-md px-2 py-1 text-lg hover:bg-slate-100 hover:shadow-sm font-semibold"
                onClick={handleVideoUpload}
              >
                Detect Objects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetection;
