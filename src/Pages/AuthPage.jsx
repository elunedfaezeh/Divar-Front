import React, { useState } from "react";
import SendOtpFrom from "Components/Templates/SendOtpFrom";
import CheckOtpForm from "Components/Templates/CheckOtpForm";

const AuthPage = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, stCode] = useState("");

  return (
    <div>
      {step === 1 && (
        <SendOtpFrom setStep={setStep} mobile={mobile} setMobile={setMobile} />
      )}
      {step === 2 && (<CheckOtpForm setStep={setStep} mobile={mobile} code={code} stCode={stCode} />)}
    </div>
  );
};

export default AuthPage;
