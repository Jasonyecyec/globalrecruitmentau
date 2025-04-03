import api from "./client";
import { LoginFormSchema } from "@/schemas/auth";

export const loginUser = async ({ email, password }: LoginFormSchema) => {
  try {
    const response = await api.post("/auth/signin", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupUser = async (data: FormData) => {
  try {
    const response = await api.post("/auth/signup", data, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
