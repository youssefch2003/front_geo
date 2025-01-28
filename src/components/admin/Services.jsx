import React, { useState } from 'react';
import Table from './Table';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
    { Header: 'Email', accessor: 'email' },
  ];

  const data = [
    { name: 'John Doe', age: 28, email: 'john@example.com' },
    { name: 'Jane Smith', age: 34, email: 'jane@example.com' },
    { name: 'Mike Johnson', age: 45, email: 'mike@example.com' },
  ];

  // Filter the data based on the search query
  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-64"
        />
   <button
  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
          Add
        </button>
      </div>

   

      {/* Table with filtered data */}
      <Table columns={columns} data={filteredData} />
    </div>
  );
};

export default Services;
