"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "../services/auth";
import { toast } from "sonner";
export function useAuth() {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("login successful ✅");
      router.push("/")
      console.log(data);
      
      // router.push("/");
    },
    // onError: (error) => {
    //   toast.error(`Login failed ~ ${error.message}`);
    // },
  });
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
        toast.success("Registration successful ✅");
    },
  });
  return {
    login: loginMutation,
    register: registerMutation,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error,
  };
}
