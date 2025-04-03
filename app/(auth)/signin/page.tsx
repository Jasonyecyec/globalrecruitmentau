import SignInForm from "./signin_form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Login - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Login Page",
};

export default async function SignIn() {
  return (
    <main className="">
      <SignInForm />
    </main>
  );
}
