// data/restaurants.js

let restaurantData = [
    {
        id: 1,
        name: "Pappadeaux Seafood Kitchen",
        phone: "(713) 860-4001",
        address: "123 Main St, Houston, TX",
        photo: "/images/restaurant_1.jpeg"
    },
    {
        id: 2,
        name: "BB's Tex-Orleans",
        phone: "(713) 524-4499",
        address: "456 Elm St, Houston, TX",
        photo: "/images/restaurant_2.jpeg"
    },
    {
        id: 3,
        name: "The Breakfast Klub",
        phone: "(713) 528-8561",
        address: "789 Oak St, Houston, TX",
        photo: "/images/restaurant_3.jpeg"
    },
    {
        id: 4,
        name: "Hugo’s",
        phone: "(713) 524-7744",
        address: "1600 Westheimer Rd, Houston, TX",
        photo: "/images/restaurant_4.jpg"
    },
    {
        id: 5,
        name: "Underbelly",
        phone: "(713) 528-9800",
        address: "1100 Westheimer Rd, Houston, TX",
        photo: "/images/restaurant_5.jpeg"
    },
    {
        id: 6,
        name: "Gatlin’s BBQ",
        phone: "(713) 869-4227",
        address: "3510 Ella Blvd, Houston, TX",
        photo: "/images/restaurant_6.jpeg"
    }
];

let lastId = restaurantData.length;

// Helper function to generate a new unique ID for a restaurant
const getNextId = () => {
    lastId += 1;
    return lastId;
}

// Function to get a list of all restaurants
const getRestaurants = () => {
    return restaurantData;
};

// Function to get a restaurant by ID
const getRestaurant = (id) => {
    return restaurantData.find(restaurant => restaurant.id === id);
};

// Function to create a new restaurant entry
const createRestaurant = (newRestaurant) => {
    newRestaurant.id = getNextId();  // Assign a new ID
    restaurantData.push(newRestaurant);
    return newRestaurant;
};

// Function to delete a restaurant by ID
const deleteRestaurant = (id) => {
    const index = restaurantData.findIndex(restaurant => restaurant.id === id);
    if (index !== -1) {
        return restaurantData.splice(index, 1)[0];  // Remove and return the deleted restaurant
    }
    return null;  
};

// Export the functions to use them in other files
export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant };


