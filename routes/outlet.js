const express = require("express");
const {
  handleGetAllOutlets,
  handleGetOutletById,
  handleUpdateOutletById,
  handleDeleteOutletById,
  handleCreateNewOutlet,
} = require("../controllers/outlet");

const router = express.Router();

router.route("/").get(handleGetAllOutlets).post(handleCreateNewOutlet);

router
  .route("/:id")
  .get(handleGetOutletById)
  .patch(handleUpdateOutletById)
  .delete(handleDeleteOutletById);

module.exports = router;
