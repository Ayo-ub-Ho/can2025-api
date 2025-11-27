// src/routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', matchController.getAllMatches);
router.get('/upcoming', matchController.getUpcomingMatches);
router.get('/:id', matchController.getMatchById);

// Admin-only routes
router.post('/', verifyToken, isAdmin, matchController.createMatch);
router.put('/:id', verifyToken, isAdmin, matchController.updateMatch);
router.delete('/:id', verifyToken, isAdmin, matchController.deleteMatch);

module.exports = router;