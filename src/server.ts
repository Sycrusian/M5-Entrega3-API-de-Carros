import { app } from "./app";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API sucessfully started at port ${port}`);
});