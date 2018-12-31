let axios = require('axios'); 
let cheerio = require('cheerio'); 
let mongoose = require('mongoose'); 
let db = require("../models"); 

mongoose.Promise = Promise; 
mongoose.connect("mongodb://localhost/mongoHeadlines", { 
  useNewUrlParser: true
});


let mongooseConnection = mongoose.connection;

mongooseConnection.on('error', console.error.bind(console, 'connection error:'));
mongooseConnection.once('open', function() {
  console.log(`Sucessfully Connected to Mongo DB !`); 
});

// Export routes called from server.js
module.exports = (app) => { 

  // Default Route
  app.get("/", (req, res) => res.render("index"));

  // Scrape Articles Route
  app.get("/api/search", (req, res) => {

    axios.get("https://www.npr.org/sections/news/").then(response => {
      
      let $ = cheerio.load(response.data);
      
      // Initialize Object to Store Cheerio Objects
      let handlebarsObject = {
        data: []
      }; 

      $("article").each((i, element) => { 

        let lowResImageLink = $(element).children('.item-image').children('.imagewrap').children('a').children('img').attr('src');
        
        //NPR only returns low resolution images with scrapper, so convert to high resolution images
        if (lowResImageLink) {

          let imageLength = lowResImageLink.length;
          let highResImage = lowResImageLink.substr(0, imageLength - 11) + "800-c100.jpg";
          
          // Store scrapped data into the "handlebarsObject"
          handlebarsObject.data.push({ 
            headline: $(element).children('.item-info').children('.title').children('a').text(),
            summary: $(element).children('.item-info').children('.teaser').children('a').text(),
            url: $(element).children('.item-info').children('.title').children('a').attr('href'),
            imageURL: highResImage,
            slug: $(element).children('.item-info').children('.slug-wrap').children('.slug').children('a').text(),
            comments: null
          }); 
        } 
      }); 

      // Render with handlebars
      res.render("index", handlebarsObject);
    });
  });

  // Saved Article Route
  app.get("/api/savedArticles", (req, res) => {
    // Grab every document in the Articles collection
    db.Articles.find({}).
    then(function(dbArticle) {
      res.json(dbArticle);

    }).catch(function(err) {
      res.json(err);
    });
  }); 

  // Post requests
  app.post("/api/add", (req, res) => { 

    let articleObject = req.body;

    // Save the Article to the Database
    db.Articles. 
    findOne({url: articleObject.url}). 
    then(function(response) {

      if (response === null) { 
        db.Articles.create(articleObject).then((response) => console.log(" ")).catch(err => res.json(err));
      } 
      // If able to save an Article, send a message to the client
      res.send("Article Saved");

    }).catch(function(err) {
      res.json(err);
    });

  }); 

  // Delete Article
  app.post("/api/deleteArticle", (req, res) => {
    // console.log(req.body)
    sessionArticle = req.body;

    // Look for the article and remove from the DB
    db.Articles.findByIdAndRemove(sessionArticle["_id"]). 
    then(response => {
      if (response) {
        res.send("Sucessfully Deleted");
      }
    });
  }); 

  // Delete Comment 
  app.post("/api/deleteComment", (req, res) => {
    
    let comment = req.body;

    // Look for the comment and remove from the DB
    db.Notes.findByIdAndRemove(comment["_id"]). 
    then(response => {
      if (response) {
        res.send("Sucessfully Deleted");
      }
    });
  }); 

  // Create Notes
  app.post("/api/createNotes", (req, res) => {

    sessionArticle = req.body;

    db.Notes.create(sessionArticle.body).then(function(dbNote) {
   
      return db.Articles.findOneAndUpdate({
        _id: sessionArticle.articleID.articleID
      }, {
        $push: {
          note: dbNote._id
        }
      });
    }).then(function(dbArticle) {
      // If able to update an Article, send it back to the client
      res.json(dbArticle);

    }).catch(function(err) {
      res.json(err);
    });
  }); 

  // Route for grabbing a specific Article by id and populate with its note
  app.post("/api/populateNote", function(req, res) {
    
    db.Articles.findOne({_id: req.body.articleID}).populate("Note"). // Associate Notes with the Article ID
    then((response) => {
      
      // Note Has 1 Comment
      if (response.note.length == 1) { 

        db.Notes.findOne({'_id': response.note}).then((comment) => {
          comment = [comment];
          console.log("Sending Back One Comment");
          res.json(comment); 
        });

        // Note Has 0 comments or more than 1 comment
      } else { 

        console.log("2")
        db.Notes.find({
          '_id': {
            "$in": response.note
          }
        }).then((comments) => {
          res.json(comments); 
        });
      }
      // If able to find an Article with the given id, send it back to the client
    }).catch(function(err) {
      res.json(err);
    });
  });
}