import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "Services/Auth";
import { setCookies } from "src/utils/cookies";

const CheckOtpForm = ({ setStep, mobile, code, stCode }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!/^\d{5}$/.test(code)) {
      setError("کد تأیید باید ۵ رقم باشد.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { response, error } = await checkOtp(mobile, code);

      if (response) {
        setCookies(response.data);

        await queryClient.invalidateQueries({
          queryKey: ["profile"],
        });

        navigate("/dashboard");
      } else if (error) {
        setError(
          error.response?.data?.message ||
            "کد تأیید صحیح نیست یا منقضی شده است."
        );
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl"  className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 py-8"
>
      <form
        onSubmit={submitHandler}
        className=" rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-[0_8px_35px_rgba(0,0,0,0.06)] sm:px-10 sm:py-9"
      >
        {/* لوگو */}
        <div className="mb-7 text-center">
         

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#c21828]">
            <img src="divar.svg" alt="" />
  
          </div>

          <h2 className="text-xl font-extrabold text-gray-900">
            کد تأیید رو وارد کن
          </h2>

          <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-gray-500">
            کد تأیید برای شماره زیر ارسال شده است.
          </p>

          <p
            dir="ltr"
            className="mt-2 inline-block rounded-lg bg-gray-50 px-4 py-2 text-base font-bold tracking-wider text-[#c21828]"
          >
            {mobile}
          </p>
        </div>

        {/* ورودی کد */}
        <div className="mb-5">
          <label
            htmlFor="otp-input"
            className="mb-3 block text-sm font-semibold text-gray-800"
          >
            کد تأیید
          </label>

          <input
            id="otp-input"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            dir="ltr"
            maxLength={5}
            value={code}
            onChange={(event) => {
              stCode(
                event.target.value.replace(/\D/g, "").slice(0, 5)
              );
              setError("");
            }}
            placeholder="-----"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-center text-2xl font-semibold tracking-[0.7em] text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-[#c21828] focus:ring-4 focus:ring-red-50"
          />

          {error && (
            <p role="alert" className="mt-2 text-xs leading-5 text-red-600">
              {error}
            </p>
          )}
        </div>

        {/* تأیید و ورود */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#c21828] px-4 py-4 text-sm font-bold text-white transition hover:bg-[#a91523] focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              در حال بررسی...
            </>
          ) : (
            <>
              تأیید و ورود
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
            </>
          )}
        </button>

        {/* تغییر شماره */}
        <button
          type="button"
          onClick={() => {
            setError("");
            setStep(1);
          }}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-[#c21828]"
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
              d="M16.023 9.348h4.992V4.356M20.8 9.2a8.25 8.25 0 0 0-14.5-3.5M7.977 14.652H2.985v4.992M3.2 14.8a8.25 8.25 0 0 0 14.5 3.5"
            />
          </svg>

          تغییر شماره موبایل
        </button>

        {/* توضیح پایین */}
        <div className="mt-7 border-t border-gray-100 pt-5">
          <p className="text-center text-xs leading-6 text-gray-400">
            کد تأیید رو وارد کن تا با خیال راحت وارد حساب کاربریت بشی.
          </p>
        </div>
      </form>
    </div>
  );
};

export default CheckOtpForm;
