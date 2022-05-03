const dotenv = require("dotenv");
const express = require("express");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

const connectDB = require("./config/db");
const passportConf = require("./config/passport");

// load config / environment variables from .env file
dotenv.config({ path: ".env" });

// passport config for Google OAuth
passportConf(passport);

connectDB();

const app = express();

// log in
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Express Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/home", require("./routes/home"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    );
});
