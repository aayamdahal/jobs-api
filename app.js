require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const authenticateUser = require("./middleware/authentication");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
// connect db
const connectDB = require("./db/connect");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// extra security packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    // connectdb
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log("error", error);
  }
};

start();
