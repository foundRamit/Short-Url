// Import the URL model
const URL = require('../models/urlModel');
// Import shortid to generate short unique strings
const shortid = require("shortid");

// Controller to handle generation of a new short URL
exports.handleGenerateNewShortURL = async (req, res) => {
    try {
        const body = req.body;

        // Check if the body contains a URL to shorten
        if (!body.url) {
            return res.status(400).json({ error: "url is required" });
        }

        // Generate a unique short ID (e.g., 'abc123')
        const shortId = shortid();

        // Create a new entry in the database
        await URL.create({
            shortId: shortId,               // Store generated short ID
            redirectUrl: body.url,          // Store the original URL
            visitHistory: [],               // Initialize visit history as empty
        });

        // Respond with the short ID
        return res.status(200).json({ id: shortId });

    } catch (err) {
        // Catch and respond to any server errors
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Controller to handle redirection from short URL to original URL
exports.handleRedirectURL = async (req, res) => {
    // Extract shortId from the URL parameters
    const shortId = req.params.shortId;

    try {
        // Search the database for a document with this shortId
        const entry = await URL.findOne({ shortId });

        // If the shortId does not exist in the database, respond with 404
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Log the current timestamp into the visitHistory array
        entry.visitHistory.push({ timestamp: Date.now() });

        // Save the updated entry back to the database
        await entry.save();

        // Redirect the user to the original long URL
        return res.redirect(entry.redirectUrl);

    } catch (err) {
        // Catch and log server errors
        console.error(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

// Controller to fetch analytics for a given short URL
exports.handleGetAnalytics = async (req, res) => {
    // Extract the shortId from the route parameters (e.g., /analytics/abc123 → shortId = 'abc123')
    const shortId = req.params.shortId;

    try {
        // Look up the URL entry in the database using the shortId
        const entry = await URL.findOne({ shortId });

        // If no such entry exists, return a 404 Not Found error
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // If found, respond with:
        // 1. totalClicks: total number of times the short URL has been visited
        // 2. visitHistory: an array of all recorded timestamps for each visit
        return res.status(200).json({
            totalClicks: entry.visitHistory.length,  // count of visits
            visitHistory: entry.visitHistory         // array of visit timestamps
        });

    } catch (err) {
        // If any error occurs during the database operation, log it and return 500 error
        console.error(err);
        return res.status(500).json({
            error: "Unable to fetch analytics",
            details: err.message
        });
    }
};