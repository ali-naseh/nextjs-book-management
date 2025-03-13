import type { GetBooksRes, GetBooksReq, BookFilters } from "@/types";
import { ApiMethodEnums } from "@/types";
import { callApi } from "@/core/http-service";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchBooks = async ({
  pageParam = "0-0-0-16",
  filters,
  order,
}: {
  pageParam: string;
  filters: BookFilters;
  order: number;
}): Promise<GetBooksRes> => {
  const queryParams = new URLSearchParams();
  queryParams.set("offset", pageParam);
  queryParams.set("order", order.toString());

  if (filters.audio !== undefined) {
    queryParams.set("audio", filters.audio ? "1" : "0");
  }
  if (filters.infinity !== undefined) {
    queryParams.set("infinity", filters.infinity ? "1" : "0");
  }

  const url = `/api/books?${queryParams.toString()}`;

  const response = await callApi<GetBooksReq, GetBooksRes>({
    url,
    method: ApiMethodEnums.GET,
  });

  return response;
};

export const useBooks = (
  initialBooks: GetBooksRes,
  filters: BookFilters,
  order: number
) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isError,
    error,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["getBooks", filters, order],
    queryFn: ({ pageParam }) => fetchBooks({ pageParam, filters, order }),
    initialPageParam: "0-0-0-16",
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextOffset : undefined;
    },
    retry: 3,
    enabled: !!initialBooks,
    staleTime: 1000 * 60 * 5,
    initialData: {
      pages: [initialBooks],
      pageParams: ["0-0-0-16"],
    },
  });

  return {
    data: data?.pages.flatMap((page) => page.bookList.books) || [],
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isError,
    error,
    isFetchingNextPage,
    isRefetching,
  };
};
