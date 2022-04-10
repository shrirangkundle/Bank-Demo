// console.log("task manager setup");

const express = require("express");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const app = express();
const port = process.env.PORT || 5000;

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
require("dotenv").config();

// security middleware
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(helmet());
app.use(cors());
app.use(xss());

//middleware
app.use(express.json());

//routes
app.use("/api/user", tasks);

//404 error handler

app.use(notFound);

//bad request middleware
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
