import { Card, CardContent, CardHeader, Typography } from "@mui/material";

type SingleProps = {
  index: number;
  title: string;
  body: string;
  createdAt: string;
};

const Single = (props: SingleProps) => {
  return (
    <Card sx={{ my: 5 }}>
      <CardHeader title={`#${props.index} - ${props.title}`} />
      <CardContent>
        <Typography variant="h4">{props.body}</Typography>
        <Typography variant="subtitle1">
          Created at {props.createdAt.split("T")[0]}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Single;
