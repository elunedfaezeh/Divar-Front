import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { getAllPosts } from "src/Services/post";
import { getCategory } from "src/Services/admin";
import Loader from "../modouls/Loader";

const Main = () => {
  const [searchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get("category");

  const {
    data,
    isLoading,
    isError,
  } = useQuery(["all-posts"], getAllPosts);

  const { data: categories } = useQuery(
    ["get-categories"],
    getCategory
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div
        dir="rtl"
        className="rounded-lg border border-red-100 bg-white p-6 text-center"
      >
        <p className="text-sm text-red-600">
          دریافت آگهی‌ها با خطا مواجه شد.
        </p>

        <p className="mt-2 text-xs text-gray-500">
          لطفاً دوباره تلاش کنید.
        </p>
      </div>
    );
  }

  const allPosts = data?.posts || [];

  const selectedCategory = Array.isArray(categories)
    ? categories.find(
        (category) =>
          String(category._id) === String(selectedCategoryId)
      )
    : null;

  const posts = selectedCategoryId
    ? allPosts.filter((post) => {
        const categoryId =
          typeof post.category === "object"
            ? post.category?._id
            : post.category;

        return (
          categoryId != null &&
          String(categoryId) === String(selectedCategoryId)
        );
      })
    : allPosts;

  const pageTitle = selectedCategory?.name || "همه آگهی‌ها";

  return (
    <main dir="rtl" className="w-full">
      {/* سربرگ صفحه */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
            {pageTitle}
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {selectedCategory
              ? `آگهی‌های دسته ${selectedCategory.name}`
              : "جدیدترین آگهی‌های ثبت‌شده"}
          </p>
        </div>

        <span className="whitespace-nowrap text-xs text-gray-500 sm:text-sm">
          {posts.length.toLocaleString("fa-IR")} آگهی
        </span>
      </div>

      {/* حالت بدون آگهی */}
      {posts.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h4.5M5.25 3.75h13.5A1.5 1.5 0 0 1 20.25 5.25v13.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5Z"
              />
            </svg>
          </div>

          <h2 className="mt-4 text-sm font-bold text-gray-700">
            {selectedCategory
              ? "آگهی‌ای در این دسته‌بندی وجود ندارد"
              : "هنوز آگهی‌ای ثبت نشده است"}
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            {selectedCategory
              ? "دسته‌بندی دیگری رو انتخاب کن."
              : "آگهی‌های جدید در این قسمت نمایش داده می‌شن."}
          </p>

          {selectedCategoryId && (
            <Link
              to="/"
              className="mt-4 inline-block text-sm font-semibold text-[#a62626] hover:underline"
            >
              نمایش همه آگهی‌ها
            </Link>
          )}
        </div>
      ) : (
        /* لیست دوستونه آگهی‌ها */
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {posts.map((post) => {
            const title =
              post.options?.title || post.title || "بدون عنوان";

            const image = post.images?.[0];

            const imageUrl = image
              ? `${import.meta.env.VITE_BASE_URL}${image.replace(/\\/g, "/")}`
              : null;

            return (
              <Link
                to={`/post/${post._id}`}
                key={post._id}
                className="group flex min-w-0 gap-3 rounded-lg border border-gray-200 bg-white p-3 text-right transition-colors duration-200 hover:border-gray-300"
              >
                {/* اطلاعات آگهی؛ سمت چپ عکس */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="line-clamp-2 text-sm font-semibold leading-6 text-gray-800 transition-colors group-hover:text-[#a62626]">
                    {title}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                    {post.content ||
                      post.options?.content ||
                      "بدون توضیحات"}
                  </p>

                  {/* شهر و قیمت */}
                  <div className="mt-auto pt-3">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                        className="h-4 w-4 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z"
                        />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>

                      <span className="truncate">
                        {post.options?.city || "شهر نامشخص"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-800">
                      {post.amount != null && post.amount !== ""
                        ? `${Number(post.amount).toLocaleString("fa-IR")} تومان`
                        : "توافقی"}
                    </p>
                  </div>
                </div>

                {/* عکس کوچک؛ سمت راست */}
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100 sm:h-28 sm:w-28">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-gray-400">
                      بدون تصویر
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Main;
