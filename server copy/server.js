// Import necessary modules and functions
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from './data/restaurants.js';
import { backendRouter } from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the attractions page
app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

// Route for the restaurants page
app.get('/restaurants', (req, res) => {
    const restaurants = getRestaurants();
    res.render('restaurants', { restaurantData: restaurants });
});

// Route for individual restaurant details
app.get('/restaurants/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id, 10); // Extract the ID from the request params
    const restaurant = getRestaurant(restaurantId); // Retrieve the restaurant by ID

    if (restaurant) {
        // Render the restaurant-details.ejs with the restaurant data
        res.render('restaurant-details', {
            name: restaurant.name,
            address: restaurant.address,
            phone: restaurant.phone,
            photo: restaurant.photo
        });
    } else {
        // If not found, send a 404 status and a message
        res.status(404).send('Restaurant not found');
    }
});

// Route for the new restaurant form page
app.get('/new-restaurant', (req, res) => {
    res.render('new-restaurant'); // Render the EJS form
});

// Mount the router for API routes
app.use('/api', backendRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





















