"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSX } from "react";

const queryClient = new QueryClient();

export function QueryProvider({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
