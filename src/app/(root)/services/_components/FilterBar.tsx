"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";

// Search, category and sort live in the URL, so a reload or a shared link keeps the filters.
export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState(params.get("search") || "");

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

  const hasFilters = params.get("search") || params.get("category") || params.get("sort");

  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services by name..."
          aria-label="Search services by name"
          className="h-10 pl-9"
        />
      </div>
      <NativeSelect
        aria-label="Filter by category"
        value={params.get("category") || ""}
        onChange={(e) => update("category", e.target.value)}
        className="w-full md:w-56 [&_select]:h-10"
      >
        <NativeSelectOption value="">All categories</NativeSelectOption>
        {SERVICE_CATEGORIES.map((c) => (
          <NativeSelectOption key={c} value={c}>
            {c}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <NativeSelect
        aria-label="Sort by price"
        value={params.get("sort") || ""}
        onChange={(e) => update("sort", e.target.value)}
        className="w-full md:w-48 [&_select]:h-10"
      >
        <NativeSelectOption value="">Newest first</NativeSelectOption>
        <NativeSelectOption value="price-asc">Price: low to high</NativeSelectOption>
        <NativeSelectOption value="price-desc">Price: high to low</NativeSelectOption>
      </NativeSelect>
      <div className="flex items-center gap-2">
        {pending && <Spinner className="text-primary" />}
        {hasFilters && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearch("");
              startTransition(() => router.replace(pathname, { scroll: false }));
            }}
          >
            <X /> Clear
          </Button>
        )}
      </div>
    </div>
  );
}
