import React from "react";
import Main from "src/Components/Templates/Main";
import SideBar from "src/Components/Templates/SideBar";


const Home = () => {
  return (
    <div dir="rtl" className="mx-auto w-full max-w-7xl px-2 py-4 sm:px-4 lg:px-6">
      <div className="flex items-start gap-2 sm:gap-4 lg:gap-6">
        {/* سایدبار سمت راست */}
        <div className="sticky top-4 w-[108px] shrink-0 sm:w-48 lg:w-60">
          <SideBar />
        </div>

        {/* آگهی‌ها سمت چپ */}
        <div className="min-w-0 flex-1">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default Home;
