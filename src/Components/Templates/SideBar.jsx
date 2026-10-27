import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCategory } from "src/Services/admin";

const SideBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedCategoryId = searchParams.get("category");

  const { data, isLoading, isError } = useQuery(
    ["get-categories"],
    getCategory
  );

  const handleCategoryClick = (categoryId) => {
    navigate(`/?category=${categoryId}`);
  };

  const handleAllPostsClick = () => {
    navigate("/");
  };

  return (
    <aside dir="rtl" className="w-full text-right">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* عنوان */}
        <div className="border-b border-gray-100 px-3 py-3 sm:px-4">
          <h3 className="text-sm font-bold text-gray-800 sm:text-base">
            دسته‌بندی‌ها
          </h3>

          <p className="mt-1 text-[10px] leading-5 text-gray-400 sm:text-xs">
            انتخاب دسته آگهی
          </p>
        </div>

        <div className="p-2 sm:p-3">
          {/* همه آگهی‌ها */}
          <button
            type="button"
            onClick={handleAllPostsClick}
            aria-pressed={!selectedCategoryId}
            className={`mb-1 flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-right transition-colors sm:gap-3 sm:px-3 ${
              !selectedCategoryId
                ? "bg-red-50 text-[#a62626]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md sm:h-8 sm:w-8 ${
                !selectedCategoryId
                  ? "bg-white"
                  : "bg-gray-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-4 w-4 sm:h-5 sm:w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </span>

            <span className="min-w-0 flex-1 text-xs font-semibold leading-5 sm:text-sm">
              همه آگهی‌ها
            </span>
          </button>

          {/* بارگذاری */}
          {isLoading && (
            <div className="space-y-1">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex animate-pulse items-center gap-2 px-2 py-3"
                >
                  <div className="h-7 w-7 shrink-0 rounded-md bg-gray-100" />
                  <div className="h-3 w-12 flex-1 rounded bg-gray-100 sm:w-20" />
                </div>
              ))}
            </div>
          )}

          {/* خطا */}
          {isError && (
            <p className="rounded-lg bg-red-50 p-2 text-xs leading-5 text-red-600">
              دریافت دسته‌بندی‌ها ناموفق بود.
            </p>
          )}

          {/* دسته‌بندی‌ها */}
          {!isLoading && !isError && (
            <ul className="space-y-1">
              {Array.isArray(data) &&
                data.map((category) => {
                  const isSelected =
                    String(selectedCategoryId) ===
                    String(category._id);

                  return (
                    <li key={category._id}>
                      <button
                        type="button"
                        onClick={() =>
                          handleCategoryClick(category._id)
                        }
                        aria-pressed={isSelected}
                        title={category.name}
                        className={`group flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-right transition-colors sm:gap-3 sm:px-3 ${
                          isSelected
                            ? "bg-red-50 text-[#a62626]"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {/* آیکون */}
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md sm:h-8 sm:w-8 ${
                            isSelected
                              ? "bg-white"
                              : "bg-gray-50 group-hover:bg-white"
                          }`}
                        >
                          <img
                            src={`${category.icon}.svg`}
                            alt=""
                            className="h-4 w-4 object-contain sm:h-5 sm:w-5"
                            onError={(event) => {
                              event.currentTarget.style.visibility =
                                "hidden";
                            }}
                          />
                        </span>

                        {/* نام */}
                        <span
                          className={`min-w-0 flex-1 truncate text-xs leading-5 sm:text-sm ${
                            isSelected
                              ? "font-bold"
                              : "font-medium group-hover:text-gray-900"
                          }`}
                        >
                          {category.name}
                        </span>

                        {/* نشانگر انتخاب */}
                        {isSelected && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#a62626]" />
                        )}
                      </button>
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
