// importing the express package in our file.
const express = require("express");
// connect to mongo db using the function connectMongoDb
const { connectMongoDb } = require("./connection");

const cookieParser = require('cookie-parser');
// import the fs function to log the data.
const { logReqRes } = require("./middlewares"); // here no need to write index.js , it automatically means pick from index .js file
// import the userRouter from the userRouter.js file.
const userRouter = require("./routes/user");

const cors = require("cors");

const customerRouter = require("./routes/customer");
const artistRouter = require("./routes/artist");
const eventRouter = require("./routes/events");
const outletRouter = require("./routes/outlet");
const calendarRouter = require("./routes/calendar");

const imageRouter = require("./controllers/images");
const videoRouter = require("./controllers/videos");


// creating your app.
const app = express();
// create a port for our application.

app.use(express.json());
app.use(cors());

// Middleware to parse cookies
app.use(cookieParser());
const PORT = 8000;
// connect to our mongo db database.
connectMongoDb("mongodb://127.0.0.1:27017/nerolifedb");
// this is to parse the entire body of the json, while taking from the front end.form
app.use(express.urlencoded({ extended: false }));
// here use the function to log the req and response..into a text file calling the file as log.txt file.
app.use(logReqRes("log.txt"));

// Routes for the user has to be defined here.
app.use("/api/users", userRouter);

app.use("/api/customers", customerRouter);
app.use("/api/artists", artistRouter);
app.use("/api/events", eventRouter);
app.use("/api/outlets", outletRouter);
app.use("/api/calendars", calendarRouter);
app.use("/api/images", imageRouter);
app.use("/api/videos", videoRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// tell the server to listten to the given port number to start the server. and console the log for successful connection.
app.listen(PORT, () =>
  console.log(`Server successfully at port number ${PORT}`)
);
