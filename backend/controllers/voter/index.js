const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
var verifyToken = require('../../middleware/verifytoken');
const User = require('../../model/User');
const Vote = require('../../model/Vote'); 
require('dotenv').config();


router.get('/Dashboard', verifyToken, async (req, res) => {
  try {
    const totalVotes = await Vote.countDocuments();
    const totalCandidates = await User.countDocuments({ role: 'candidate' });

    return res.status(200).json({
      totalVotes: totalVotes,
      totalCandidates: totalCandidates
    });
  } catch (err) {
    logger.error(`Error in / route: ${err.message}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/candidates', verifyToken, async (req, res) => {
    try {
      const candidates = await User.find({ role: 'candidate' },{_id:1,username:1}).exec();    
      return res.status(200).json(candidates);
    } catch (err) {
      logger.error(`Error in / route: ${err.message}`);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/vote', verifyToken,
  body('candidateId').notEmpty().withMessage('Candidate ID is required'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { candidateId } = req.body;

      // Check if the user has already voted
      const user = await User.findOne({ _id: req.decoded.id }).exec();
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const existingVote = await Vote.findOne({ userId: user._id }).exec();
      if (existingVote) {
        return res.status(400).json({ message: 'You have already voted' });
      }

      // Check if the candidate exists
      const candidate = await User.findOne({ _id: candidateId, role: 'candidate' }).exec();
      if (!candidate) {
        return res.status(400).json({ message: 'Candidate not found' });
      }

      // Create a new vote
      const newVote = new Vote({
        userId: user._id,
        candidateName: candidateId 
      });
      await newVote.save();

      return res.status(200).json({ message: 'Vote successful' });
    } catch (err) {
        logger.error(`Error in / route: ${err.message}`);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

router.get('/vote-results', verifyToken, async (req, res) => {
  try {
    const candidates = await User.find({ role: 'candidate' });

    const totalVotes = await Vote.countDocuments();

    const results = await Promise.all(candidates.map(async (candidate) => {
      const voteCount = await Vote.countDocuments({ candidateName: candidate._id });
      const votePercentage = ((voteCount / totalVotes) * 100).toFixed(2); 
      return {
        candidateName: candidate.username,
        voteCount,
        votePercentage,
      };
    }));

    res.status(200).json({
      totalVotes,
      results,
    });
  } catch (err) {
    logger.error(`Error in / route: ${err.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;
