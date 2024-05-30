import { useDispatch, useSelector } from "react-redux";
import { setBackgroundColor, setForegroundColor } from "../redux/QRSlice/slice";

const fg_colors = [
  "1f2d3c",
  "000000",
  "29323a",
  "003049",
  "001f3f",
  "333333",
  "1a1a1a",
  "424242",
  "282c34",
  "090a0b",
];
const bg_colors = [
  "FFFFFF",
  "b3d7ff",
  "a9c5dc",
  "d3e9f2",
  "cad6d9",
  "bcc8d1",
  "e0e6eb",
  "d6ddd8",
  "b9d3e2",
  "c9d6e0",
];
const ColorPicker = () => {
  const dispatch = useDispatch();
  const foregroundColor = useSelector((state) => state.qr.foregroundColor);
  const backgroundColor = useSelector((state) => state.qr.backgroundColor);
  return (
    <>
      <div className="mt-3">
        <p>Foreground Color</p>
      </div>
      <div className="flex flex-wrap gap-2 border p-2 mt-1">
        {fg_colors.map((color) => {
          return (
            <div
              key={color}
              style={{ backgroundColor: `#${color}` }}
              className={`h-12 w-12 grid place-content-center rounded-md hover:border-4 hover:border-blue-500 ${
                foregroundColor == color ? "border-4 border-blue-600" : "border"
              }`}
            >
              <input
                type="radio"
                name="fg_color"
                className="h-12 w-12 opacity-0"
                checked={foregroundColor == color}
                onChange={() => dispatch(setForegroundColor(color))}
              ></input>
            </div>
          );
        })}
      </div>

      <div className="mt-3">
        <p>Background Color</p>
      </div>

      <div className="flex flex-wrap gap-2 border p-2 mt-1">
        {bg_colors.map((color) => {
          return (
            <div
              key={color}
              style={{ backgroundColor: `#${color}` }}
              className={`h-12 w-12 grid place-content-center rounded-md ${
                backgroundColor === color
                  ? "border-4 border-blue-500"
                  : "border"
              }`}
            >
              <input
                type="radio"
                name="fg_color"
                className="h-12 w-12 opacity-0"
                checked={backgroundColor === color}
                onChange={() => dispatch(setBackgroundColor(color))}
              ></input>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ColorPicker;
