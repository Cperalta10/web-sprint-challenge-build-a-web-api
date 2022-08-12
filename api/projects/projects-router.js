// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const { validateId, validateProjectsBody } = require("./projects-middleware");

const router = express.Router();

// [GET] /api/projects
// Returns an array of projects as the body of the response.
// If there are no projects it responds with an empty array.
router.get("/", (req, res) => {
  Projects.get().then((projects) => {
    res.json(projects);
  });
});

//  [GET] /api/projects/:id
// Returns a project with the given id as the body of the response.
// If there is no project with the given id it responds with a status code 404.
router.get("/:id", validateId, (req, res) => {
  res.json(req.projectsId);
});

//  [POST] /api/projects
// Returns the newly created project as the body of the response.
// If the request body is missing any of the required fields it responds with a status code 400.
router.post("/", validateProjectsBody, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem finding project" });
    });
});

//  [PUT] /api/projects/:id
// Returns the updated project as the body of the response.
// If there is no project with the given id it responds with a status code 404.
// If the request body is missing any of the required fields it responds with a status code 400.
router.put("/:id", validateId, validateProjectsBody, (req, res) => {
  if (req.body.completed == null) {
    res
      .status(400)
      .json({ message: "please provide name, description, and completed" });
  } else {
    console.log(req.body.completed);
    Projects.update(req.params.id, req.body).then((project) => {
      res.json(project);
    });
  }
});

//  [DELETE] /api/projects/:id
// Returns no response body.
// If there is no project with the given id it responds with a status code 404.
router.delete("/:id", validateId, (req, res) => {
  Projects.remove(req.params.id).then((result) => {
    res.json(result);
  });
});

//  [GET] /api/projects/:id/actions
// Returns an array of actions (could be empty) belonging to a project with the given id.
// If there is no project with the given id it responds with a status code 404.
router.get("/:id/actions", validateId, (req, res) => {
  Projects.getProjectActions(req.params.id).then((result) => {
    res.json(result);
  });
});

module.exports = router;
