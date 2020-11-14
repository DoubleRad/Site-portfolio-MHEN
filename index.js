const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");
const routes = require("./routes/routes");
const blogRoutes = require("./routes/blog");
const workRoutes = require('./routes/work')
const technologyRoutes = require('./routes/technology')
const React = require('react')


const mongoUri =
  "mongodb+srv://rodion:Radik1001@cluster0.aobsr.azure.mongodb.net/portfolio?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers:{/*
    pageLink: function(page){
      console.log(page);
        for (let i = 0; i < page; i++) {
          console.log('итерация');
         return `<a href="/blogPage?page=${i}">${i}</a`;
      }
    }
  */}
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");


//Делаю папку с картинками статической
app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));


//Роуты=============================== \/

app.use(routes);
app.use("/blog/",blogRoutes);
app.use("/work/",workRoutes);
app.use("/technology/",technologyRoutes)

//Роуты=============================== /\

async function start() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log("Server has been started on port: ", PORT);
    });
  } catch (e) {}
}

start();
