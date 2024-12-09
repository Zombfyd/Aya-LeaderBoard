const Score = require('../models/score');

exports.submitScore = async (req, res) => {
  try {
    const { playerWallet, score } = req.body;

    // Validate wallet address
    if (!/^0x[a-fA-F0-9]{64}$/.test(playerWallet)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    // Create new score entry
    const newScore = await Score.create({ playerWallet, score });

    res.status(201).json(newScore);
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({ error: 'Failed to submit score' });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.findAll({
      attributes: ['playerWallet', 'score'],
      order: [['score', 'DESC']],
      limit: 100
    });

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};
