import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="py-3 px-6  text-sm font-semibold tracking-wider"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`transition-all duration-300 hover:bg-indigo-100 ${
                rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="py-4 px-6 text-gray-800 text-sm font-medium border-b border-gray-200"
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
