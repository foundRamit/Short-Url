// Import the URL model
const urlModel = require('../models/urlModel');
// Import shortid to generate short unique strings
const shortid = require("shortid");

// Controller to handle generation of a new short URL
exports.handleGenerateNewShortURL = async (req, res) => {
    try {
        const body = req.body;
        console.log("🔍 Received Body:", req.body);

        if (!body.url) {
            return res.status(400).json({ error: "url is required" });
        }
        
        const shortId = shortid();

        const result = await urlModel.create({
            shortId: shortId,
            redirectUrl: body.url,
            visitHistory: [],
        });

        
            
        return res.status(200).json({
            message: "Short URL created successfully",
            id: shortId,
            data: result
        });
       


    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Controller to handle redirection from short URL to original URL
exports.handleRedirectURL = async (req, res) =>{
    try {
         const shortId = req.params.shortId;

         const entry = await urlModel.findOne({shortId});

         if(!entry){
            return res.status(404).json({msg: "cannot find shortId"});
         };
            
         entry.visitHistory.push({timestamp: Date.now()});

         await entry.save();

         return res.redirect(entry.redirectUrl);

    } catch (err) {
        console.error(err);

        res.status(500).json({ msg: "Server error", error: err.message });
    };
};

// Controller to fetch analytics for a given short URL
exports.handleGetAnalytics = async(req, res) =>{
    try {
        const shortId = req.params.shortId;

        const entry = await urlModel.findOne({shortId});

        if(!entry){
            return res.status(404).json({msg:"cannot find shortId"})
        };

        res.status(200).json({
            totalClicks : entry.visitHistory.length,
            visitHistory: entry.visitHistory
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({msg: "server error", error: err.message});
    };
};