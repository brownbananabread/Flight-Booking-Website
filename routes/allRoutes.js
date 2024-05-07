const {Router} = require('express');
const {getHomepage, getFlights, getFlight, makeBooking, postBooking, getAdminpage, postAdminpage} = require('../controllers/allControllers');
const router = Router();

router.get('/', getHomepage)
router.get('/admin', getAdminpage)
router.post('/admin', postAdminpage)
router.get('/flights', getFlights)
router.get('/flight/:id', getFlight)
router.get('/booking/:id', makeBooking)
router.post('/booking', postBooking)

module.exports = router; 