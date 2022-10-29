import { Card, CardContent, CardHeader, Typography } from "@mui/material";

type SingleProps = {
  index: number;
  title: string;
  body: string;
  createdAt: string;
};

const Single = (props: SingleProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        m: "auto",
        borderWidth: "1px",
        width: { xs: "75%", sm: "79%", md: "75%", lg: "75%" },
      }}
    >
      <CardHeader title={`#${props.index} - ${props.title}`} />
      <CardContent>
        <Typography variant="body1">{props.body}</Typography>
        <Typography variant="subtitle1">
          Created at {props.createdAt.split("T")[0]}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Single;
