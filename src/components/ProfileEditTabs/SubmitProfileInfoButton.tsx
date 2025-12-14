"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitProfileInfoButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`w-full rounded-xl py-3 font-semibold text-white shadow ${
        pending
          ? "bg-indigo-400 cursor-wait"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          {/* spinner */}
          <svg
            className="animate-spin h-5 w-5"
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
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Saving Changes...
        </span>
      ) : (
        "Save Changes"
      )}
    </Button>
  );
};

export default SubmitProfileInfoButton;
