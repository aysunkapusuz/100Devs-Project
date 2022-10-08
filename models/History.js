const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    medicine: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: 'private',
      enum: ['private', 'public'],
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

module.exports = mongoose.model('History', HistorySchema)