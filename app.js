const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");

require("dotenv").config();
const { corsOptions } = require("./configs/cors-options");

const { credentials } = require("./middlewares/credentials");
const errorHandler = require("./middlewares/error-handler");
const { logger } = require("./middlewares/log-events");

const routes = require("./routes/index");

const PORT = process.env.PORT || 5000;

// Middlewares

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(fileUpload({ createParentPath: true }));

app.use(logger);

app.use(credentials);
app.use(cors(corsOptions));

// Routes
app.use(routes);

// Server Check

app.get("/", (req, res) => {
  res.json({ success: true, message: "Hello from the server-side!" });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server initiated @http://localhost:${PORT}`);
});
