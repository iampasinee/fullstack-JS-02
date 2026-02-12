
const express = require('express');
const axios = require('axios');
var bodyParser = require('body-parser');
const path = require('path')
const app = express();

const base_url = "http://localhost:3000";
//const base_url = "https://.ruk-com.cloud";

app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books');
        res.render("books", { books: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/book/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("book", { book: response.data });
    }catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author};
        await axios.post(base_url + '/books', data);
        res.redirect("/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/update/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("update", { book: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error1');
    }
});

app.post("/update/:id", async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author};
        await axios.put(base_url + '/books/' + req.params.id, data);
        res.redirect("/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error2');
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + '/books/' + req.params.id);
        res.redirect("/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error_delete');
    }
});

const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`app listening at http://localhost:${port}`)) 


