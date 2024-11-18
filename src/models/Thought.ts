const mongoose = require('mongoose');
const moment = require('moment');
const ReactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
  },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
});

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
