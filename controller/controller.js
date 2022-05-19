import Snippet from "../model/snippet.js";

export const time = (req, res, next) => {
  console.log("New request is at", Date.now());
  next();
};


//create snippet

export function create(req, res){
    const snippetInfo = req.body; //get the parsed information
  
    if (!snippetInfo.title || !snippetInfo.description || !snippetInfo.language) {
      res.render("show_message", {
        message: "Please fill in all fields",
        type: "error",
      });
    } else {
      const newSnippet = new Snippet({
        title: snippetInfo.title,
        description: snippetInfo.description,
        language: snippetInfo.language,
      });
      newSnippet.save((err, response) => {
        if (err) {
          res.render("show_message", {
            message: "Error saving snippet to db",
            type: "error",
          });
        } else {
          //res.redirect("/snippet");
          res.render("show_message", {
            message: "New snippet added",
            type: "success",
            snippet: response,
          });
        }
      });
    }
}

//Get All snippet 

export function getAll(req, res){
  const snipptes = Snippet.find({})
  console.log(snipptes)
}