const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');

router.get('/trips', ctrlTrips.tripsList);
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);
router.post('/trips', ctrlTrips.tripsAddTrip);
router.put('/trips/:tripCode', ctrlTrips.tripsUpdateTrip);

module.exports = router;
