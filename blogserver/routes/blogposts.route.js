'use strict';

var express  = require("express"),
    router   = express.Router(),
    Blogpost = require("../models/blogpost.model.js");

//INDEX - retourne tous les posts    
router.get("/", function(req,res){
    //obtenir tous les posts depuis la db
    Blogpost.find({}, function(err, allBlogpost){
        if(err){
            console.log(err);
        }else{
            res.send(allBlogpost);
            //res.send("récupérer tous les posts de blogs !");
        }
    })
});

//CREATE - ajouter un nouveau post
router.post("/",function(req,res){

    console.log("post");
    
    //récupération des informations dans le corps de la requête
    let author = req.body.author;
    let title = req.body.title;
    let category = req.body.category;
    let body = req.body.body;

    let newBlogpost = {
        author:author,
        title:title,
        category:category,
        body:body
    };

    //Créer un post et le placer dans la base de donnée
    Blogpost.create(newBlogpost, function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.send("post added !");
        }
    });

});

//SHOW - montrer le détail d'un poste
router.get("/:id", function(req,res){
    //trouver le poste avec l'id donné
    //res.send(req.params.id);
    /*Blogpost.findById(req.params.id, function(err, blogpost){
        if(err){
            console.log(err);
            res.send("voilà le poste " + blogpost + " " + req.params.id);
        }
    });*/
    Blogpost.findById(req.params.id).exec(function(err, foundblogPost){
        if(err){
            console.log(err);
        } else {
            console.log(foundblogPost);
            //render the show template
            res.send(foundblogPost);        
        }
    });
});


//DELETE - effacer un post
router.delete("/:id", function(req,res){
    Blogpost.findByIdAndRemove(req.params.id, function(err, deletedPost) {  
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Todo successfully deleted",
            id: deletedPost._id
        };
        return res.status(200).send(response);
    });
});


module.exports = router;