import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
const GlobalFilter = ({ filter, setFilter }) => {
  // const [value, setValue] = useState(filter);
  // const onChange = useAsyncDebounce((value) => {
  //   setFilter(value || undefined);
  // }, 1000);
  return (
    <div className="text-center py-3">
      <span>
        Global Search:{" "}
        <input
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          className="border-2 border-[#04AA6D] px-2 py-1"
          placeholder="Filter Items"
        />
      </span>
      {/* <span>
        Global Search:{" "}
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          className="border-2 border-[#04AA6D] px-2 py-1"
          placeholder="Filter Items"
        />
      </span> */}
    </div>
  );
};

export default GlobalFilter;
