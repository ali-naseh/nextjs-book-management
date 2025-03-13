import { Book } from "@/types";
import { truncateText } from "@/utils/truncate-text";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Tooltip,
  useMediaQuery,
  useTheme,
  Badge,
  Stack,
} from "@mui/material";

interface BookCardProps extends Book {
  infinity?: boolean;
  onClick: VoidFunction;
  isSelected: boolean;
}

export function BookCard({
  title,
  coverUri,
  authors,
  price,
  rating,
  infinity,
  onClick,
  isSelected,
}: BookCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      onClick={onClick}
      sx={{
        mb: 2,
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        justifyContent: { xs: "initial", sm: "space-between" },
        position: "relative",
        height: { sm: 600, md: 400, lg: 450 },
        backgroundColor: (theme) =>
          isSelected
            ? theme.palette.grey[500]
            : theme.palette.background.default,
      }}
    >
      <Badge
        badgeContent="∞"
        color="warning"
        invisible={!infinity}
        sx={{
          position: "absolute",
          zIndex: 1,
          top: 10,
          left: 35,
          "& .MuiBadge-badge": {
            height: 50,
            width: 50,
            borderRadius: "20px",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 1,
          },
        }}
      />
      <CardMedia
        component="img"
        sx={{
          width: { xs: "30%", sm: "100%" },
          height: { xs: "100%", sm: "55%" },
          alignSelf: "center",
          objectFit: "contain",
        }}
        image={coverUri}
        alt={title}
      />
      <CardContent sx={{ height: { xs: "auto", sm: "40%" } }}>
        <Stack justifyContent={"space-between"} height={"100%"}>
          <Tooltip title={title} placement="top-start">
            <Typography variant="body1">
              {truncateText(title, isMobile ? 20 : title.length)}
            </Typography>
          </Tooltip>
          <Tooltip
            title={authors
              .map((author) => `${author.firstName} ${author.lastName}`)
              .join(", ")}
            placement="top-start"
          >
            <Typography variant="subtitle2" color="text.secondary">
              {truncateText(
                authors
                  .map((author) => `${author.firstName} ${author.lastName}`)
                  .join(", "),
                isMobile ? 32 : 50
              )}
            </Typography>
          </Tooltip>
          <Typography variant="body2" color="primary">
            {price ? `$${price}` : "free"}
          </Typography>
          <Rating value={rating} readOnly precision={0.5} />
        </Stack>
      </CardContent>
    </Card>
  );
}
