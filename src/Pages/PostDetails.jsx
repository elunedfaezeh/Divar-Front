import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "src/Services/post";
import Loader from "src/Components/modouls/Loader";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(
    ["post-details", id],
    () => getPostById(id),
    {
      enabled: Boolean(id),
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-gray-50 px-4 py-16"
      >
        <div className="mx-auto max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
            !
          </div>

          <h2 className="mt-5 text-xl font-extrabold text-gray-800">
            دریافت اطلاعات آگهی ناموفق بود
          </h2>

          <p className="mt-2 text-sm leading-7 text-gray-500">
            لطفاً اتصال اینترنت و آدرس سرویس دریافت آگهی را بررسی کنید.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-[#a62626] px-6 py-3 text-sm font-bold text-white transition hover:bg-red-800"
          >
            بازگشت به آگهی‌ها
          </button>
        </div>
      </div>
    );
  }

  const post = data?.post || data;

  if (!post || !post._id) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-gray-50 px-4 py-20 text-center"
      >
        <h2 className="text-xl font-bold text-gray-700">
          آگهی موردنظر پیدا نشد
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="mt-5 rounded-xl bg-[#a62626] px-6 py-3 text-white transition hover:bg-red-800"
        >
          بازگشت
        </button>
      </div>
    );
  }

  const title = post.options?.title || post.title || "بدون عنوان";

  const description =
    post.content || post.options?.content || "توضیحاتی برای این آگهی ثبت نشده است.";

  const city = post.options?.city || "شهر نامشخص";

  const images = Array.isArray(post.images) ? post.images : [];

  const formatImageUrl = (image) => {
    const normalizedImage = image.replace(/\\/g, "/");
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return `${baseUrl}${normalizedImage}`;
  };

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("fa-IR")
    : null;

  return (
    <div dir="rtl" className="min-h-screen bg-[#f7f7f8] px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">

        {/* نوار بالای صفحه */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-600 shadow-sm transition hover:border-red-200 hover:text-[#a62626]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>

            بازگشت به آگهی‌ها
          </button>

          <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-[#a62626]">
            جزئیات آگهی
          </span>
        </div>

        {/* محتوای اصلی */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">

          {/* ستون تصاویر و توضیحات */}
          <div className="space-y-5 lg:col-span-2">

            {/* گالری تصاویر */}
            <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-extrabold text-gray-800">
                  تصاویر آگهی
                </h2>

                <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
                  {images.length.toLocaleString("fa-IR")} تصویر
                </span>
              </div>

              {images.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {images.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${
                        index === 0
                          ? "sm:col-span-2"
                          : ""
                      }`}
                    >
                      <img
                        src={formatImageUrl(image)}
                        alt={`${title} - تصویر ${index + 1}`}
                        className={`w-full object-cover transition duration-500 group-hover:scale-[1.02] ${
                          index === 0
                            ? "h-64 sm:h-[400px]"
                            : "h-48"
                        }`}
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />

                      <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs text-white">
                        تصویر {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.4}
                    stroke="currentColor"
                    className="h-14 w-14"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 19.5h16.5A1.5 1.5 0 0 0 21.75 18V6A1.5 1.5 0 0 0 20.25 4.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
                    />
                  </svg>

                  <p className="mt-3 text-sm">
                    تصویری برای این آگهی ثبت نشده است
                  </p>
                </div>
              )}
            </section>

            {/* توضیحات */}
            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
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
                      d="M8.25 6.75h7.5M8.25 10.5h7.5m-7.5 3.75h4.5M5.25 3.75h13.5A2.25 2.25 0 0 1 21 6v12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18V6a2.25 2.25 0 0 1 2.25-2.25Z"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="font-extrabold text-gray-800">
                    توضیحات آگهی
                  </h2>
                  <p className="mt-1 text-xs text-gray-400">
                    اطلاعات تکمیلی درباره این آگهی
                  </p>
                </div>
              </div>

              <p className="mt-5 whitespace-pre-wrap text-sm leading-9 text-gray-600">
                {description}
              </p>
            </section>
          </div>

          {/* ستون اطلاعات */}
          <aside className="space-y-5 lg:sticky lg:top-6">

            {/* مشخصات و قیمت */}
            <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              <div className="h-1.5 bg-[#a62626]" />

              <div className="p-5 sm:p-6">
                <span className="inline-flex rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-[#a62626]">
                  آگهی ثبت‌شده
                </span>

                <h1 className="mt-4 text-xl font-extrabold leading-9 text-gray-800 sm:text-2xl">
                  {title}
                </h1>

                <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5 shrink-0 text-[#a62626]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z"
                    />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>

                  <span>{city}</span>
                </div>

                {formattedDate && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5 shrink-0 text-[#a62626]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v12A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75v-12A2.25 2.25 0 0 1 5.25 4.5Z"
                      />
                    </svg>

                    <span>تاریخ ثبت: {formattedDate}</span>
                  </div>
                )}

                <div className="my-6 border-t border-dashed border-gray-200" />

                <p className="text-sm text-gray-500">
                  قیمت آگهی
                </p>

                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#a62626]">
                    {post.amount != null && post.amount !== ""
                      ? Number(post.amount).toLocaleString("fa-IR")
                      : "توافقی"}
                  </span>

                  {post.amount != null && post.amount !== "" && (
                    <span className="text-sm text-gray-500">
                      تومان
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* خلاصه آگهی */}
            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="font-extrabold text-gray-800">
                مشخصات آگهی
              </h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-500">عنوان</span>
                  <span className="max-w-[60%] truncate font-medium text-gray-800">
                    {title}
                  </span>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-500">موقعیت</span>
                  <span className="font-medium text-gray-800">
                    {city}
                  </span>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-500">تعداد تصاویر</span>
                  <span className="font-medium text-gray-800">
                    {images.length.toLocaleString("fa-IR")} عدد
                  </span>
                </div>
              </div>
            </section>

            {/* دکمه بازگشت */}
            <button
              onClick={() => navigate("/")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#a62626] px-5 py-4 font-bold text-white shadow-lg shadow-red-900/10 transition hover:bg-red-800 active:scale-[0.98]"
            >
              مشاهده سایر آگهی‌ها

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
