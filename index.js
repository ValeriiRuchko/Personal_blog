const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const lorashLowerCasePackage = require('lodash/lowerCase');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
//tell node that our static files (styles and so on) are inside folder with name "public"
app.use(express.static("public"));
//starting content for page
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//array that contains all of our blog-posts

const posts = [];

app.get("/", (req, res) => {
    res.render("home", {homeStartingContent: homeStartingContent, postsContent: posts});
})

app.get("/about", (req, res) => {
    res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", (req, res) => {
    res.render("contact", {contactContent: contactContent});
})

app.get("/compose", (req, res) => {
    res.render("compose");
})

app.get('/posts/:postName', (req, res) => {
    //declaring our route parametr
    let parametr = lorashLowerCasePackage(req.params.postName);
    //using library Lorash make string to lowerCase and exclude all hymens(-) && underscores(_)
    posts.forEach(element => {
        //get property 'title' of object 'post' from array 'posts'
        let postTitle = lorashLowerCasePackage(element.typedTitle);
        //using library Lorash make string to lowerCase and exclude all hymens(-) && underscores(_)
        if(parametr === postTitle) {
            res.render("post", {postTitle: element.typedTitle, postText: element.typedPost});
        }
        else {
            console.log("No match found");
        }
    });
})

app.post("/compose", (req,res) => {
    // object which saves our submit information (title of the blog-post; text of the blog-post)
    const post = {
        typedTitle: req.body.title_text,
        typedPost: req.body.post_text
    }
    posts.push(post);
    res.redirect('/');
})

app.listen(port, () => {
    console.log("App is listening on port 3000");
})

