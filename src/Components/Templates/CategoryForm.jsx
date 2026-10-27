import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addCategory } from "src/Services/admin";
import toast from "react-hot-toast";

const CategoryForm = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: () => {
      toast.success("دسته‌بندی با موفقیت ایجاد شد 🎉");
      queryClient.invalidateQueries("get-categories")
    },
    onError: () => {
      toast.error("خطا در ایجاد دسته‌بندی!");
    },
  });

  console.log({ isLoading, error, data });

  const onChangeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHnadler = (event) => {
    event.preventDefault();

    if (!form.name || !form.icon || !form.slug) return;
    mutate(form);
    console.log(form);
  };

  return (
    <div className="flex w-full justify-start px-4 py-6">
      <form
        onChange={onChangeHandler}
        onSubmit={submitHnadler}
        className="flex w-full max-w-xs flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      >
        <h3 className="border-b border-gray-200 pb-3 text-right text-base font-semibold text-gray-800">
          دسته‌بندی جدید
        </h3>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-right text-xs font-medium text-gray-600"
          >
            اسم دسته‌بندی
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="مثلاً املاک"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#a62626] focus:ring-2 focus:ring-red-50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="slug"
            className="text-right text-xs font-medium text-gray-600"
          >
            اسلاگ
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            placeholder="real-estate"
            dir="ltr"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-left text-sm outline-none transition focus:border-[#a62626] focus:ring-2 focus:ring-red-50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="icon"
            className="text-right text-xs font-medium text-gray-600"
          >
            آیکون
          </label>
          <input
            type="text"
            name="icon"
            id="icon"
            placeholder="نام یا آدرس آیکون"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#a62626] focus:ring-2 focus:ring-red-50"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 rounded-md bg-[#a62626] px-3 py-2.5 text-sm font-medium text-white transition hover:bg-[#861f1f] active:scale-[0.98]"
        >
          {isLoading ? "در حال ثبت..." : "ایجاد دسته‌بندی"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
