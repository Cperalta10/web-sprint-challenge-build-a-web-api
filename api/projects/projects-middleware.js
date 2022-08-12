const Projects = require("./projects-model");

// add middleware here related to projects

async function validateId(req, res, next) {
  try {
    const projectsId = await Projects.get(req.params.id);
    if (!projectsId) {
      res.status(404).json({ message: "does not exist" });
    } else {
      req.projectsId = projectsId;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "problem finding project" });
  }
}

function validateProjectsBody(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "please provide name and description" });
  } else {
    next();
  }
}

module.exports = {
  validateId,
  validateProjectsBody,
};
