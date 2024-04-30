const {Router} = require('express');
const {getHomepage, getFlights, getFlight, makeBooking, postBooking} = require('../controllers/allControllers');
const router = Router();

router.get('/', getHomepage)
router.get('/flights', getFlights)
router.get('/flight/:id', getFlight)
router.get('/booking/:id', makeBooking)
router.post('/booking', postBooking)

module.exports = router; 