import React from 'react';

const Table = ({ columns, data, handleEdit, handleDelete }) => {
    console.log("handleDelete:", handleDelete);  // Debugging line

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="py-3 px-6 text-sm font-semibold tracking-wider"
              >
                {column.Header}
              </th>
            ))}
            {/* Add Actions column */}
            <th className="py-3 px-6 text-sm font-semibold tracking-wider">Actions</th>
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
                  {column.Cell ? column.Cell({ row }) : row[column.accessor]}
                </td>
              ))}
              {/* Actions Column */}
              <td className="py-4 px-6 text-sm font-medium border-b border-gray-200">
                <div className="flex space-x-2">
                <button
                    onClick={() => handleEdit(row)}
                    className="text-blue-500 hover:text-blue-700 p-2 border rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)} // Assuming 'id' is the identifier for a service
                    className="text-red-500 hover:text-red-700 p-2 border rounded"
                  >
                    Delete
                  </button>
                
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
