const express = require('express');
const router = express.Router()
const urlController = require('../controllers/urlController')
const authMiddleware = require('../middleware/authMiddleware');



router.post('/', authMiddleware, urlController.handleGenerateNewShortURL);

router.get('/:shortId', urlController.handleRedirectURL);

router.get('/analytics/:shortId', authMiddleware, urlController.handleGetAnalytics);

module.exports = router;