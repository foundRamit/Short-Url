const express = require('express');
const router = express.Router()
const urlController = require('../controllers/urlController')

router.post('/', urlController.handleGenerateNewShortURL);

router.get('/:shortId' , urlController.handleRedirectURL);

router.get('/analytics/:shortId', urlController.handleGetAnalytics);

module.exports = router ;