const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt:  { type: String, required: true },
  roadmap: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', RoadmapSchema);