import { Suspense } from "react";
import type { Metadata } from "next";
import { Spinner } from "@/components/ui/spinner";
import SignInForm from "../_components/SignInForm";

export const metadata: Metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <Suspense fallback={<Spinner className="mx-auto size-8 text-primary" />}>
      <SignInForm />
    </Suspense>
  );
}
