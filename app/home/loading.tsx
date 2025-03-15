import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <p>
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
    </p>
  );
}
