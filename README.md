#News from NPR

## Assignment

In this assignment, you'll create a web app that lets users view and leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your Mongoose and Cheerio muscles to scrape news from another site. 

App Link:  https://news-from-npr.herokuapp.com/api/search#!


### Technologies/Dependencies:

* Javascript (jQuery)
* express-handlebars (3.0.0)
* Node.js
* body-parser (1.18.3)
* promise (8.0.2)
* cherrio (1.0.0.-rc.2)
* request (2.88.0)
* express (4.16.4)
* mongoose (5.4.1)
* MongoDB (shell version 4.0.4)

## News from NPR:  Screenshots

Splash page before scraping:

<img width="1439" alt="ss01_splashpage" src="https://user-images.githubusercontent.com/38221513/50737417-0437a400-1197-11e9-9493-761ee8c28ad6.png">


After clicking the "Let's Scrape" button on the right side of navigation bar at the top, the screen delivers the results in the form of cards:

<img width="1439" alt="ss02_scraperesults" src="https://user-images.githubusercontent.com/38221513/50737443-452fb880-1197-11e9-9752-36bd1f6f089a.png">


Users can click on the article category found just under the image to view a sliding card that contaings the date and an excerpt from that article:

<img width="1439" alt="ss02_scraperesults" src="https://user-images.githubusercontent.com/38221513/50737443-452fb880-1197-11e9-9752-36bd1f6f089a.png">


After closing the slide card show above, the user can then click "Link to the article" to access the entire artice from the NPR website:

<img width="1439" alt="ss02 2_articlelink" src="https://user-images.githubusercontent.com/38221513/50737605-7c06ce00-1199-11e9-8b89-f4980ebd0d36.png">


For all articles that the user wishes to save, the red button on the face of the article card be clicked and the following message will appear:

<img width="1439" alt="ss03_articlesaved" src="https://user-images.githubusercontent.com/38221513/50737619-b53f3e00-1199-11e9-8f61-d7c84cae72b6.png">


To view all saved articles, the user will click "Saved Articles" found on the left side of the top navigation bar to pull up a sliding modal:

<img width="1439" alt="ss04_savedarticlesmodal" src="https://user-images.githubusercontent.com/38221513/50737664-0cdda980-119a-11e9-80dc-35dbe9470e72.png">


Users wishing to make a note on an article can click on a saved article from the modal above and will see this input modal:

<img width="1439" alt="ss05_articlenotemodal" src="https://user-images.githubusercontent.com/38221513/50737684-3ac2ee00-119a-11e9-8ee1-333294164ed2.png">


The user will type in the "text area" portion of the note and then click the blue "Add" button found in the bottom right corner of the modal:

<img width="1439" alt="ss06_addingnote" src="https://user-images.githubusercontent.com/38221513/50737722-7c539900-119a-11e9-9478-9ad3b4870988.png">


Users can also access note(s) for each article by re-visiting the saved article and clicking on it:

<img width="1439" alt="ss08_multiplenotessaved" src="https://user-images.githubusercontent.com/38221513/50737755-c9376f80-119a-11e9-8a06-0d0961870888.png">



## Thank You

Many thanks to the fellow aspiring developers that assisted with this assigment!