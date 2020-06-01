/*
 *
 *   TO be used for Budget Based Ops
 *
 */

const express = require('express');
const router = express.Router();
const Budget = require('../models/budget');
const csrf = require('../middleware/attach_csrf_token');

//  Get the users data
router.get('/', csrf, async (req, res, next)=> {
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
        res.status(200).json({message:'winning'});
    } catch (error) {
        res.status(404).json({
            message: 'Error'
        });
    }
    //  Only give back budget items per the user

});



module.exports = router;
