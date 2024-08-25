import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <>
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}

                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "🔽"
                          : "🔽"
                        : ""}
                    </span>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                </>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center items-center  gap-2 py-4">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to Page:{" "}
          <input
            type="number"
            value={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 1;
              gotoPage(pageNumber);
            }}
            className="w-[100px] border-2 border-[#04AA6D] px-2 py-1"
            // disabled={pageIndex < 0}
          />
        </span>
        <span className="flex gap-2 items-center">
            {/* <span>Select No of Item to show : </span> */}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="w-[175px] border-2 border-[#04AA6D] px-2 py-1"
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <option value={pageSize} key={pageSize}>
                Show {pageSize} records
              </option>
            ))}
          </select>
        </span>
        <button
          onClick={() => gotoPage(0)}
          className="bg-black text-white p-[10px]"
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          className="btn"
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          className="btn"
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          className="bg-black text-white p-[10px]"
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

export default PaginationTable;
