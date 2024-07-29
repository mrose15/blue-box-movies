"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PaginationProps } from "@/types/movies";

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `/movies/${params.toString()}`;
  };

  const paginationButtonStyles: string =
    "px-4 py-2 bg-blue-500 text-white rounded";

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {currentPage > 1 && (
        <button
          className={paginationButtonStyles}
          onClick={() => {
            router.push(createPageURL(currentPage - 1));
          }}
        >
          Previous
        </button>
      )}

      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <button
          className={paginationButtonStyles}
          onClick={() => {
            router.push(createPageURL(currentPage - 1));
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}
