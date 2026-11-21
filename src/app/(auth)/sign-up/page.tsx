import type { Metadata } from "next";
import SignUpForm from "../_components/SignUpForm";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignUpPage() {
  return <SignUpForm />;
}
