const express = require("express");
const {
  handleGetAllCustomers,
  handleGetCustomerById,
  handleUpdateCustomerById,
  handleDeleteCustomerById,
  handleCreateNewCustomer,
  register,
  login,
  refresh
} = require("../controllers/customer");

const router = express.Router();

router.route("/").get(handleGetAllCustomers).post(handleCreateNewCustomer);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/refresh").post(refresh);

router
  .route("/:id")
  .get(handleGetCustomerById)
  .patch(handleUpdateCustomerById)
  .delete(handleDeleteCustomerById);

module.exports = router;
