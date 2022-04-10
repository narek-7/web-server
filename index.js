const express = require("express");
const chalk = require("chalk");
const { addNote, getNotes, removeNote, editNote } = require("./notes.controller");
const path = require("path");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
// defoult folder named is "views", here we change his name to "pages"
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
// we will tell express, wich data we use and what format they will use
app.use(express.json());
app.use(
   express.urlencoded({
      extended: true,
   })
);

app.get("/", async (req, res) => {
   // res.sendFile(path.join(basePath, "index.html")); - instead of this we can use new format
   res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      created: false,
   });
});

app.post("/", async (req, res) => {
   await addNote(req.body.title);
   res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      created: true,
   });
});

app.delete("/:id", async (req, res) => {
   await removeNote(req.params.id);
   res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      created: false,
   });
});

app.put("/:id/:title", async (req, res) => {
   console.log(typeof req.params.id);
   await editNote(req.params);
   res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      created: false,
   });
});

app.listen(port, () => {
   console.log(chalk.green(`Server running on port ${port}...`));
});
