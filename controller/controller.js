import Snippet from "../model/snippet.js";

export const time = (req, res, next) => {
  console.log("New request is at", Date.now());
  next();
};

//create snippet

export function create(req, res) {
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

export async function getAll(req, res) {
  try {
    const snipptes = await Snippet.find();

    //res.render("AllSnippets", {});
    res.send(snipptes);

    //res.json( await );
  } catch (error) {
    console.log(error);
  }
}

//Get Snippet by Id
export async function getSnippetsById(req, res) {
  try {
    const snippet = await Snippet.findById(req.params.id);

    res.send(snippet);
  } catch (error) {
    console.log(error);
  }
}
