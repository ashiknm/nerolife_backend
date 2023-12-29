const express = require("express");
const {
  handleGetAllEvents,
  handleGetEventById,
  handleUpdateEventById,
  handleDeleteEventById,
  handleCreateNewEvent,
} = require("../controllers/events");

const router = express.Router();

router.route("/").get(handleGetAllEvents).post(handleCreateNewEvent);

router
  .route("/:id")
  .get(handleGetEventById)
  .patch(handleUpdateEventById)
  .delete(handleDeleteEventById);

module.exports = router;
