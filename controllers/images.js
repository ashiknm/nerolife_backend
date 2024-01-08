const express=require('express');
const router = express.Router();
path = require('path'),
cors = require('cors'),
multer = require('multer')
const ObjectId=require('mongoose').Types.ObjectId;

const DIR = './uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

const Images = require("../models/images");

router.get('/',async (req,res)=>{
  const allDbOutlets = await Images.find({});
  return res.json(allDbOutlets);
});

router.get('/:id',async (req,res)=>{
  try {
    // First get the event by the event_id entered by the user.
    const fetchedEvent = await Images.find({ id: req.params.id });

    // If the event is not found by the event_id.
    if (!fetchedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Return the fetched event from the database.
    return res.json(fetchedEvent);
  } catch (error) {
    // Handle any unexpected errors.
    console.error("Error fetching event:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// outlet ambience
router.get('/ambience/:id', async (req, res) => {
  try {
    // First get the event by the event_id entered by the user and image_type.
    const fetchedEvent = await Images.find({ id: req.params.id, image_type: 'outlet_ambience_image' });

    // If the event is not found by the event_id.
    if (!fetchedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Return the fetched event from the database.
    return res.json(fetchedEvent);
  } catch (error) {
    // Handle any unexpected errors.
    console.error("Error fetching event:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// outlet experience
router.get('/experience/:id', async (req, res) => {
  try {
    // First get the event by the event_id entered by the user and image_type.
    const fetchedEvent = await Images.find({ id: req.params.id, image_type: 'outlet_experience_image' });

    // If the event is not found by the event_id.
    if (!fetchedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Return the fetched event from the database.
    return res.json(fetchedEvent);
  } catch (error) {
    // Handle any unexpected errors.
    console.error("Error fetching event:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



// artist potraits
router.get('/potrait/:id', async (req, res) => {
  try {
    // First get the event by the event_id entered by the user and image_type.
    const fetchedEvent = await Images.find({ id: req.params.id, image_type: 'artist_potrait_image' });

    // If the event is not found by the event_id.
    if (!fetchedEvent) {
      return res.status(404).json({ error: "potrait not found." });
    }

    // Return the fetched event from the database.
    return res.json(fetchedEvent);
  } catch (error) {
    // Handle any unexpected errors.
    console.error("Error fetching event:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// artist potraits
router.get('/potrait/:id', async (req, res) => {
  try {
    // First get the event by the event_id entered by the user and image_type.
    const fetchedEvent = await Images.find({ id: req.params.id, image_type: 'artist_potrait_image' });

    // If the event is not found by the event_id.
    if (!fetchedEvent) {
      return res.status(404).json({ error: "potrait not found." });
    }

    // Return the fetched event from the database.
    return res.json(fetchedEvent);
  } catch (error) {
    // Handle any unexpected errors.
    console.error("Error fetching event:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;

    // Validate image type
    const validImageTypes = ['outlet_ambience_image', 'outlet_experience_image', 'event_image', 'artist_potrait_image', 'artist_experience_image'];
    if (!validImageTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid image type." });
    }

    // Get the event by the event_id entered by the user and image_type.
    const fetchedImages = await Images.find({ id, image_type: type });

    // If the event is not found by the event_id.
    if (!fetchedImages) {
      return res.status(404).json({ error: "Images not found." });
    }

    // Return the fetched event from the database.
    return res.json(fetchedImages);
  } catch (error) {
    // Handle any unexpected errors.
    console.error("Error fetching images:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});









router.post('/',upload.single('icon'),async (req,res,next)=>{
    try {
      const url = req.protocol + '://' + req.get('host');
      console.log(req.body.id);

      const uploads = new Images({
          id: req.body.id,
          icon: url + '/uploads/' + req.file.filename,
          image_type: req.body.image_type
      });

      const savedUpload = await uploads.save();
      res.send(savedUpload);
  } catch (err) {
      console.error('Error in user save:', err);
      res.status(500).send('Internal Server Error');
  }
});

module.exports=router;