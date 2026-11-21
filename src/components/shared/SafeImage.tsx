"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "cn";

// next/image with a soft placeholder when the link is broken.
export default function SafeImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={cn("flex size-full items-center justify-center bg-muted text-muted-foreground", className)}>
        <ImageOff className="size-8" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
