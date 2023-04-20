// Import the necessary modules
const express = require('express');
const api = require('./api'); // assuming that api.js exports the `getVideoQuality()` function

// Create a new router instance
const router = express.Router();

// Define the `/api/getVideoQuality` endpoint
router.get('/', (req, res) => {
  api.getVideoQuality().then((videoQuality) => {
    res.send(videoQuality);
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Internal server error');
  });
});

// Export the router instance
module.exports = router;
