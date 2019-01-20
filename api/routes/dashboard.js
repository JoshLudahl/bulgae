const express = require('express');
const router = express.Router();
const Budget = require('../models/budget');

//  Get initial dashboard
router.get('/', (req, res, next) => {
    //  Get session date for id
    //  Find by user
    //  Only give back budget items per the user
        res.status(200).json({
            message:'good to go'
        });
});

// Get ONE budget item
router.get('/:id', (req, res, next)=> {
    //  Get session information for user
    //  Check to see if the user owns the budget item
    //  If they do, return it

});

//  Create ONE budget item
router.post('/', (req, res, next) => {
    //  Get session id for user
    //  Pull in request params
    //  validate anything
    //  if all is good, save it to database
});

//  Update a budget item
router.patch('/:id', (req, res, next) => {
    //  Get session id for user
    //  check if user owns the budget item
    //  Update budget item if user is owner

});

//  Delete a budget item
router.delete('/:id', (req, res, next) => {
    //  Get session id for user
    //  Check if user owns the id
    //  If user owns the id, delete item
});

module.exports = router;