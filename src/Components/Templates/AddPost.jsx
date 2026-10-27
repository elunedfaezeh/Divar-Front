import { useQuery } from "@tanstack/react-query";
import axios, { Axios } from "axios";
import React, { useState } from "react";
import { getCategory } from "src/Services/admin";
import { getCookie } from "src/utils/cookies";
import toast from "react-hot-toast";
const AddPost = () => {
  const { data } = useQuery(["get-categories"], getCategory);

  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: null,
    city: "",
    category: "",
    images: null,
  });

  const changeHandler = (event) => {
    event.preventDefault();
    const name = event.target.name;

    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const addHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (let i in form) {
      formData.append(i, form[i]);
    }
    const token = getCookie("accessToken");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })

      .catch((error) => {
        toast.error(error.response?.data?.message || "خطا در ایجاد آگهی");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-start px-4 pb-4 pt-32 sm:px-6">
        <form
          onChange={changeHandler}
          onSubmit={addHandler}
          className="flex w-full max-w-xs flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-right text-base font-bold text-gray-800">
              افزودن آگهی
            </h3>
            <p className="mt-1 text-right text-xs text-gray-500">
              اطلاعات آگهی را وارد کنید.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="title"
              className="text-right text-xs font-medium text-gray-600"
            >
              عنوان آگهی
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="مثلاً فروش آپارتمان"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-right text-sm outline-none transition focus:border-[#a62626] focus:ring-2 focus:ring-red-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="text-right text-xs font-medium text-gray-600"
            >
              توضیحات
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              placeholder="توضیحات آگهی..."
              className="w-full resize-y rounded-md border border-gray-200 px-3 py-2 text-right text-sm outline-none transition focus:border-[#a62626] focus:ring-2 focus:ring-red-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="amount"
              className="text-right text-xs font-medium text-gray-600"
            >
              قیمت (تومان)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="قیمت به تومان"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-right text-sm outline-none transition focus:border-[#a62626] focus:ring-2 focus:ring-red-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="city"
              className="text-right text-xs font-medium text-gray-600"
            >
              شهر
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="مثلاً تهران"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-right text-sm outline-none transition focus:border-[#a62626] focus:ring-2 focus:ring-red-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="category"
              className="text-right text-xs font-medium text-gray-600"
            >
              دسته‌بندی
            </label>
            <select
              name="category"
              id="category"
              defaultValue=""
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-right text-sm outline-none transition focus:border-[#a62626] focus:ring-2 focus:ring-red-50"
            >
              <option value="" disabled>
                انتخاب دسته‌بندی
              </option>
              {data?.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="images"
              className="text-right text-xs font-medium text-gray-600"
            >
              تصویر آگهی
            </label>
            <input
              type="file"
              id="images"
              name="images"
              className="w-full rounded-md border border-gray-200 bg-gray-50 p-2 text-xs text-gray-600 file:ml-2 file:rounded file:border-0 file:bg-red-50 file:px-2 file:py-1.5 file:text-xs file:font-medium file:text-[#a62626]"
            />
          </div>

          <button
            type="submit"
            className="mt-1 w-full rounded-md bg-[#a62626] px-3 py-2.5 text-sm font-medium text-white transition hover:bg-[#861f1f] active:scale-[0.98]"
          >
            افزودن آگهی
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
