"use client";

import { useTheme } from "@/providers/theme-provider";
import {
  FormControlLabel,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

interface BooksFilterProps {
  filters: {
    audio: boolean;
    infinity: boolean | undefined;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{ audio: boolean; infinity: boolean | undefined }>
  >;
}

export function BooksFilter({ filters, setFilters }: BooksFilterProps) {
  const { mode } = useTheme();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, audio: event.target.checked }));
  };

  const handleInfinityFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: "all" | boolean | undefined
  ) => {
    if (newValue !== null) {
      setFilters((prev) => ({
        ...prev,
        infinity: newValue === "all" ? undefined : newValue,
      }));
    }
  };

  return (
    <Stack
      spacing={{ xs: 1, md: 0 }}
      direction={{ xs: "column-reverse", md: "row-reverse" }}
      alignItems={"center"}
    >
      <FormControlLabel
        control={
          <Switch checked={filters.audio} onChange={handleFilterChange} />
        }
        label="Audio books"
        sx={{
          color: (theme) =>
            mode === "dark" ? "#ffffff" : theme.palette.text.primary,
        }}
      />

      <ToggleButtonGroup
        value={filters.infinity === undefined ? "all" : filters.infinity}
        exclusive
        onChange={handleInfinityFilterChange}
        aria-label="Infinity filter"
        sx={{ direction: "ltr" }}
      >
        <ToggleButton value={"all"}>all</ToggleButton>
        <ToggleButton value={true}>Infinity</ToggleButton>
        <ToggleButton value={false}>Normal</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
