"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "cn";
import { CATEGORY_DETAILS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";

// Search, category and sort live in the URL, so a reload or a shared link keeps the filters.
export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState(params.get("search") || "");

  const category = params.get("category") || "";
  const sort = params.get("sort") || "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  };

  // wait until the user stops typing for a moment before searching
  useEffect(() => {
    if (search === (params.get("search") || "")) return;
    const timer = setTimeout(() => update("search", search.trim()), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services by name..."
            aria-label="Search services by name"
            className="h-11 rounded-full pl-10"
          />
          {pending ? (
            <Spinner className="absolute top-1/2 right-3.5 -translate-y-1/2 text-primary" />
          ) : (
            search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            )
          )}
        </div>
        <NativeSelect
          aria-label="Sort by price"
          value={sort}
          onChange={(e) => update("sort", e.target.value)}
          className="w-full sm:w-56 [&_select]:h-11 [&_select]:rounded-full [&_select]:pl-4"
        >
          <NativeSelectOption value="">Newest first</NativeSelectOption>
          <NativeSelectOption value="price-asc">Price: low to high</NativeSelectOption>
          <NativeSelectOption value="price-desc">Price: high to low</NativeSelectOption>
        </NativeSelect>
      </div>

      <div className="flex flex-wrap gap-2">
        {[{ name: "", label: "All Services" }, ...CATEGORY_DETAILS].map((c) => (
          <button
            key={c.name || "all"}
            type="button"
            onClick={() => update("category", c.name)}
            aria-pressed={category === c.name}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition",
              category === c.name
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {c.name || c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
