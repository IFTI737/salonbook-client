"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { uploadImage } from "@/lib/uploadImage";
import { createService, updateService } from "@/lib/action/services";
import type { Service } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import SafeImage from "@/components/shared/SafeImage";

// Used for both "Add service" and "Edit service". The image is always an uploaded file (imgbb).
export default function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const isEdit = Boolean(service);
  const [preview, setPreview] = useState(service?.image || "");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    if (!isEdit && !file) {
      toast.error("Please upload a service image");
      return;
    }

    setSaving(true);
    try {
      const image = file ? await uploadImage(file) : service!.image;
      const input = {
        serviceName: String(form.get("serviceName") || ""),
        category: String(form.get("category") || ""),
        description: String(form.get("description") || ""),
        price: Number(form.get("price")),
        duration: Number(form.get("duration")),
        image,
        status: form.get("status") === "inactive" ? ("inactive" as const) : ("active" as const),
      };
      const res = isEdit ? await updateService(service!._id, input) : await createService(input);
      if (!res.success) throw new Error(res.message);
      toast.success(isEdit ? "Service updated" : "Service added");
      router.push("/dashboard/admin/services");
    } catch (err) {
      toast.error((err as Error).message);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-2xl border bg-card p-6 lg:grid-cols-[1fr_320px]">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="serviceName">Service name</FieldLabel>
          <Input id="serviceName" name="serviceName" defaultValue={service?.serviceName} minLength={3} required placeholder="e.g. Classic Haircut & Blow Dry" />
        </Field>
        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <NativeSelect id="category" name="category" defaultValue={service?.category || ""} required className="w-full">
            <NativeSelectOption value="" disabled>
              Choose a category
            </NativeSelectOption>
            {SERVICE_CATEGORIES.map((c) => (
              <NativeSelectOption key={c} value={c}>
                {c}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="price">Price (USD)</FieldLabel>
            <Input id="price" name="price" type="number" min="1" step="0.01" defaultValue={service?.price} required />
          </Field>
          <Field>
            <FieldLabel htmlFor="duration">Duration (minutes)</FieldLabel>
            <Input id="duration" name="duration" type="number" min="5" max="600" step="5" defaultValue={service?.duration} required />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="status">Status</FieldLabel>
          <NativeSelect id="status" name="status" defaultValue={service?.status || "active"} className="w-full">
            <NativeSelectOption value="active">Active (visible and bookable)</NativeSelectOption>
            <NativeSelectOption value="inactive">Inactive (hidden from customers)</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea id="description" name="description" rows={5} minLength={10} defaultValue={service?.description} required placeholder="What is included, who it is for..." />
        </Field>
        <div className="flex gap-2">
          <Button type="submit" size="lg" disabled={saving}>
            {saving && <Spinner />}
            {saving ? "Saving..." : isEdit ? "Update service" : "Add service"}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={() => router.back()} disabled={saving}>
            Cancel
          </Button>
        </div>
      </FieldGroup>

      <Field>
        <FieldLabel htmlFor="image">Service image</FieldLabel>
        <label className="relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed text-sm text-muted-foreground transition-colors hover:border-primary">
          {preview ? (
            <SafeImage src={preview} alt="Service image preview" sizes="320px" />
          ) : (
            <>
              <ImagePlus className="size-8" /> Click to upload
            </>
          )}
          <input
            id="image"
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
        <FieldDescription>{isEdit ? "Upload a new image to replace the current one." : "JPG or PNG. It is uploaded to imgbb."}</FieldDescription>
      </Field>
    </form>
  );
}
