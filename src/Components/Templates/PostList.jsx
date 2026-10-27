import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getPost, deletePost } from "src/Services/user";
import Loader from "../modouls/Loader";
import { sp } from "src/utils/numbers";

const PostList = () => {
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isLoading, isError } = useQuery(["my-post-list"], getPost);

  const { mutate: removePost, isLoading: isDeleting } = useMutation(
    deletePost,
    {
      onSuccess: () => {
        toast.success("آگهی با موفقیت حذف شد");
        setSelectedPost(null);
        queryClient.invalidateQueries(["my-post-list"]);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "خطا در حذف آگهی");
      },
    },
  );

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
        <p className="rounded-xl border border-red-100 bg-white px-6 py-4 text-sm text-red-600 shadow-sm">
          خطا در دریافت آگهی‌ها
        </p>
      </div>
    );
  }

  const posts = data?.posts || [];

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-gray-50 px-3 pb-10 pt-24 sm:px-6 lg:px-8"
    >
      <div className="ml-auto w-full">
        {/* عنوان صفحه */}
        <div className="mb-5 flex items-center justify-between">
          <div className="text-right">
            <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              آگهی‌های شما
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              مدیریت آگهی‌های ثبت‌شده
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#a62626]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 21v-7h6v7"
              />
            </svg>
          </div>
        </div>

        {/* حالت بدون آگهی */}
        {posts.length === 0 ? (
          <div className="w-full rounded-2xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.3 3.8 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.8a2 2 0 0 0-3.4 0Z"
                />
              </svg>
            </div>

            <h4 className="font-bold text-gray-800">
              هنوز آگهی‌ای ثبت نکرده‌اید
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              آگهی‌های شما پس از ثبت در این قسمت نمایش داده می‌شوند.
            </p>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {posts.map((post) => {
              const title =
                post.options?.title || post.title || "بدون عنوان";

              return (
                <article
                  key={post._id}
                  className="w-full overflow-hidden rounded-xl border border-gray-200/80 bg-white p-3 shadow-sm transition duration-200 hover:border-gray-300 hover:shadow-md sm:p-4"
                >
                  {/* عکس و عنوان سمت راست؛ قیمت و تاریخ سمت چپ */}
                  <div className="flex items-center gap-3 sm:gap-5">
                    {/* سمت راست: عکس و اطلاعات */}
                    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-24 sm:w-24">
                        {post.images?.[0] ? (
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
                            alt={title}
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-8 w-8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.659 2.659M3.75 19.5h16.5A1.5 1.5 0 0 0 21.75 18V6A1.5 1.5 0 0 0 20.25 4.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5ZM15 8.25h.008v.008H15V8.25Z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1 py-1 text-right">
                        <h4 className="line-clamp-2 text-sm font-bold leading-6 text-gray-800 sm:text-base">
                          {title}
                        </h4>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm">
                          {post.content || "بدون توضیحات"}
                        </p>
                      </div>
                    </div>

                    {/* سمت چپ: قیمت و تاریخ */}
                    <div className="flex w-24 shrink-0 flex-col items-start justify-center gap-3 border-r border-gray-100 pr-3 text-right sm:w-36 sm:gap-4 sm:pr-5">
                      <div>
                        <span className="block text-[10px] text-gray-400 sm:text-xs">
                          قیمت
                        </span>

                        <p className="mt-1 whitespace-nowrap text-xs font-extrabold leading-5 text-[#a62626] sm:text-base">
                          {sp(post.amount)}
                        </p>

                        <span className="text-[10px] text-gray-500 sm:text-xs">
                          تومان
                        </span>
                      </div>

                      <div>
                        <span className="block text-[10px] text-gray-400 sm:text-xs">
                          تاریخ ثبت
                        </span>

                        <p className="mt-1 whitespace-nowrap text-[10px] font-medium leading-5 text-gray-600 sm:text-xs">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString(
                                "fa-IR",
                              )
                            : "نامشخص"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* پایین کارت: دکمه حذف */}
                  <div className="mt-3 flex items-center justify-end border-t border-gray-100 pt-3">
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => setSelectedPost(post)}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-xs font-bold text-[#a62626] transition hover:border-red-200 hover:bg-[#a62626] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14 10-.5 7m-3-7-.5 7M6 7h12m-10 0 .7 12h6.6L16 7m-6-3h4l1 3H9l1-3Z"
                        />
                      </svg>

                      حذف آگهی
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* پنجره تأیید حذف */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => {
            if (!isDeleting) setSelectedPost(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* آیکون هشدار */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#a62626]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                />
              </svg>
            </div>

            <h3
              id="delete-dialog-title"
              className="text-lg font-extrabold text-gray-900"
            >
              حذف آگهی
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              آیا از حذف این آگهی مطمئنی؟
            </p>

            <div className="mt-3 rounded-xl bg-gray-50 px-3 py-3">
              <p className="break-words text-sm font-bold text-gray-800">
                {selectedPost.options?.title ||
                  selectedPost.title ||
                  "بدون عنوان"}
              </p>
            </div>

            <p className="mt-3 text-xs leading-6 text-red-500">
              بعد از حذف، این آگهی از فهرست آگهی‌های شما حذف می‌شود.
            </p>

            {/* دکمه‌ها */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setSelectedPost(null)}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                انصراف
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => removePost(selectedPost._id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#a62626] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    در حال حذف...
                  </>
                ) : (
                  "بله، حذف کن"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
