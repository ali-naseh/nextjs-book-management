import { NextRequest, NextResponse } from "next/server";
import books from "@/_mock/books";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const pageSize = 16;
  const isAudio = searchParams.get("audio") === "1";
  const isInfinity = searchParams.get("infinity") === "1";
  const sortOption = parseInt(searchParams.get("order") || "0", 10);

  let filteredBooks = books;

  if (isAudio) filteredBooks = filteredBooks.filter((b) => b.isAudio);
  if (isInfinity) filteredBooks = filteredBooks.filter((b) => b.isInfinity);

  switch (sortOption) {
    case 5:
      filteredBooks.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      break;
    case 1:
      filteredBooks.sort((a, b) => b.rating - a.rating);
      break;
    case 2:
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title, "fa"));
      break;
    case 8:
      filteredBooks.sort((a, b) => a.price - b.price);
      break;
    case 11:
      filteredBooks.sort((a, b) => b.price - a.price);
      break;
  }

  const paginatedBooks = filteredBooks.slice(offset, offset + pageSize);
  const hasMore = offset + pageSize < filteredBooks.length;
  const nextOffset = hasMore ? `${offset + pageSize}` : "";

  return NextResponse.json({
    bookList: { books: paginatedBooks },
    hasMore,
    nextOffset,
  });
}
