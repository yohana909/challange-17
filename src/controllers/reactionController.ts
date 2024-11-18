const Thought = require('../models/Thought');

module.exports = {
  // Create a reaction to a thought
  createReaction(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, 
      { $push: { reactions: req.body } }, 
      { new: true })
      .then(thought => res.json(thought))
      .catch(err => res.status(500).json(err));
  },

  // Delete a reaction by reactionId
  deleteReaction(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, 
      { $pull: { reactions: { reactionId: req.params.reactionId } } }, 
      { new: true })
      .then(thought => res.json(thought))
      .catch(err => res.status(500).json(err));
  }
};
