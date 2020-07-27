const express = require('express');
const { query } = require('express');
const app = express();
const port = 3000;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({user: []})
  .write();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.render("index",{name: "aaa"}));
app.get('/user', function(req, res){
    res.render('users/index',{
        users: db.get("user").value()
    })
});

app.get("/users/search",function(req,res){
    var q = req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("users/index",{users :matchedUsers});
});

app.post("/users/create",function(req,res){
    db.get("user").push(req.body).write();
    res.redirect("/user");
});

app.get("/users/create",function(req,res){
    res.render("users/create");
})

app.listen(port, () => 
console.log(`Example app listening at http://localhost:${port}`));