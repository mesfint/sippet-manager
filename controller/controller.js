import Snippet from "../model/snippet.js";
import axios from "axios";

export const allSnippets = async (req, res) => {
  Snippet.find((err, response) => {
    if (err) {
      console.log("error happen", err);
      res.render("show_message", {
        message: "No Snippet found",
        type: "error",
        snippets: [],
      });
    } else {
      res.render("index", {
        message: "Snippets retrieved",
        type: "success",
        snippets: response,
        snip: {
          title: "Try me",
          description: "Amazing",
          language: "JS",
        },
      });
    }
  });
  /* try {
    const response = await axios.get("http://localhost:5000/snippets");
    snippets = await response.data;
  } catch (error) {
    snippets = [];
  }
  res.render("index", {
    snippets: snippets,
    snippet: { title: "", description: "", language: "" },
  }); */
};
//find a sinppet
export const finOneSnippet = async (req, res) => {
  Snippet.find((err, response) => {
    if (err) {
      console.log("error happen", err);
      res.render("show_message", {
        message: "No Snippet found",
        type: "error",
        snippets: [],
      });
    } else {
      res.render("indexOne", {
        message: "Snippets retrieved",
        type: "success",
        snippets: response,
        snip: response.filter((s) => s.id == req.params.id)[0],
      });
    }
  });
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
        res.redirect("/index");
        // res.render("show_message", {
        //   message: "New snippet added",
        //   type: "success",
        //   snippet: response,
        // });
      }
    });
  }
}

//Get All snippet

export async function getAll(req, res) {
  try {
    const snipptes = await Snippet.find().sort({ createdAt: -1 });

    //res.render("AllSnippets", {});
    res.send(snipptes);
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

//update snippets
export const updateSnippets = (req, res) => {
  const snippets = req.body;
  if (!snippets.title || !snippets.description || !snippets.language) {
    res.render("show_message", {
      message: "Please fill all fields",
      type: "error",
    });
  } else {
    Snippet.findByIdAndUpdate(
      req.params.id,
      {
        title: snippets.title,
        description: snippets.description,
        language: snippets.language,
      },

      (err, response) => {
        if (err) {
          res.render("show_message", {
            message: "Snippet Updates Error",
            type: "error",
          });
        } else {
          res.render("show_message", {
            message: "Snippet Updated",
            type: "success",
            snippet: response,
          });
        }
      }
    );
  }
};

//
//delete  a snippet
export const deleteSnippet = (req, res) => {
  Snippet.findOneAndRemove(req.params.id, (err, response) => {
    if (err) {
      res.render("show_message", {
        message: "Snippet Deletion Error",
        type: "error",
      });
    } else {
      res.render("delete_message", {
        message: "Snippet Deleted",
        type: "success",
        snippet: response,
      });
    }
  });
};

//Get All snippet

/* export function getAll(req, res){

  Snippet.find((err, response) => {
    if(err){
         console.log('error happen', err)
         res.render('show_message', {
             message:'No Snippet found',
             type:'error',
             snippets:[]
         })
    }else{
         res.render('snippets', {
             message:"Snippets retrieved", 
             type: 'success',
             snippets:response, 
         })
    }
     
 }).sort({title : 1})
} */
