import React, { useState } from "react";
import { sendOtp } from "Services/Auth";

const SendOtpFrom = ({ mobile, setMobile, setStep }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onsubmitHAndler = async (event) => {
    event.preventDefault();

    if (!/^09\d{9}$/.test(mobile)) {
      setError("شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { response, error } = await sendOtp(mobile);

      if (response) {
        setStep(2);
      } else if (error) {
        setError(error.response?.data?.message || "ارسال کد تأیید ناموفق بود.");
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div
  dir="rtl"
  className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 py-8"
>      <form
        onSubmit={onsubmitHAndler}
        className=" rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-[0_8px_35px_rgba(0,0,0,0.06)] sm:px-10 sm:py-9"
      >
        {/* لوگو */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#c21828]">
            <img src="divar.svg" alt="" />
          </div>

          <h2 className="text-xl font-extrabold text-gray-900">
            ورود به حساب کاربری
          </h2>

          <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-gray-500">
            شماره موبایلت رو وارد کن تا کد تأیید برات ارسال بشه.
          </p>
        </div>

        {/* ورودی شماره */}
        <div className="mb-5">
          <label
            htmlFor="mobile-input"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            شماره موبایل
          </label>

          <div className="relative">
            <input
              id="mobile-input"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              dir="ltr"
              maxLength={11}
              value={mobile}
              placeholder="09123456789"
              onChange={(event) => {
                setMobile(event.target.value.replace(/\D/g, "").slice(0, 11));
                setError("");
              }}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-center text-base tracking-wider text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#c21828] focus:ring-4 focus:ring-red-50"
            />
          </div>

          {error && (
            <p role="alert" className="mt-2 text-xs leading-5 text-red-600">
              {error}
            </p>
          )}
        </div>

        {/* ارسال کد */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#c21828] px-4 py-4 text-sm font-bold text-white transition hover:bg-[#a91523] focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              در حال ارسال...
            </>
          ) : (
            <>
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
                  d="M19 12H5m7-7-7 7 7 7"
                />
              </svg>
              ارسال کد تأیید
            </>
          )}
        </button>

        {/* ورود با روش دیگر */}
        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs text-gray-400">یا ورود با</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <div className="flex justify-center gap-3">
          {/* گوگل */}
          <div
            title="ورود با گوگل"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-500"
          >
            G
          </div>

          {/* اپل */}
          <div
            title="ورود با اپل"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-gray-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-gray-800"
              aria-hidden="true"
            >
              <path d="M16.7 12.8c0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8s-1.8-.8-3-.8c-1.6 0-3.1 1-3.9 2.4-1.7 3-.4 7.5 1.2 9.9.8 1.2 1.7 2.5 2.9 2.5 1.2-.1 1.6-.8 3.1-.8s1.9.8 3.2.8c1.3 0 2.1-1.2 2.9-2.5.9-1.4 1.2-2.8 1.2-2.9-.1 0-2.8-1.1-2.8-4.5ZM14.5 6.5c.6-.8 1-1.9.9-3-1 .1-2.2.7-2.9 1.5-.6.7-1.1 1.8-1 2.8 1.1.1 2.2-.5 3-1.3Z" />
            </svg>
          </div>

          {/* تلگرام */}
          <div
            title="تلگرام"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-gray-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-sky-500"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.9 6.8-1.7 8.1c-.1.6-.5.7-.9.4l-2.6-1.9-1.3 1.3c-.1.2-.3.3-.6.3l.2-2.7 5-4.5c.2-.2-.1-.3-.3-.1l-6.2 3.9-2.7-.8c-.6-.2-.6-.6.1-.9l10.4-4c.5-.2.9.1.6.9Z" />
            </svg>
          </div>
        </div>

        {/* قوانین */}
        <p className="mt-7 text-center text-[11px] leading-6 text-gray-400">
          با ورود، <span className="text-[#c21828]">شرایط استفاده</span> و{" "}
          <span className="text-[#c21828]">سیاست حفظ حریم خصوصی</span> را
          می‌پذیری.
        </p>
      </form>
    </div>
  );
};

export default SendOtpFrom;
