
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 transition hover:text-[#a62626]"
        >
          <img
            src="/divar.svg"
            alt="دیوار"
            className="h-7 w-auto"
          />
          <span className="font-bold text-gray-700">دیوار</span>
        </Link>

        <p>ساخته شده با ❤️ برای یک تجربه بهتر</p>

        <p dir="ltr" className="text-xs text-gray-400">
          © {new Date().getFullYear()} 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
