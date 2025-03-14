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
