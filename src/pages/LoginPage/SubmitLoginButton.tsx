"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitLoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full mt-4" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
          <span>Logging in...</span>
        </>
      ) : (
        "Login"
      )}
    </Button>
  );
};

export default SubmitLoginButton;
