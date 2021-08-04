const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add colleges
 *  @method GET /add-item
 */
route.get('/add-item', services.add_item)

/**
 *  @description for update item
 *  @method GET /update-item
 */
route.get('/update-item', services.update_item)


// API
// route.post('/api/colleges', controller.create); //creating db
route.get('/api/colleges', controller.find);
route.get('/api/college-suggestions', controller.getsuggestion);
// route.put('/api/colleges/:id', controller.update); //updating inffo
// route.delete('/api/colleges/:id', controller.delete); //deleting college


module.exports = route