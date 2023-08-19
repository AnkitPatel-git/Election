const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidateName: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
