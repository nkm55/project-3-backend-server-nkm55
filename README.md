[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/wnz2CCsz)
# CSC317-F24-P3: Backend

In this project, you will build on your website from Project 2 and add server and some backend calls.

Goals for this assignment:
* create backend endpoints that updates in-memory state of our data
* invoke the endpoints from your frontend

## Section 1: Project Set Up

As in the last project, you should accomplish your work within the `server/` directory.

### Migrate the files from Project 2

Files and directories that should be copied over: 

* HTML + Templates

    * `server/public/index.html`
    * `server/public/attractions.html`
    * `server/views/restaurants.ejs`
    * `server/public/new-restaurant-form.html`


* CSS
    * `server/public/styles.css`

        plus any other CSS you're using

* JS
    * `server/public/scripts`

        
        This should contain `header.js` which populates the page layout and `restaurantCards.js` which has the JavaScript for the remove button handler.

    * `server/server.js`

        Copy over the contents of your `server.js`

* Data

    * `server/data/restaurants.js`
    
        Look at the contents of `server/data/restaurants.js` provided in this project. You'll want to copy over the contents of your `restaurantsData` array from the last project, but also keep the skeleton code provided here. You'll be filling out the skeleton code in this project.

* Images

    * `server/public/images`

        Any images you're using

* Node
    * `server/package.json`

        an initial `package.json` with a `start` command has been provided. Make sure to reinstall any depdendencies you need.

### New Files

This project comes with a few new files, which you should take a look at:

* Template
    
    * `server/views/restaurant-details.ejs`

    This is a template file that renders a page with some details about a specific restaurant.
    
* CSS

    * `server/restaurant-details-styles.css`

    Some minimal CSS to accompany `restaurant-details.ejs`

* JS

    * `server/public/scripts/restaurantSubmit.js`

    Some skeleton code to fill out to get our new restaurant form working.

    * `routes/api.js`

    Some initial routing skeleton code has been provided. This will be used in the Backend portion of Section 3.

## Section 2: In-Memory Data Models

The goal of this section is to set up in-memory changes to our restaurant data.

### Restaurant Data Array

Look at the boilerplate provided in `data/restaurants.js`. You should have copied over your `restaurantData` array. In addition to the fields that already exist, add an `id` field to each entry. I suggest indexing from 0 to N-1.

```
let restuarantData = [
    {
        "id": 0,
        "name": "...",
        "phone": "...",
        "address": "..."
    },
    etc ...
];
```

The id field will be how we refer to a restaurant resource.

### Mangaging the Data

Implement calls for reading and updating the in-memory representation of restaurants:

* `getRestaurants()` should return a list of all restaurants

* `getRestaurant(id)` should return the details for a specific restaurant. Use JS's `find` function.

* `createRestaurant(newRestaurant)` takes a JS object, uses it to populate a new restaurant entry in in your restaurant data. It should assign a new, unused id to the restaurant entry. The `getNextId()` helper function might be useful.

* `deleteRestaurant(id)` should delete a restaurant from your data by using it's id. Use JS's `filter` function.

Make sure these functions are implemented within the same file as your `restaurantsData` array. You will be using these functions in section 3.

Since these implementations are in-memory, changes to the data should will only be saved until until the server is restarted. Remember that nodemon restarts your server when you make changes to your files!

## Section 3: Backend Server

In this section, we'll set up some endpoints. For each route, you should use function(s) you implemented in Section 2.

### Frontend 

#### Get Restaurants

Update your route handler for `/restaurants` to use call(s) you implemented in Section 2. It should still render your `restaurants.ejs` view, but instead of using the `restaurantData` array directly, it should get the restaurant data though a function call. You'll have to import the functions you want to use.

#### Get a Restaurant by ID

Set up a new route handler for `/restaurants/id`, where `id` is an integer that maps to a restaurant id. Use a dynamic paramter.

The router handler should render the `restaurant-details.ejs` view with the restaurant data for the specified `id`. It references `restaurant-details-styles.css`.

You're welcome to make changes to the HTML and CSS for the restaurant details page as needed to get it working or to style it to your preference. Leaving it as is is also fine. The only requirement is that the page renders properly with the specified restaurant data.

