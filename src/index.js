const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const app = express();

const { authRouter } = require("./api/routes");

env.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use(authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on: ${process.env.PORT}`);
});
