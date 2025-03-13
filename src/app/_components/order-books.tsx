import { SORT_OPTIONS } from "@/constants";
import { ImportExportOutlined } from "@mui/icons-material";
import { Select, MenuItem, Box, Typography } from "@mui/material";

interface SortDropdownProps {
  order: number;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
}

export function BooksOrder({ order, setOrder }: SortDropdownProps) {
  return (
    <Select
      value={order}
      onChange={(e) => setOrder(Number(e.target.value))}
      displayEmpty
      variant="outlined"
      size="small"
      sx={{
        width: "fit-content",
      }}
      IconComponent={ImportExportOutlined}
      MenuProps={{
        disableScrollLock: true,
      }}
    >
      {SORT_OPTIONS.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{option.title}</Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}
