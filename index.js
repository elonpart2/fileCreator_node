const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

app.get("/", function (req, res) {
  fs.readdir("./files", function (err, files){
    res.render("index", {files: files});
  })
});

app.get("/files/:filename", function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata){
    res.render("show", { filename: req.params.filename, filedata: filedata});
  })
})

app.post("/create", function (req, res) {
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
    res.redirect("/");
  })
})

app.get("/profile/:username", function (req, res) {
  res.send(`<h1>Welcome ${req.params.username}</h1>`);
});


app.get("/author/:username/:age", function (req, res) {
  res.send(`<h1>When owner ${req.params.username + req.params.age}</h1>`);
  // res.send(req.params)
} );

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
