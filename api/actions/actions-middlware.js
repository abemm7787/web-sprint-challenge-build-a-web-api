const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

async function vaildateActionId(req, res, next) {
  try {
    const { id } = req.params;
    const actions = await Actions.get(id);
    if (!actions) {
      res.status(404).json({ message: "requested page not found" });
    } else {
      req.action = actions;
      next();
    }
  } catch {
    next();
  }
}

async function validateActions(req, res, next) {
  const { project_id, notes, description } = req.body;

  const database = await Projects.get(project_id);
  if (!project_id || !description || !notes) {
    res.status(400).json({ message: "need to add  credentials " });
  } else if (!database) {
    res.status(400).json({ message: "not found" });
  } else {
    req.action = database
    next();
  }
}

module.exports = {
  vaildateActionId,
  validateActions,
};
