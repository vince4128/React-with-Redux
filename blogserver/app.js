"use strict";

//import
const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      methodOverride = require("method-override");

mongoose.Promise = global.Promise;

//connexion à la DB
const promiseConnection = mongoose.connect("mongodb://127.0.0.1/blogreact");

promiseConnection.then(function(){
    if(err){
        console.log('erreur de connexion !');        
    }else{
        console.log('connecté à la base de donnée !');
    }
})

//  retour de la promesse de connection
/*promiseConnection.then(function(){
    console.log('connecté à la base de données !');
});*/

//  écouteur d'erreur sur la connection
/*promiseConnection.on('error', function(error){
    console.log('erreur de connection à la base de donnée ! ' + error);
});*/

//port
const PORT = 3000;

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3003');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();

});

//import routes
const blogPostRoutes = require("./routes/blogposts.route"),
      indexRoutes    = require("./routes/index");


app.use(bodyParser.urlencoded({extended:true}));
app.use("/", indexRoutes)
app.use("/blogpost", blogPostRoutes);

//app
app.listen(PORT,function(){
    console.log("server started !");
});

//test
const Blogpost = require("./models/blogpost.model.js");

for(let i = 0; i<4; i++){

    const testBlogpost = {
        id: i,
        author:"testAuthor" + i,
        title:"testTitle" + i,
        category:"testCategory" + i,
        body:"testBody" + i
    };
    
    Blogpost.create(testBlogpost, function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log("post added !");
        }
    });

}

