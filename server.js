// Import required modules
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an instance of the express application
const app = express()

// Import configuration files
const serverConfig = require('./configs/server.config')
const dbConfig = require('./configs/db.config') 

// Import models and routes
const Movie = require('./models/movie.models')
require('./routes/movie.routes')(app);



// Middleware to parse JSON bodies
app.use(bodyParser.json({}));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true })); 


// Connect to the database
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on('error', () => {
    console.log('error while connecting to db');
});
db.once('open', () => {
    console.log('connected to db');
});

/**
 * This function will initialize the initial state of the movie booking application
 */
async function init() {

    // Creating few initial set of movies
    await Movie.collection.drop();
    try {
        movie1 = await Movie.create({
            name: "Bachhan Pandey",
            description: "Comedy Masala Movie",
            casts: ["Akshay Kumar", "Jacqueline Fernandiz"],
            director: "Farhad Samji",
            trailerUrl: "http://bacchanpandey/trailers/1",
            posterUrl: "http://bacchanpandey/posters/1",
            language: "Hindi",
            releaseDate: "18-03-2022",
            releaseSatus: "RELEASED"
        });
        movie2 = await Movie.create({
            name: "Jalsa",
            description: "Intense Drama Movie",
            casts: ["Vidya Balan", "Shefali Shah"],
            director: "Suresh Triveni",
            trailerUrl: "http://jalsa/trailers/1",
            posterUrl: "http://jalsa/posters/1",
            language: "Hindi",
            releaseDate: "18-03-2022",
            releaseSatus: "RELEASED"
        });
        movie3 = await Movie.create({
            name: "Jhund",
            description: "Comedy Drama Movie",
            casts: ["Amitabh Bachchan", "Abhinay Raj"],
            director: "Nagraj Manjule",
            trailerUrl: "http://jhund/trailers/1",
            posterUrl: "http://jhund/posters/1",
            language: "Hindi",
            releaseDate: "04-03-2022",
            releaseSatus: "RELEASED"
        });
        movie4 = await Movie.create({
            name: "Radhe Shyam",
            description: "Comedy Drama Movie",
            casts: ["Prabhas", "Pooja Hegde"],
            director: "Radha Krishna Kumar",
            trailerUrl: "http://RadheShyam/trailers/1",
            posterUrl: "http://RadheShyam/posters/1",
            language: "Hindi",
            releaseDate: "11-03-2022",
            releaseSatus: "RELEASED"
        });
        movie5 =await Movie.create({
            name: "The Kashmir Files",
            description: "Intense Movie",
            casts: ["Mithun Chakraborty", "Anupam Kher"],
            director: "Vivek Agnihotri",
            trailerUrl: "http://TheKashmirFiles/trailers/1",
            posterUrl: "http://TheKashmirFiles/posters/1",
            language: "Hindi",
            releaseDate: "11-03-2022",
            releaseSatus: "RELEASED"
        });

        console.log("Movies inserted in the db");

        //Creating few intial sets of Theatres
        await Theatre.collection.drop();
        await Theatre.create({
            name: "FunCinemas",
            city: "Bangalore",
            description: "Top class theatre",
            pinCode: 560052,
            movies : [movie1._id, movie2._id, movie3._id]

        });
        await Theatre.create({
            name: "PVR Cinemas - Kormangala",
            city: "Bangalore",
            description: "PVR franchise theatre",
            pinCode: 560095,
            movies : [movie1._id, movie2._id, movie4._id]

        });
        await Theatre.create({
            name: "IMax",
            city: "Bangalore",
            description: "IMax franchise theatre",
            pinCode: 560095,
            movies : [movie1._id, movie4._id]

        });
        await Theatre.create({
            name: "Vaibhav Theatre",
            city: "Bangalore",
            description: "Economical theatre",
            pinCode: 560094,
            movies : [movie5._id, movie4._id]
 
        });

        await Theatre.create({
            name: "Inox",
            city: "Pune",
            description: "Top class theatre",
            pinCode: 411001,
            movies : [movie5._id, movie2._id]

        });
        await Theatre.create({
            name: "Sonmarg Theatre",
            city: "Pune",
            description: "Economical theatre",
            pinCode: 411042,
            movies : [movie3._id, movie2._id]

        });

        console.log("Theatres created");

    } catch (e) {
        console.error(e.message);
    }

    /**
     * Creating one ADMIN user at the server boot time
     */
     await User.collection.drop();
     try {

        user = await User.create({
            name: "admin",
            userId: "1", // It should be atleat 16, else will throw error
            email: "admin@gmail.com",  // If we don't pass this, it will throw the error
            userType: "ADMIN",
            password :bcrypt.hashSync("admin", 8) //this field should be hidden from the end user

        });
        console.log("ADMIN user created");

    } catch (e) {
        console.log(e.message);
    }

}
// Start the server
app.listen(serverConfig.PORT, () => {
    console.log(`Application started on port num : ${serverConfig.PORT}`);
});