const flights = require('../models/Flight.json');
const allFlights = flights.list
const Booking = require('../models/Booking')

function getHomepage(req, res) {
    res.render('home')
}

function getFlights(req, res) {
    res.render('flights', { flights: allFlights });
}

function getFlight(req, res) {
    let flightId = req.params.id;
    let flight = allFlights.find(allFlights => allFlights.flightId === flightId);
    if (!flight || flight === undefined) {
        return res.status(404).send('Flight not found')}
    res.render('flight', { flight });
}

function makeBooking(req, res) {
    const economyPrice = 100;
    const businessPrice = 200;
    const firstClassPrice = 300;
    let economySeats = req.query.economySeats;
    let businessSeats = req.query.businessSeats;
    let firstClassSeats = req.query.firstClassSeats;
    let flightId = req.params.id;

    let totalPrice = (economySeats * economyPrice) + (businessSeats * businessPrice) + (firstClassSeats * firstClassPrice);

    res.render('booking', { economySeats, businessSeats, firstClassSeats, flightId, totalPrice});
}

async function postBooking(req, res) {
    let flightId = req.body.flightId;
    let economySeats = req.body.economySeats;
    let businessSeats = req.body.businessSeats;
    let firstClassSeats = req.body.firstClassSeats;
    let name = req.body.name;
    let email = req.body.email;

    var bookingInformation = {name,email,flightId,economySeats,businessSeats,firstClassSeats}

    try {
        const newBooking = await Booking.create(bookingInformation)
        if (newBooking) {
            console.log("User Created", newBooking)
        } else {
            console.log("Not Created")
        }
        res.render('confirmation', bookingInformation);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {getHomepage, getFlights, getFlight, makeBooking, postBooking}    