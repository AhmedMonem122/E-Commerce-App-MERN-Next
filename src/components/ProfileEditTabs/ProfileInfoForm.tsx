"use client";

import { useActionState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User } from "@/types/user";
import {
  ProfileFormState,
  updateProfileAction,
} from "@/app/actions/profile/profileActions";
import { Camera } from "lucide-react";
import SubmitProfileInfoButton from "./SubmitProfileInfoButton";

const initialState: ProfileFormState = {};

export default function ProfileInfoForm({ user }: { user: User }) {
  const [state, formAction] = useActionState(updateProfileAction, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.success) toast.success("Profile updated successfully");
    if (state?.message) toast.error(state.message);
  }, [state]);

  return (
    <form
      action={formAction}
      className="space-y-8 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4"
    >
      {/* Avatar Upload */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative group cursor-pointer">
          <Avatar className="w-28 h-28 border shadow-md">
            <AvatarImage
              src={user.photo || ""}
              alt={user.name}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-primary/20 to-primary/40">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Hover overlay */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
          >
            <Camera className="text-white w-6 h-6" />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Click avatar to upload a new photo
        </p>

        <input
          ref={fileInputRef}
          type="file"
          name="photo"
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={user.name}
          placeholder="Your name"
        />
        {state?.validationErrors?.name && (
          <p className="text-sm text-destructive">
            {state.validationErrors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={user.email}
          placeholder="you@example.com"
        />
        {state?.validationErrors?.email && (
          <p className="text-sm text-destructive">
            {state.validationErrors.email}
          </p>
        )}
      </div>

      {/* Submit */}
      <SubmitProfileInfoButton />
    </form>
  );
}