### Backend

#### Router

Set up an express `Router` that assigns an `/api` prefix to a set of route handlers. Assign the backend handlers in this section to this router. An initial file has been supplied in `routes/api.js` where you can define the router handlers. Have your server in `server.js` mount the router you defined in `routes/api.js`.

#### Create and Delete

Implement 2 endpoints. Both should recieve HTTP requests, and one should create  a restaurant entry, and another should delete it. The endpoint should follow RESTful practices (eg they should be `/restaurants` and `/restaurants/id`). Make sure you're using the appropriate HTTP verb for these handlers.

Test that your create and delete endpoints work with Postman. Note that since they're under the `/api` prefix, the complete path is `/api/restaurants` and `/api/restaurants/id`. Verify that making the appropriate HTTP requests now changes the list of restaurants in-memory. You should be able to add a new restaurant through Postman, and render the restaurant page on the frontend and see the new entry. Nice! 


## Section 4: Delete Button Revisited

In this section, we'll update your implemention of the delete button on the frontend.

Look at code that removes the card from your frontend view in `restaurantCards.js`. Update it so that in addition to removing it from the DOM, your code also makes a `fetch` call to the appropriate endpoint on your server, then requests a re-render after the `fetch` call completes. If done correctly, you should no longer have to explicitly remove the card through the DOM interface, since the re-render will simply not render a card for a restaurant that no longer exists.

Something to keep in mind is that in order to make this delete request, you'll need to know the id of the restaurant for each card when assigning that card's delete event handler. In other words, the card for the resturant with id 0 will need to pass its id of 0 as a paramter to the delete request.

To do this, you'll need to associate each card item with the restaurant id, even though you never display that id to the user. One approach is to assign an `id` attribute to each card element (such as `card-3`), and simply parse out the id from the string. Another approach is to use the `data-` attribute in HTML. See [the MDN reference](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) for details.

Now, that the data being rendered is tied to the data state on the server, refreshing the page should show that that card remains deleted (until a server restart, anyway)! Nice!


## Section 5: New Restaurant Form

In this section, we'll take a look at getting the form you added in Project 2 working.

In `restaurantSubmit.js`, implement the function `handleSubmit` and assign the event handler to your form.

You might notice the first line of the handler is:
```
    event.preventDefault();
```
This line prevents the form from executing it's default submit behavior. 

By default, the form's submit behavior will encode the form's data as query parameter and make an HTTP request to the backend. We want to use a path format more in line with RESTful practices instead, so we are intentionally surpressing it that query. Instead, make you own fetch request to the create endpoint you defined in `server.js`. Navigate to the restaurants page in the `fetch` callback.

Note that if this is working properly, navigating to the Restaurants page should show your new entry on the page! Make sure that new entry is getting a fresh id assigned to it and can be properly deleted too.

Nice!


# Rubric

Total Points: 45
Bonus Points: 3

|Project Setup and Migration| 3 |
|---|---|
|Successful migration of Project 2 files |	3

|Data| 14 |
|---|---|
|Correct addition of id fields	| 2
|Correct implementation of in-memory state function: getRestaurants	| 3
|Correct implementation of in-memory state function: getRestaurant	| 3
|Correct implementation of in-memory state function: createRestaurant	| 3
|Correct implementation of in-memory state function: deleteRestaurant	| 3

|Backend | 14 |
|---|---|
|	Correct set up of restaurants page rendering with data |	2
|	Correct set up of restaurant detail page rendering with data |	3
|	Correct set up of /api router |	3
|	Correct set up of route for creating a restaurant entry |	3
|	Correct set up of route for deleteing a restaurant entry |	3

|New Restaurant Form	| 6 |
|---|---|
|	handleSubmit function properly updates backend data |	4
|	handleSubmit function properly handles ids for a new entry |	2

|Delete Button Functionality	| 8 |
|---|---|
|   Delete button on restaurant cards properly updates backend data |	6
|	Delete button on restaurant cards properly updates frontend |	2

Bonus:
|Overall Code Quality and Best Practices	| 3 |
|---|---|
|Clean, well-organized, and commented code	| 3