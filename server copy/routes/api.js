import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from '../data/restaurants.js'; // Importing restaurant data functions

const router = express.Router();

// GET all restaurants (Read operation)
router.get('/restaurants', (req, res) => {
    const restaurants = getRestaurants();
    res.json(restaurants); // Return the list of restaurants as JSON
});

// GET a specific restaurant by ID (Read operation)
router.get('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Parse the restaurant ID from the request params
    const restaurant = getRestaurant(id);

    if (restaurant) {
        res.json(restaurant); // Return the specific restaurant data as JSON
    } else {
        res.status(404).json({ error: 'Restaurant not found' }); // Return 404 if restaurant is not found
    }
});

// POST a new restaurant (Create operation)
router.post('/restaurants', (req, res) => {
    const newRestaurant = req.body; // Extract restaurant data from the request body
    const createdRestaurant = createRestaurant(newRestaurant); // Create a new restaurant using the function in data file
    res.status(201).json(createdRestaurant); // Return the newly created restaurant data
});

// DELETE a restaurant by ID (Delete operation)
router.delete('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Parse the restaurant ID from the request params
    const deleted = deleteRestaurant(id);

    if (deleted) {
        res.status(204).send(); // Return 204 No Content if the deletion was successful
    } else {
        res.status(404).json({ error: 'Restaurant not found' }); // Return 404 if restaurant is not found
    }
});

export { router as backendRouter };
