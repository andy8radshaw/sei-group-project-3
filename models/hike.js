const mongoose = require('mongoose')


// user can review the hike and rate from 1-5
const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 1000 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})


//general hike profile
const hikeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  difficulty: { type: Array, required: true, default: undefined },
  distance: { type: String, required: true },
  timeToComplete: { type: String, required: true },
  images: { type: Array, required: true, default: undefined },
  reviews: [reviewSchema],
  seasons: { type: Array, required: true, default: undefined },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})


//obtaining the list of users that have completed this hike
hikeSchema
  .virtual('usersCompleted', {
    ref: 'User',
    localField: '_id',
    foreignField: 'completedHikes'
  })


//obtaining the list of users that have favortied this hike
hikeSchema
  .virtual('usersFavorited', {
    ref: 'User',
    localField: '_id',
    foreignField: 'favoritedHikes'
  })

hikeSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Hike', hikeSchema)