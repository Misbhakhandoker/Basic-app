"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "../services/auth";
export function useAuth() {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push("/");
    },
    // onError: (error) => {
    //   toast.error(`Login failed ~ ${error.message}`);
    // },
  });
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      //   toast.success("Registration successful");
      router.push("/login");
    },
    // onError: (error) => {
    //   toast.error(`Registration failed ~ ${error.message}`);
    // },
  });
  return {
    login: loginMutation,
    register: registerMutation,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error,
  };
}
