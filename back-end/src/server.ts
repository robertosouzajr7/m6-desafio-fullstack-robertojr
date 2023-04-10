import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

AppDataSource.initialize()
  .then(async () => {
    console.log("Database Connected");

    const port = 3000;
    app.listen(port, () => {
      console.log(`App is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(err));
