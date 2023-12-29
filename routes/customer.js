const express = require("express");
const {
  handleGetAllCustomers,
  handleGetCustomerById,
  handleUpdateCustomerById,
  handleDeleteCustomerById,
  handleCreateNewCustomer,
} = require("../controllers/customer");

const router = express.Router();

router.route("/").get(handleGetAllCustomers).post(handleCreateNewCustomer);

router
  .route("/:id")
  .get(handleGetCustomerById)
  .patch(handleUpdateCustomerById)
  .delete(handleDeleteCustomerById);

module.exports = router;
