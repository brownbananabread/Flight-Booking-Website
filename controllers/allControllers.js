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
    let economySeatsQty = req.body.economySeats;
    let businessSeatsQty = req.body.businessSeats;
    let firstClassSeatsQty = req.body.firstClassSeats;
    let name = req.body.name;
    let email = req.body.email;

    let economySeats = generateRandomID(economySeatsQty).toString();
    let businessSeats = generateRandomID(businessSeatsQty).toString();
    let firstClassSeats = generateRandomID(firstClassSeatsQty).toString();

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

function getAdminpage(req, res) {
    res.render('admin')
}

async function postAdminpage(req, res) {
    try {
        const bookings = await Booking.find();
        res.render('dashboard', { bookings: bookings }); // Pass bookings as an object
    } catch (error) {
        // Handle any errors appropriately
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

function generateRandomID(quantity) {
    let ids = [];
    for (let i = 0; i < quantity; i++) {
        let randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        let randomNumber = Math.floor(Math.random() * 10);
        let id = randomLetter.toUpperCase() + randomNumber.toString();
        ids.push(id);
    }
    return ids.join(', '); // Joining all generated IDs into a single string
  }


module.exports = {getHomepage, getFlights, getFlight, makeBooking, postBooking, getAdminpage, postAdminpage}    