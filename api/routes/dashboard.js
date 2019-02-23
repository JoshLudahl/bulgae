/*
 *
 *   TO be used for Budget Based Ops
 *
 */

const express = require('express');
const router = express.Router();
const Budget = require('../models/budget');
const csrf = require('../middleware/attach_csrf_token');

//  Get initial dashboard
router.get('/gather', csrf, async (req, res, next) => {

    //  Get session date for id
    const user = req.session.userId;
    //  Find by user
    try {
        const result = await Budget.find({
            owner: user
        });
        let expense = 0;
        let income = 0;
        result.forEach(item => {
            if (item.expense) {
                expense += item.amount;
            } else {
                income += item.amount;
            }
        });
        res.render('admin/index', {
            user: req.session.email,
            result,
            income,
            expense
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error'
        });
    }
    //  Only give back budget items per the user
});

router.get('/', (req, res, next) => {

    //  Renter the dashboard
    res.render('admin/index');
});
// Get ONE budget item
router.get('/:id', (req, res, next) => {
    //  Get session information for user
    //  Check to see if the user owns the budget item
    //  If they do, return it

});

//  Create ONE budget item
router.post('/add', csrf, async (req, res, next) => {

    //  Get session id for user
    const user = req.session.userId;

    //  Pull in request params
    const {
        name,
        category,
        expense,
        amount,
        description
    } = req.body;

    //  validate anything
    //  if all is good, save it to database

    try {
        const budgetItem = new Budget({
            name,
            category,
            owner: user,
            expense,
            amount,
            description
        });

        const saveBudget = await budgetItem.save();

        res.status(200).json({message: 'item added'});

    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error
        });
    }

});

//  Update a budget item
router.patch('/:id', async (req, res, next) => {
    //  Get session id for user
    const user = req.session.userId;
    //  check if user owns the budget item
    try {
        const updater = await Budget.findOneAndUpdate({
            _id: req.params.id,
            owner: user
        }, req.body);
        if (updater != null) {
            res.status(200).json({
                message: 'Item Updated',
                updated: req.body
            })
        } else {
            res.status(404).json({
                message: 'Error, item not found.'
            })
        }

    } catch (error) {
        res.status(404).json({
            status: 404,
            message: 'Sorry, the requested item was not found.'
        });
    }
    //  Update budget item if user is owner

});

//  Delete a budget item
router.post('/delete/:id', csrf, async (req, res, next) => {
    //  Get session id for user
    const user = req.session.userId;
    //  Check if user owns the id
    try {

        const budgetItem = await Budget.findByIdAndRemove({
            owner: user,
            _id: req.params.id
        });
        res.status(200).json({
            message: 'Item removed'
        })

    } catch (error) {
        res.status(404).json({
            message: '404 - Document not found.'
        })
    }
    //  If user owns the id, delete item
});

module.exports = router;

