import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import GoogleAuthButton from "../components/ui/GoogleAuthButton";
import useAuth from "../hooks/useAuth";
import { api } from "../services/axios";
import useNotification from "../hooks/useNotification";

export default function GetStarted() {
  const { getStarted } = useAuth();
  const { addNotification } = useNotification();

  const [step, setStep] = useState(1);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  // Countdown Effect
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm({ mode: "onSubmit" });

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    setValue,
    formState: { errors: otpErrors, isSubmitting: isOtpSubmitting },
  } = useForm({ mode: "onSubmit" });

  // --- Step 1: Request OTP ---
  const onEmailSubmit = async ({ email }) => {
    try {
      await api.post(
        "/auth/send-otp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSubmittedEmail(email);
      setTimer(30);
      setStep(2);
      addNotification("OTP sent successfully.");
    } catch (err) {
      addNotification(
        err?.response?.data?.message || "Failed to send OTP.",
        true
      );
    }
  };

  // --- Step 2: Verify OTP ---
  const onOtpSubmit = async (data) => {
    getStarted({ email: submittedEmail, otp: data.otp });
  };

  // --- Resend OTP Logic with Loading Animation ---
  const handleResendOtp = async () => {
    if (timer > 0 || isResendingOtp) return; // Prevent clicking during timer or loading
    setIsResendingOtp(true); // Start loading animation
    try {
      await api.post(
        "/auth/send-otp",
        { email: submittedEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimer(30);
      addNotification("OTP sent successfully.");
    } catch (err) {
      addNotification(
        err?.response?.data?.message || "Failed to resend OTP.", // Corrected typo
        true
      );
    } finally {
      setIsResendingOtp(false); // Stop loading animation
    }
  };

  return (
    <div className="min-h-page bg-primary-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Section: Text & Illustration */}
        <div className="flex flex-col text-center lg:text-left items-center lg:items-start pt-8 lg:pt-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
            Join BookShowFast to Book Instant Tickets
          </h1>
          <p className="text-base sm:text-lg text-text-secondary mb-8 max-w-md">
            Book shows, movies, events instantly with exclusive offers.
          </p>

          <div className="w-full flex justify-center max-w-xs sm:max-w-sm">
            <img
              src="/images/login-illustration.png"
              alt="Tickets and Movies Illustration"
              className="w-auto h-50 drop-shadow-sm"
            />
          </div>
        </div>

        {/* Right Section: Form Card */}
        <div className="bg-card w-full max-w-md mx-auto rounded-2xl shadow-lg p-6 sm:p-8 border border-border transition-all duration-300 relative overflow-hidden">
          {/* ================= STEP 1: EMAIL INPUT ================= */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 text-center">
                Get Started
              </h2>
              <p className="text-center text-text-secondary text-sm mb-6">
                Log in or create a new account to continue.
              </p>

              <div className="flex justify-center mb-6">
                <GoogleAuthButton />
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-card text-text-secondary">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form
                onSubmit={handleEmailSubmit(onEmailSubmit)}
                noValidate
                className="space-y-4"
              >
                <Input
                  label="Email Address*"
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  error={emailErrors.email?.message}
                  icon={
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-7-7H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  {...registerEmail("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="mt-6"
                  isLoading={isEmailSubmitting}
                >
                  Continue
                </Button>
              </form>

              <p className="text-center text-xs text-text-secondary mt-6 leading-relaxed">
                By continuing, you agree to BookShowFast's{" "}
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-700 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-700 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          )}

          {/* ================= STEP 2: OTP INPUT ================= */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => {
                  setStep(1);
                  setValue("otp", "");
                }}
                className="flex items-center text-sm text-text-secondary hover:text-primary-600 transition-colors mb-4 cursor-pointer"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>

              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 text-center">
                Verify your email
              </h2>
              <p className="text-center text-text-secondary text-sm mb-6">
                We sent a 6-digit code to
                <span className="font-semibold text-text-primary">
                  {submittedEmail}
                </span>
              </p>

              <form
                onSubmit={handleOtpSubmit(onOtpSubmit)}
                noValidate
                className="space-y-4"
              >
                <Input
                  label="Enter 6-digit code*"
                  id="otp"
                  type="text"
                  maxLength="6"
                  placeholder="• • • • • •"
                  className="text-center text-2xl tracking-[0.5em]"
                  error={otpErrors.otp?.message}
                  {...registerOtp("otp", {
                    required: "Code is required",
                    minLength: {
                      value: 6,
                      message: "Code must be exactly 6 digits",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Code must contain only numbers",
                    },
                  })}
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="mt-6"
                  isLoading={isOtpSubmitting}
                >
                  Verify & Get started
                </Button>
              </form>

              <p className="text-center text-sm text-text-secondary mt-6">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0 || isResendingOtp}
                  className={`cursor-pointer font-medium transition-colors inline-flex items-center ${
                    timer > 0 || isResendingOtp
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-primary-600 hover:text-primary-700"
                  }`}
                >
                  {isResendingOtp ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Resending...
                    </span>
                  ) : timer > 0 ? (
                    `Resend in ${timer}s`
                  ) : (
                    "Resend"
                  )}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
