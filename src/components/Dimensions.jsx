import { useDispatch, useSelector } from "react-redux";
import { setDimension } from "../redux/QRSlice/slice";

const dimensions = [
  { value: "500", placeholder: "500 X 500" },
  { value: "800", placeholder: "800 X 800" },
  { value: "1000", placeholder: "1000 X 1000" },
];

const Dimensions = () => {
  const dispatch = useDispatch();
  const dimension = useSelector((state) => state.qr.dimension);

  return (
    <>
      <div className="mt-3">
        <p>File Dimensions</p>
      </div>
      <div className="dim-container flex flex-wrap mt-2 gap-2">
        {dimensions.map((dim) => {
          return (
            <div
              key={dim.value}
              className={`dim h-12 w-32 rounded-md relative hover:bg-blue-100 ${
                dimension === dim.value ? "border-2 border-blue-500" : "border"
              }`}
            >
              <div className="pointer-events-none text-sm absolute top-3 left-7">
                {dim.placeholder}
              </div>
              <input
                type="radio"
                name="dimensions"
                className="h-12 w-32 opacity-0"
                checked={dimension === dim.value}
                onChange={() => dispatch(setDimension(dim.value))}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dimensions;
