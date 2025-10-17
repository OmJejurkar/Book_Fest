const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// GET /api/links - Get all links
router.get('/', linkController.getAllLinks);

// GET /api/links/:name - Get link by name
router.get('/:name', linkController.getLinkByName);

module.exports = router;
