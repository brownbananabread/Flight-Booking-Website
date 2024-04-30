const flights = require('../models/Flight.json');
const allFlights = flights.list

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

function postBooking(req, res) {
    let flightId = req.body.flightId;
    let economySeats = req.body.economySeats;
    let businessSeats = req.body.businessSeats;
    let firstClassSeats = req.body.firstClassSeats;
    let name = req.body.name;
    let email = req.body.email;

    // post booking to db
    res.render('confirmation', {flightId, economySeats, businessSeats, firstClassSeats, name, email});
    // if error, res.status(500).send('Error')
}


module.exports = {getHomepage, getFlights, getFlight, makeBooking, postBooking}    