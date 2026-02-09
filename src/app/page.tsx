import { callApi } from "@/core/http-service";
import { ApiMethodEnums } from "@/types";
import type { GetBooksRes } from "@/types";
import { Stack, Typography } from "@mui/material";
import { BooksListView } from "@/sections/home/books-list-view";
import { PermScanWifi } from "@mui/icons-material";

async function getBooks() {
  try {
    return await callApi<null, GetBooksRes>({
      url: `/api/books?offset=0`,
      method: ApiMethodEnums.GET,
    });
  } catch (error) {
    console.error("error in fetching books: ", error);
    return null;
  }
}

export default async function BooksPage() {
  const initialBooks = await getBooks();

  if (!initialBooks)
    return (
      <Stack alignItems={"center"} justifyContent={"center"} p={4} spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4" textAlign={"center"}>
            Error in fetching books...
          </Typography>
          <Typography variant="h6" textAlign={"center"}>
            Check your internet connection!
          </Typography>
        </Stack>
        <PermScanWifi fontSize="large" />
      </Stack>
    );

  return <BooksListView initialBooks={initialBooks} />;
}
