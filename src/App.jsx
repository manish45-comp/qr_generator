import { useState } from "react";
import "./styles/globals.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchQrImageUrl } from "./redux/QRSlice/slice";
import Format from "./components/Format";
import Dimensions from "./components/Dimensions";
import ColorPicker from "./components/ColorPicker";
import Preview from "./components/Preview";

const App = () => {
  const dispatch = useDispatch();

  const [dataUrl, setDataUrl] = useState(null);
  const isLoading = useSelector((state) => state.qr.isLoading);

  // api call
  const type = useSelector((state) => state.qr.type);
  const dimension = useSelector((state) => state.qr.dimension);
  const foregroundColor = useSelector((state) => state.qr.foregroundColor);
  const backgroundColor = useSelector((state) => state.qr.backgroundColor);
  const generateQrCode = async (e) => {
    e.preventDefault();
    console.log(type, dataUrl, dimension, foregroundColor, backgroundColor);
    dispatch(
      fetchQrImageUrl({
        type,
        dataUrl,
        dimension,
        foregroundColor,
        backgroundColor,
      })
    );
  };

  return (
    <section className="container px-2 md:px-0 mx-auto">
      <div className="hero-container my-28">
        <div className="text-center pt-5">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
            Generate and download <br />
            <span className="dynamic"> Dynamic </span>QR code
          </h1>
        </div>
        <div className="md:block hidden mt-5 text-sm text-center w-100 md:w-7/12 mx-auto">
          <p>
            Static QR Codes Are for Dinosaurs - Welcome to the Future! Generate,
            <br />
            Customize, and Download Your Unpredictably Dynamic Codes
          </p>
        </div>
        <div className="md:hidden block mt-5 text-sm text-center w-100 md:w-7/12 mx-auto">
          <p>Customize, and Download Your Unpredictably Dynamic Codes</p>
        </div>
        <div className="btn-container mt-5 grid grid-cols-2 gap-5">
          <div className="flex justify-end">
            <a href="#playground">
              <button className="boxShadow w-44 h-12 border rounded-md bg-blue-800 text-slate-100 hover:bg-blue-600">
                Get Started
              </button>
            </a>
          </div>
          <div className="flex justify-start">
            <button className="boxShadow w-44 h-12 border rounded-md  text-slate-900 hover:bg-blue-400">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      <div
        id="playground"
        className="qr-playground p-3 border bg-slate-200 rounded-lg mb-10"
      >
        {/* url input */}
        <div className="url-container p-3 rounded-md border border-gray-300">
          <div className="my-3 ps-1">
            <p className="font-medium text-lg">Enter your website URL</p>
          </div>
          <form onSubmit={generateQrCode}>
            <div className="flex">
              <input
                type="text"
                className="url-input px-2 flex-1 rounded-md"
                placeholder="Enter URL"
                onChange={(e) => setDataUrl(e.target.value)}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  isLoading ? "cursor-wait" : "cursor-pointer"
                } overflow-hidden flex items-center justify-center boxShadow  w-44 h-12 rounded-md bg-blue-800 text-slate-100 hover:bg-blue-600 disabled:bg-slate-500`}
              >
                <span className="hidden md:block">Generate QR Code</span>
                <span className="md:hidden block">Generate</span>
              </button>
            </div>
          </form>
        </div>

        <div className="block lg:flex gap-5">
          <div className="flex-1 color-container border border-slate-300 bg-slate-50 p-2 mt-3 rounded-md">
            <Format />
            <Dimensions />
            <ColorPicker />
          </div>
          <Preview />
        </div>
      </div>
    </section>
  );
};

export default App;
