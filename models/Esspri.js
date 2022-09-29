const mongoose = require('mongoose')

const EsspriSchema = new mongoose.Schema({
    dryness: {
      type: Number,
      required: true,
    },
    fatigue: {
      type: Number,
      required: true,
    },
    pain: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //!Change: this field should be required because the app will break if the user is not present.
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
  })

module.exports = mongoose.model('Esspri', EsspriSchema)