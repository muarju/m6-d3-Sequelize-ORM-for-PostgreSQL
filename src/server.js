import express from "express";
import db from "./db/models/index.js";
import categoryRoutes from "./services/category/index.js";
import productsRoutes from "./services/products/index.js";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());
app.use("/category", categoryRoutes);
app.use("/product", productsRoutes);

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log("🚀 Server is running on port ", port));

    app.on("error", (error) =>
      console.log("🚀 Server is crashed due to ", error)
    );
  })
  .catch((e) => console.log(e));
