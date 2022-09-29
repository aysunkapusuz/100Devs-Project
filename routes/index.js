const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')


const Story = require('../models/Story')
const Esspri = require('../models/Esspri')


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
//get esspri and esspriscale
router.get('/esspri',  (req,res)=>{
    res.render('esspri')
  })
router.get('/esspriscale', ensureAuth, async (req,res) => {
    try {
        const esspries = await Esspri.find({user: req.user.id}).lean()
        
        console.log(esspries);
        res.render('esspriscale', {
            name: req.user.firstName,
            esspries,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
  })
  router.post('/esspriscale', ensureAuth, async (req,res) => {
    try {
        req.body.user = req.user.id
        await Esspri.create(req.body)
        res.redirect('/esspriscale')
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