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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        m: "auto",
        borderWidth: "1.4px",
        borderColor: hover ? "#f7d882" : "#ff8708",
        width: { xs: "65%", sm: "70%", md: "75%", lg: "75%" },
        height: { xs: "15vh%", sm: "17vh", md: "20vh", lg: "23vh" },
        boxShadow: hover ? 20 : 5,
        background: `linear-gradient(205deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,
        color: theme.palette.getContrastText(theme.palette.secondary.dark),
      }}
    >
      <CardHeader
        title={`#${props.index} - ${props.title.replaceAll("-", " ")}`}
      />
      <CardContent>
        <Typography variant="body2" sx={{ fontSize: 15 }}>
          {props.body?.length > 30
            ? props.body.substring(0, 30) + "..."
            : props.body}
        </Typography>
        <Typography variant="overline">
          Created at {props.createdAt.split("T")[0]}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Single;
