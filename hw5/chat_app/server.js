const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        name: "session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

const PORT = 35300;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
