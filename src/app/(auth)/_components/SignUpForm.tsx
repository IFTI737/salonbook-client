"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { signUp } from "@/lib/auth-client";
import { uploadImage } from "@/lib/uploadImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

const passwordRules = [
  { label: "At least 6 characters", test: (p: string) => p.length >= 6 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
];

export default function SignUpForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const liveFailedRule = passwordRules.find((rule) => !rule.test(password));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const formData = new FormData(e.currentTarget);
    // read the real value too: browser autofill doesn't always fire onChange
    const password = (formData.get("password") as string) || "";
    const failedRule = passwordRules.find((rule) => !rule.test(password));

    if (failedRule) {
      setPassword(password);
      setError(`Password needs: ${failedRule.label.toLowerCase()}`);
      toast.error("Please fix your password first");
      return;
    }

    setSubmitting(true);
    setError("");

    // Profile image: an uploaded file wins, otherwise the pasted link (both are optional).
    let image = ((formData.get("imageUrl") as string) || "").trim();
    const file = formData.get("imageFile") as File;
    if (file && file.size > 0) {
      try {
        image = await uploadImage(file);
      } catch (err) {
        toast.error((err as Error).message);
        setSubmitting(false);
        return;
      }
    }

    const { error } = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password,
      ...(image ? { image } : {}),
    });

    if (error) {
      const message = error.message || "Could not create your account";
      setError(message);
      toast.error(message);
      setSubmitting(false);
      return;
    }

    toast.success("Account created! Please sign in.");
    router.push("/sign-in");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground">Join SalonBook to book your favorite salon services.</p>
      </div>

      <GoogleButton />

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSeparator>or with email</FieldSeparator>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" name="name" autoComplete="name" placeholder="Your full name" required />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </Field>

          <Field>
            <FieldLabel htmlFor="imageFile">Profile image (optional)</FieldLabel>
            <Input id="imageFile" name="imageFile" type="file" accept="image/*" />
            <Input id="imageUrl" name="imageUrl" type="url" placeholder="or paste an image link" />
          </Field>

          <Field data-invalid={touched && !!liveFailedRule}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="••••••••"
              aria-invalid={touched && !!liveFailedRule}
              onChange={(e) => {
                setPassword(e.target.value);
                setTouched(true);
              }}
              required
            />
            <ul className="mt-1 grid gap-1 text-xs">
              {passwordRules.map((rule) => {
                const ok = rule.test(password);
                return (
                  <li key={rule.label} className={cn("flex items-center gap-1.5 transition-colors", ok ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
                    {ok ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                    {rule.label}
                  </li>
                );
              })}
            </ul>
          </Field>

          {error && <FieldError>{error}</FieldError>}

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting && <Spinner />}
            {submitting ? "Creating account..." : "Sign Up"}
          </Button>

          <FieldDescription className="text-center">
            Already have an account? <Link href="/sign-in">Sign In</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
