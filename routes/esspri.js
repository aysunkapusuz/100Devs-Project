const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Esspri = require('../models/Esspri')


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
router.delete('/:id', ensureAuth, async (req,res) => {
  try {
      await Esspri.remove({ _id: req.params.id })
      res.redirect('/esspriscale')
  } catch (err) {
      console.error(err)
      return res.render('error/500')
  }
})







module.exports = router
