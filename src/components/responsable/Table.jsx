import { CircleCheck, CircleX, Clock9, Eye, Loader, Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import LoadingBar from '../../utils/LoadingBar';

const Table = ({ columns, data, handleEdit, handleDelete, handleView }) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const renderStatus = (status) => {
    if (status === 1 || status === 'approuvé') {
      return <CircleCheck className="text-green-500" />;
    } else if (status === 0 || status === 'rejeté') {
      return <CircleX className="text-red-500" />;
    } else if (status === 'en attente') {
      return <Clock9 className="text-pink-300" />;
    } else if (status === 'en cours') {
      return <Loader className="animate-bounce text-yellow-500" />;
    }
    return null;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
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
            <th className="py-3 px-6 text-sm font-semibold tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            // Show placeholder rows when data is empty
            <tr>
              <td colSpan={columns.length + 1} className="py-6 text-center text-gray-500 text-lg">
                <LoadingBar progress={progress} />
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
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
                    {column.accessor === 'status' ? (
                      renderStatus(row[column.accessor])
                    ) : column.Cell ? (
                      column.Cell({ row })
                    ) : (
                      row[column.accessor]
                    )}
                  </td>
                ))}
                <td className="py-4 px-6 text-sm text-center font-medium border-b border-gray-200">
                  <div className="flex space-x-4 justify-center">
                    <Eye
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => handleView(row)}
                    />
                    <Pencil
                      className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                      onClick={() => handleEdit(row)}
                    />
                    <Trash2
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDelete(row.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
