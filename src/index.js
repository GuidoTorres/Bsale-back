require("dotenv").config();

const express = require("express");
const cors = require("cors");

const categoryRouter = require('./routes/category')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/categories", categoryRouter)
// app.use("/api/v1/products")

app.listen(PORT, () => {

    console.log("Servidor funcionando correctamente en el puerto", PORT);
});
