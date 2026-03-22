import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import useAuth from "../hooks/useAuth";

export default function CompleteProfile() {
  const { updateProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    updateProfile(data);
  };

  return (
    <div className="min-h-page bg-primary-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Section: Text & Illustration */}
        <div className="flex flex-col text-center lg:text-left items-center lg:items-start pt-8 lg:pt-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
            Complete Your Profile
          </h1>
          <p className="text-base sm:text-lg text-text-secondary mb-8 max-w-md">
            To finish setting up, please provide your full name. Your phone
            number is optional for extra security and booking updates.
          </p>

          <div className="w-full flex justify-center max-w-xs sm:max-w-sm">
            <img
              src="/images/login-illustration.png" // Reusing the established illustration
              alt="Tickets and Movies Illustration"
              className="w-auto h-50 drop-shadow-sm"
            />
          </div>
        </div>

        {/* Right Section: Form Card */}
        <div className="bg-card w-full max-w-md mx-auto rounded-2xl shadow-lg p-6 sm:p-8 border border-border">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 text-center lg:text-left">
            Finalize Your Details
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {/* Full Name Input */}
            <Input
              label="Full Name*"
              id="name"
              type="text"
              placeholder="John Doe"
              error={errors.name?.message}
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />

            {/* Phone Number Input */}
            <div>
              <Input
                label="Phone Number"
                id="phone"
                type="tel"
                placeholder="XXXXX67890"
                error={errors.phone?.message}
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                }
                {...register("phone", {
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
              />
              <p className="text-xs text-text-secondary mt-1.5 ml-1">
                (Optional, for booking alerts)
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="mt-6"
              isLoading={isSubmitting}
            >
              Finish Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
