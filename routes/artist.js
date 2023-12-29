const express = require("express");
const {
  handleGetAllArtists,
  handleGetArtistById,
  handleUpdateArtistById,
  handleDeleteArtistById,
  handleCreateNewArtist,
} = require("../controllers/artist");

const router = express.Router();

router.route("/").get(handleGetAllArtists).post(handleCreateNewArtist);

router
  .route("/:id")
  .get(handleGetArtistById)
  .patch(handleUpdateArtistById)
  .delete(handleDeleteArtistById);

module.exports = router;
