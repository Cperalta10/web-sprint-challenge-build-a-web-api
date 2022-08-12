const Actions = require("./actions-model");
// add middlewares here related to actions
async function validateActionId(req, res, next) {
  try {
    const actionId = await Actions.get(req.params.id);
    if (!actionId) {
      res.status(404).json({ message: "does not exist" });
    } else {
      req.actionId = actionId;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "problem finding action" });
  }
}

function validateActionsBody(req, res, next) {
  if (!req.body.description || !req.body.project_id || !req.body.notes) {
    res
      .status(400)
      .json({ message: "please provide project ID, notes, and description" });
  } else {
    next();
  }
}

module.exports = { validateActionId, validateActionsBody };
