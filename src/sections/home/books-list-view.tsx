"use client";

import { useBooks } from "@/api/get-books";
import { BookCard, BooksFilter, BooksOrder } from "@/app/_components";
import { useTheme } from "@/providers/theme-provider";

import { GetBooksRes } from "@/types";
import { DarkMode, LightMode } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Typography,
  Grid2,
  Stack,
  IconButton,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

interface BooksListViewProps {
  initialBooks: GetBooksRes;
}

export function BooksListView({ initialBooks }: BooksListViewProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const { mode, toggleTheme } = useTheme();
  const [filters, setFilters] = useState<{
    audio: boolean;
    infinity: boolean | undefined;
  }>({
    audio: false,
    infinity: undefined,
  });
  const [order, setOrder] = useState<number>(1);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const {
    data: books,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isRefetching,
    refetch,
  } = useBooks(initialBooks, filters, order);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookCallback = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (!isFirstRender) {
      refetch();
    }
    setIsFirstRender(false);
  }, [filters, order, refetch]);

  if (isLoading)
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <Typography color="error">{error!.message}</Typography>
      </Box>
    );

  return (
    <Box
      py={2}
      px={{ xs: 2, md: 6 }}
      sx={{
        backgroundColor: mode === "dark" ? "#121212" : "#e9e9e9",
      }}
    >
      <Stack
        spacing={1.5}
        mb={2}
        direction={"row"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <Stack spacing={1}>
          <BooksFilter filters={filters} setFilters={setFilters} />
          <BooksOrder order={order} setOrder={setOrder} />
        </Stack>

        <IconButton onClick={toggleTheme}>
          {mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Stack>

      {isRefetching && !isFetchingNextPage && !isFirstRender ? (
        <Box display={"flex"} justifyContent={"center"} height={"100vh"}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid2 container spacing={3} px={{ xs: 0, md: 2 }} flexGrow={1}>
          {books.map((book, index) => (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
              key={`${book.id}${index}`}
              ref={index === books.length - 1 ? lastBookCallback : null}
            >
              <BookCard
                {...book}
                infinity={filters.infinity}
                onClick={() =>
                  setSelected((prev) => {
                    if (prev.includes(book.id)) {
                      return prev.filter((b) => b !== book.id);
                    }
                    return [...prev, book.id];
                  })
                }
                isSelected={selected.includes(book.id)}
              />
            </Grid2>
          ))}
        </Grid2>
      )}

      {isFetchingNextPage && (
        <Box display="flex" justifyContent="center" mt={1}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
