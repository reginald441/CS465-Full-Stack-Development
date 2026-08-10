const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');
const { authenticateJWT } = require('../middleware/authentication');

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/trips', ctrlTrips.tripsList);
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);
router.post('/trips', authenticateJWT, ctrlTrips.tripsAddTrip);
router.put('/trips/:tripCode', authenticateJWT, ctrlTrips.tripsUpdateTrip);

module.exports = router;
