
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-5"
          >
            <img
              src="/divar.svg"
              alt="دیوار"
              className="h-10 w-auto"
            />

            <span className="hidden h-10 items-center gap-2 border-r border-gray-200 pr-5 text-sm text-gray-600 transition hover:text-black sm:flex">
              <img
                src="/location.svg"
                alt=""
                className="h-5 w-5 opacity-70"
              />
              <span>تهران</span>
            </span>
          </Link>
        </div>

        {/* Left side */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/auth"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-black"
          >
            <img
              src="/profile.svg"
              alt=""
              className="h-5 w-5"
            />
            <span>دیوار من</span>
          </Link>

          <Link
            to="/dashboard"
            className="rounded-xl bg-[#a62626] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#861f1f] hover:shadow-md active:scale-95 sm:px-6"
          >
            ثبت آگهی
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
