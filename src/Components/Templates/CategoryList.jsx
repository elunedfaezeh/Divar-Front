import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteCategory, getCategory } from "src/Services/admin";
import Loader from "../modouls/Loader";
import toast from "react-hot-toast";

const CategoryList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["get-categories"], getCategory);

  const { mutate: removeCategory, isLoading: isDeleting } = useMutation(
    deleteCategory,
    {
      onSuccess: () => {
        toast.success("دسته‌بندی با موفقیت حذف شد");
        queryClient.invalidateQueries(["get-categories"]);
      },
      onError: () => {
        toast.error("خطا در حذف دسته‌بندی!");
      },
    }
  );

  const deleteHandler = (id, name) => {
    toast(
      (t) => (
        <div dir="rtl" className="w-full">
          <div className="mb-3 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7h12m-10 0 .7 12h6.6L16 7M9 7V4h6v3"
                />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-800">
                حذف دسته‌بندی
              </p>
              <p className="mt-1 text-xs leading-6 text-gray-500">
                آیا از حذف «{name}» مطمئنی؟
                این عملیات قابل بازگشت نیست.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t.id);
                removeCategory(id);
              }}
              disabled={isDeleting}
              className="flex-1 rounded-lg bg-red-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              بله، حذف کن
            </button>

            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 rounded-lg bg-gray-100 px-3 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-200"
            >
              انصراف
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
        style: {
          width: "360px",
          maxWidth: "calc(100vw - 32px)",
          padding: "16px",
          borderRadius: "16px",
          background: "#fff",
          color: "#1f2937",
          boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        },
      }
    );
  };

  return (
    <div className="w-full px-4 py-6" dir="rtl">
      <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-lg font-bold text-gray-800">
          دسته‌بندی‌ها
        </h2>

        <span className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-[#a62626]">
          {data?.length ?? 0} دسته‌بندی
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {data?.map((i) => (
            <div
              key={i._id}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                <img
                  src={`${i.icon}.svg`}
                  alt={i.name}
                  className="h-7 w-7 object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h5 className="truncate text-sm font-semibold text-gray-800">
                  {i.name}
                </h5>

                <p
                  dir="ltr"
                  className="mt-1 truncate text-right text-xs text-gray-400"
                >
                  {i.slug}
                </p>
              </div>

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => deleteHandler(i._id, i.name)}
                title="حذف دسته‌بندی"
                aria-label={`حذف دسته‌بندی ${i.name}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-[#a62626] active:scale-95 disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 7h12m-10 0 .7 12h6.6L16 7M9 7V4h6v3m-5 4v5m4-5v5"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (!data || data.length === 0) && (
        <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">
          <p className="text-sm text-gray-500">
            هنوز دسته‌بندی‌ای ثبت نشده است.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
