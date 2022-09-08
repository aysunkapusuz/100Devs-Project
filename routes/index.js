const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Story = require('../models/Story')


// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req,res)=>{
    res.render('login',{
        layout: 'login',
    })
})


// @desc Login/Landing page
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req,res) => {
    try {
        const stories = await Story.find({user: req.user.id}).lean()
        // console.log(req.user.id)
        // console.log(stories)
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// new webpage added

router.get('/chewgum',  (req,res)=>{
    res.render('chewgum')
})

router.get('/drinkwater',  (req,res)=>{
    res.render('drinkwater')
})

module.exports = router