
import React from "react";
import Header from "layout/Header";
import Footer from "layout/Footer";

const Layout = ({ children }) => {
  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col bg-[#fafafa] text-gray-800"
    >
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
