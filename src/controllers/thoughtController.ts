const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then(thoughts => res.json(thoughts))
      .catch(err => res.status(500).json(err));
  },

  // Get a single thought by ID
  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .then(thought => 
        !thought ? res.status(404).json({ message: 'Thought not found' }) : res.json(thought)
      )
      .catch(err => res.status(500).json(err));
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(thought => {
        return User.findByIdAndUpdate(
          req.body.userId, 
          { $push: { thoughts: thought._id } }, 
          { new: true }
        ).then(user => res.status(201).json(thought));
      })
      .catch(err => res.status(500).json(err));
  },

  // Update a thought by ID
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
      .then(thought => 
        !thought ? res.status(404).json({ message: 'Thought not found' }) : res.json(thought)
      )
      .catch(err => res.status(500).json(err));
  },

  // Delete a thought by ID
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then(deletedThought => 
        !deletedThought ? res.status(404).json({ message: 'Thought not found' }) : res.json(deletedThought)
      )
      .catch(err => res.status(500).json(err));
  }
};
