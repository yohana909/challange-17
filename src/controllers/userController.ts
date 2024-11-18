const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },

  // Get a user by ID
  getUserById(req, res) {
    User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends')
      .then(user => 
        !user ? res.status(404).json({ message: 'User not found' }) : res.json(user)
      )
      .catch(err => res.status(500).json(err));
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(400).json(err));
  },

  // Update a user by ID
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then(user => 
        !user ? res.status(404).json({ message: 'User not found' }) : res.json(user)
      )
      .catch(err => res.status(400).json(err));
  },

  // Delete a user
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then(deletedUser => {
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        
        // Remove all associated thoughts
        Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })
          .then(() => res.json({ message: 'User and associated thoughts deleted' }))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  },

  // Add a friend
  addFriend(req, res) {
    User.findByIdAndUpdate(req.params.userId, 
      { $addToSet: { friends: req.params.friendId } }, 
      { new: true })
      .then(user => 
        !user ? res.status(404).json({ message: 'User not found' }) : res.json(user)
      )
      .catch(err => res.status(500).json(err));
  },

  // Remove a friend
  removeFriend(req, res) {
    User.findByIdAndUpdate(req.params.userId, 
      { $pull: { friends: req.params.friendId } }, 
      { new: true })
      .then(user => 
        !user ? res.status(404).json({ message: 'User not found' }) : res.json(user)
      )
      .catch(err => res.status(500).json(err));
  }
};
