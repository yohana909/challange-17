const express = require('express');
const router = express.Router();
const thoughtController = require('../../controllers/thoughtController');
const reactionController = require('../../controllers/reactionController');

router
  .route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router
  .route('/:thoughtId')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(reactionController.createReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(reactionController.deleteReaction);

module.exports = router;
