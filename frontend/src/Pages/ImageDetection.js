import React, { useState } from "react";
import axios from "axios";

const ImageDetection = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [imgs, setImgs] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = async () => {
    try {
      const image = await resizeImageAndConvertToBase64();
      setImgs(image);
      const response = await axios.post(
        "https://detect.roboflow.com/model-train/1", //https://detect.roboflow.com/capstone-dataset_1/1
        image,
        {
          params: {
            api_key: "mReUFEZsluUHMk7lX3B9", //8DUruQpyJZQnMrHFqa3n
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          onUploadProgress: (progressEvent) => {
            // Calculate and set the upload progress percentage
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      setResponse(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const resizeImageAndConvertToBase64 = () => {
    return new Promise((resolve, reject) => {
      const fileInput = document.getElementById("imageInput"); // Replace 'imageInput' with your input element ID.

      if (fileInput && fileInput.files.length > 0) {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (event) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 640;
            canvas.height = 640;
            ctx.drawImage(img, 0, 0, 640, 640);
            resolve(canvas.toDataURL("image/jpeg")); // Convert to base64 JPEG format.
          };
          img.src = event.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
      } else {
        reject(new Error("No file selected."));
      }
    });
  };

  const renderBoundingBoxes = () => {
    return response.predictions.map((prediction, index) => {
      const { x, y, width, height } = prediction;
      return (
        <>
          <div
            key={index}
            style={{
              position: "absolute",
              border: "2px solid red",
              left: x - width / 2 + "px",
              top: y - height / 2 + "px",
              width: width + "px",
              height: height + "px",
            }}
          ></div>
          <p
            style={{
              position: "absolute",
              left: x - width / 2 + "px",
              top: y - height / 2 - 20 + "px",
              color: "yellow",
            }}
          >
            {prediction.class}
          </p>
        </>
      );
    });
  };

  return (
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
              id="imageInput"
              accept="image/*"
            />
            <button
              className="ml-2 border rounded-md px-2 py-1 text-lg hover:bg-slate-100 hover:shadow-sm font-semibold"
              onClick={handleImageUpload}
            >
              Detect Objects
            </button>
          </div>

          <div className="p-5">
            {uploadProgress > 0 && (
              <div className=" bg-gray-200 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">
                <div
                  className=" inline-block h-full bg-gray-600 absolute top-0 left-0"
                  style={{ width: uploadProgress + "%" }}
                ></div>
                <div className=" relative z-10 text-xs font-semibold text-center text-white">
                  {uploadProgress}%
                </div>
              </div>
            )}
            <div className="text-center p-2 text-xl font-semibold text-gray-600">
              {uploadProgress === 100 &&
                response &&
                "Detection Completed in " + response.time.toFixed(2) + "ms"}
            </div>
          </div>
          {error && <p>Error: {error}</p>}
        </div>
        <div className="">
          {response && (
            <div className="flex">
              <div className="relative w-[640px] h-[640px]">
                <img src={imgs} alt="" />
                {renderBoundingBoxes()}
              </div>
              <div className="ml-10 text-lg">
                {/* <p>Predictions: {JSON.stringify(response.predictions)}</p> */}
                <div className=" w-[400px]">
                  {response.predictions.map((objects) => (
                    <div className="flex justify-between">
                      <div>
                        <span className="font-semibold ">Object Class:</span>{" "}
                        {objects.class}
                      </div>
                      <div>
                        <span className="font-semibold ">Confidence:</span>{" "}
                        <span
                          className={`${
                            objects.confidence > 0.5
                              ? objects.confidence > 0.7
                                ? "text-blue-400"
                                : "text-green-400"
                              : objects.confidence > 0.3
                              ? "text-yellow-400"
                              : "text-red-400"
                          } `}
                        >
                          {(objects.confidence * 100).toFixed().toString() + "%"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetection;
