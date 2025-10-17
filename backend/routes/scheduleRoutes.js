const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// GET /api/schedule - Get all events
router.get('/', scheduleController.getAllEvents);

// GET /api/schedule/days - Get event days summary
router.get('/days', scheduleController.getEventDays);

// GET /api/schedule/:day - Get events by day
router.get('/:day', scheduleController.getEventsByDay);

module.exports = router;
