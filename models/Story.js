const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
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
      required: true,
    },
    status: {
      type: String,
      default: 'shared',
      enum: ['shared', 'unshared'],
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

module.exports = mongoose.model('Story', StorySchema)