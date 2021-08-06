const router = require("express").Router();
const projects = require("./projects-model.js");
const { validateProjectjId,  validateProject} = require("../projects/projects-middleware")

router.get("/", (req, res, next) => {
    // returns array 
 projects.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error =>{
        res.status(501).json({ error, 
message: " request is not recognized"
        })
    });
});

router.get("/:id", validateProjectjId, (req, res, next) => {
projects.get(req.params.id)
res.json(req.project);
  
});

//validateProject

router.post("/",  validateProject, (req, res, next) => {
    projects.insert(req.body)
    .then(vaild => {
      res.status(200).json(vaild)
    })
    .catch(next)

});

router.put("/:id",validateProjectjId, validateProject,  (req, res, next) => {
     projects.update(req.params.id, req.body)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(next);
});

router.delete("/:id",  (req, res, next) => {
 projects.remove(req.params.id)
    .then((project) => {
      if (project) {
        res .status(200).json({ message: ` ${req.params.id}  deleted` });
      } else {
        res.status(404).json(" no project has been found");
      }
    })
    .catch(next);
});

router.get("/:id/actions", (req, res, next) => {
 projects.getProjectActions(req.params.id)
    .then((project) => {
      if (!project) {
        res
          .status(404)
          .json({
            message: `No actions belong to the project with the id of ${req.params.id}`,
          });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(next);
});



module.exports = router;
