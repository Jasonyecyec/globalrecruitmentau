import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;

// custom type for File
const ACCEPTED_FILE_TYPE = [
  "application/pdf", // PDF
  "application/msword", // DOC
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
];

const baseSignupSchema = z.object({
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  contact_number: z.string(),
  password: z.string().min(8, "Password must be atleast 8 characters"),
  confirm_password: z.string(),
  user_type: z.string(),
  resume_path: z.string().nullable(),
  linked_profile: z.string().nullable(),
  portfolio_link: z.string().nullable(),
});

export const signupSchema = baseSignupSchema.refine(
  (data) => data.password === data.confirm_password,
  {
    message: "Password does not match.",
    path: ["confirm_password"],
  }
);

export type SignupFormSchema = z.infer<typeof signupSchema>;
