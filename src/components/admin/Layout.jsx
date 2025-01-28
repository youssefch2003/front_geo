// Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row">
    <Sidebar />
    <main className="lg:ml-64 mt-6 flex-1 p-4">
        {children} {/* This will render the content of each page */}
      </main>
    </div>
  );
};

export default Layout;
