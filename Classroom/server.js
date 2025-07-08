const express =  require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cooki-parser");
app.use

const app = express();

const users = require("../routes/user.js");
const posts = require("../routes/post.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/getcookies", (req,res) =>{
    res.cookie("greet" ,"namaste");
    res.cookie("madeIn" , "India");
  res.send("sent you some cookies!");
});
// Flash middleware
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next(); // ✅ call next properly
});

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;

    if (name === "anonymous") {
        req.flash("error", "User is not defined");
    } else {
        req.flash("success", "User registered successfully");
    }

    console.log(req.session.name);
    res.send(name);
});

app.get("/hello", (req, res) => {
    res.render("page.ejs", { name: req.session.name });
});

// Mount routers
app.use("/users", users);
app.use("/posts", posts);

// Listen
app.listen(3030, () => {
    console.log("Server is listening on port 3030");
});
