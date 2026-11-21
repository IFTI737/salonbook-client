"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/uploadImage";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import StatusBadge from "@/components/shared/StatusBadge";

type Props = { user: { name: string; email: string; image?: string | null; role: string; createdAt: string | Date } };

// Users can change only their name and photo. Role and blocked status are input:false in
// Better Auth, so the server ignores them even if someone sends them.
export default function ProfileForm({ user }: Props) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [preview, setPreview] = useState(user.image || "");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }
    setSaving(true);
    try {
      const image = file ? await uploadImage(file) : user.image || undefined;
      const { error } = await authClient.updateUser({ name: name.trim(), image });
      if (error) throw new Error(error.message);
      toast.success("Profile updated");
      setFile(null);
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message || "Could not update your profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid max-w-3xl gap-6 rounded-2xl border bg-card p-6 md:grid-cols-[200px_1fr]">
      <div className="flex flex-col items-center gap-3 text-center">
        <label className="group relative cursor-pointer" title="Change photo">
          <Avatar className="size-32 ring-4 ring-primary/20">
            {preview && <AvatarImage src={preview} alt={user.name} referrerPolicy="no-referrer" />}
            <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <span className="absolute right-1 bottom-1 flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
            <Camera className="size-4" />
          </span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setFile(f);
              setPreview(URL.createObjectURL(f));
            }}
          />
        </label>
        <StatusBadge status={user.role} />
        <p className="text-xs text-muted-foreground">
          Member since {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" value={user.email} disabled />
          <FieldDescription>Email cannot be changed.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Role</FieldLabel>
          <Input value={user.role === "admin" ? "Admin" : "Customer"} disabled />
          <FieldDescription>Roles are managed by the salon and cannot be changed here.</FieldDescription>
        </Field>
        <Button type="submit" size="lg" className="w-fit" disabled={saving}>
          {saving && <Spinner />}
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </FieldGroup>
    </form>
  );
}
