import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

type SingleProps = {
  index: number;
  title: string;
  body: string;
  createdAt: string;
};

const Single = (props: SingleProps) => {
  const theme = useTheme();
  const bgDark = "#0c1e2a";
  const bgLight = "#036da9"; //036da9
  const [hover, setHover] = useState(false);
  return (
    <Card
      variant="outlined"
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
      sx={{
        m: "auto",
        borderWidth: "1.4px",
        borderColor: hover ? "#f7d882" : "#ff8708",
        width: { xs: "75%", sm: "79%", md: "75%", lg: "75%" },
        boxShadow: hover ? 12 : 5,
        background: `linear-gradient(205deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,
        color: theme.palette.getContrastText(theme.palette.secondary.dark),
      }}
    >
      <CardHeader title={`#${props.index} - ${props.title}`} />
      <CardContent>
        <Typography variant="body2">{props.body}</Typography>
        <Typography variant="subtitle1">
          Created at {props.createdAt.split("T")[0]}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Single;
