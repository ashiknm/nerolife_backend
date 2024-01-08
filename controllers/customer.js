// write a controller function to get all the Customers from the database.
// for this first import the Customer class from the models file Customer.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Customer = require("../models/customer");

const secretKey = '6gh8fhs8ij1d'; // Replace with a secure secret key in a production environment


// Function to generate access token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '15m' });
};


// function to get all the Customers.
async function handleGetAllCustomers(req, res) {
  const allDbCustomers = await Customer.find({});
  return res.json(allDbCustomers);
}

// function to get the Customer by id.
async function handleGetCustomerById(req, res) {
  // first get the id enterd by the Customer.
  const fetched_Customer = await Customer.findById(req.params.id);
  // if the Customer if not found by the id.
  if (!fetched_Customer) {
    return res.status(400).json({ error: "Customer not found." });
  }
  // return the fetch Customer from the database.
  return res.json(fetched_Customer);
}

async function handleUpdateCustomerById(req, res) {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body, // Use req.body to get the updated values from Postman or frontend
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found." });
    }

    return res.json({ status: "Customer updated successfully.", updatedCustomer });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function handleDeleteCustomerById(req, res) {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found." });
    }

    const deletionTime = new Date();
    // You can perform additional operations or logging related to the deletion here.
    console.log(deletionTime);

    return res.json({
      status: "Customer deleted successfully.",
      deletedCustomer,
      deletionTime,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function handleCreateNewCustomer(req, res) {
  try {
    const body = req.body;
    console.log("body", body)
    if (
      !body.customer_first_name ||
      !body.customer_last_name ||
      !body.password ||
      !body.email ||
      !body.phone ||
      !body.dob ||
      !body.gender
    ) {
      // we will set the reponse code to 400
      return res.status(400).json({ Warning: "All fields are required. " });
    }

    const existingUser = await Customer.findOne({ email: body.email  });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);



    // now we will push the code into the mongodb database into the Customers collection.
    const result = await Customer.create({
        customer_first_name: body.customer_first_name,
        customer_last_name: body.customer_last_name,
        customer_id : body.customer_id,
        gender: body.gender, // dropdown
        dob: body.dob,
        phone: body.phone,
        email: body.email,
        password: hashedPassword,
        age_group : body.age_group,  // drop down auto generation
        music_preference : body.music_preference,  // dropdown
        event_preference : body.event_preference,  // dropdown
        music_platform : body.music_platform, // dropdown
        outing_frequency : body.outing_frequency, // dropdown
        communication_preference : body.communication_preference, // dropdown 
        social_handles : body.social_handles,
        authentication_status : body.authentication_status,
        customers_feedback : body.customers_feedback,
        request_help : body.request_help,
        invite_link : body.invite_link,
        customer_disclaimer :body.customer_disclaimer,
        customer_license_acceptance : body.customer_license_acceptance,
        attended_events : body.attended_events,
        reserved_events  :body.reserved_events,
    });
    //  we will consolel the result as well .
    console.log("Result is ", result);
    // so return the status code as 201 , so as to indicate Customer has been created.
    return res
      .status(201)
      .json({ Message: "Registration Successfull.", id: result._id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function register(req, res) {
  try {
    const body = req.body;
    console.log("body", body)
    if (
      !body.customer_first_name ||
      !body.customer_last_name ||
      !body.password ||
      !body.email ||
      !body.phone ||
      !body.dob ||
      !body.gender 
      
    ) {
      // we will set the reponse code to 400
      return res.status(400).json({ Warning: "All fields are required. " });
    }

    const existingUser = await Customer.findOne({ email: body.email  });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);



    // now we will push the code into the mongodb database into the Customers collection.
    const result = await Customer.create({
        customer_first_name: body.customer_first_name,
        customer_last_name: body.customer_last_name,
        customer_id : body.customer_id,
        phone: body.phone,
        email: body.email,
        password: hashedPassword,
        dob:body.dob,
        gender:body.gender
       
    });
    //  we will consolel the result as well .
    console.log("Result is ", result);
    // so return the status code as 201 , so as to indicate Customer has been created.
    return res
      .status(201)
      .json({ Message: "Registration Successfull.", id: result._id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

function refresh(req, res){
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not provided' });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Create and send a new access token
    const accessToken = jwt.sign({ userId: decoded.userId }, secretKey, { expiresIn: '15m' });
    res.json({ accessToken });
  });
}



async function login(req, res) {
  try {
    const body = req.body;
    if (
      !body.email ||
      !body.password
    ) {
      // we will set the reponse code to 400
      return res.status(400).json({ Warning: "All fields are required. " });
    }

    const user = await Customer.findOne({ email: body.email  });

    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user._id);

    // Generate refresh token (store this in a database for better security)
    const refreshToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });

     // Set refresh token in an HTTP-only cookie
     res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });




    // so return the status code as 201 , so as to indicate Customer has been created.
    return res
      .status(201)
      .json({ Message: "Login Success.", access_token:accessToken, refreshtoken:  refreshToken, customer_id: user.customer_id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

module.exports = {
  handleGetAllCustomers,
  handleGetCustomerById,
  handleUpdateCustomerById,
  handleDeleteCustomerById,
  handleCreateNewCustomer,
  register,
  login,
  refresh
};
