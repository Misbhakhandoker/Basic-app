import axios from "axios";
import { LoginInput, RegisterInput } from "../validations/auth";

export async function loginUser(data: LoginInput) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
}

export async function registerUser(data: RegisterInput) {
  const response = await axios.post(
    "http://localhost:3000/api/auth/register",
    data
  );
  return response.data;
}
