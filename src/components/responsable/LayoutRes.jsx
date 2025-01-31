// Layout.jsx
import React from 'react';
import SideBarRes from './SideBarRes';

const LayoutRes = ({ children }) => {
  return (
    <div className=" flex flex-col lg:flex-row">
    <SideBarRes />
    <main className="lg:ml-64 md:ml-64 mt-6 flex-1 p-4">
        {children} {/* This will render the content of each page */}
      </main>
    </div>
  );
};

export default LayoutRes;
