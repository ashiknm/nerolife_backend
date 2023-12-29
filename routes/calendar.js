const express = require("express");
const {
  handleGetAllCalendars,
  handleGetCalendarById,
  handleUpdateCalendarById,
  handleDeleteCalendarById,
  handleCreateNewCalendar,
} = require("../controllers/calendar");

const router = express.Router();

router.route("/").get(handleGetAllCalendars).post(handleCreateNewCalendar);

router
  .route("/:id")
  .get(handleGetCalendarById)
  .patch(handleUpdateCalendarById)
  .delete(handleDeleteCalendarById);

module.exports = router;
