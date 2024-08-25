import React from "react";

const ColumnFilter = ({ column }) => {
    const { filterValue , setFilter} = column
  return (
    <div className="text-center py-3">
      <span>
        <input
          value={filterValue || ""}
          onChange={(e) => setFilter(e.target.value)}
          className="text-black border-2 border-black p-1"
          placeholder="Search....."
        />
      </span>
    </div>
  );
};

export default ColumnFilter;