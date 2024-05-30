import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Preview = () => {
  const data = useSelector((state) => state.qr.data);
  const isLoading = useSelector((state) => state.qr.isLoading);

  const downloadLinkRef = useRef(null);
  const type = useSelector((state) => state.qr.type);
  useEffect(() => {
    if (downloadLinkRef.current && data) {
      downloadLinkRef.current.href = `data:image/png;base64,${data}`;
      downloadLinkRef.current.download = `qr-code.${type}`;
    }
  }, [data, type]);
  return (
    <>
      <div className="border t border-slate-300 bg-slate-50 p-2 mt-3 rounded-md">
        <div>
          <div className="font-medium text-lg text-slate-900">
            <p>QR Code Preview</p>
          </div>
          <div className="mt-2 rounded-md overflow-hidden border border-slate-300 relative">
            {isLoading && (
              <div className="flex items-center justify-center border rounded-md overflow-hidden bg-gray-900 opacity-95 absolute h-full w-full">
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
            {data === null ? (
              <img src="https://placehold.co/500x500" />
            ) : (
              <img
                className="img-fluid"
                src={`data:image/${type};base64,${data}`}
              />
            )}
          </div>
          <div className="mt-3">
            <a ref={downloadLinkRef}>
              <button className="boxShadow w-full h-12 rounded-md bg-blue-800 text-slate-100 hover:bg-blue-600">
                Download
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
