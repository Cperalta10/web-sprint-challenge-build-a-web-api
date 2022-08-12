// Write your "actions" router here!
const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");
const {
  validateActionId,
  validateActionsBody,
} = require("./actions-middlware");

// [GET] /api/actions
// Returns an array of actions (or an empty array) as the body of the response.
router.get("/", (req, res) => {
  Actions.get().then((result) => {
    res.json(result);
  });
});

//  [GET] /api/actions/:id
// Returns an action with the given id as the body of the response.
// If there is no action with the given id it responds with a status code 404.
router.get("/:id", validateActionId, (req, res) => {
  res.json(req.actionId);
});

//  [POST] /api/actions
// Returns the newly created action as the body of the response.
// If the request body is missing any of the required fields it responds with a status code 400.
// When adding an action make sure the project_id provided belongs to an existing project.
router.post("/", validateActionsBody, (req, res) => {
  Actions.insert(req.body).then((result) => {
    res.status(201).json(result);
  });
});

//  [PUT] /api/actions/:id
// Returns the updated action as the body of the response.
// If there is no action with the given id it responds with a status code 404.
// If the request body is missing any of the required fields it responds with a status code 400.
router.put("/:id", validateActionId, validateActionsBody, (req, res) => {
  Actions.update(req.params.id, req.body).then((result) => {
    res.json(result);
  });
});

//  [DELETE] /api/actions/:id
// Returns no response body.
// If there is no action with the given id it responds with a status code 404.
router.delete("/:id", validateActionId, (req, res) => {
  Actions.remove(req.params.id).then((result) => {
    res.json(result);
  });
});

module.exports = router;
