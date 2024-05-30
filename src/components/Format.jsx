import { useDispatch, useSelector } from "react-redux";
import { setType } from "../redux/QRSlice/slice";

const formats = ["png", "jpg", "jpeg"];
const Format = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.qr.type);
  return (
    <>
      <div className="mt-3">
        <p>File Format</p>
      </div>
      <div className="format-container mt-2">
        <select
          className="border border-gray-300 bg-slate-200 rounded-md p-2 w-full"
          value={type}
          onChange={(e) => {
            dispatch(setType(e.target.value));
          }}
        >
          {formats.map((format) => {
            return (
              <option key={format} defaultValue="png">
                {format}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default Format;
