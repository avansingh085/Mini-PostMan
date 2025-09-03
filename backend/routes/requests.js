const express = require('express');
const axios = require('axios');
const router = express.Router();
let orm;

const { RequestHistory } = require('../entities/RequestHistory');

const initRouter = (_orm) => {
    orm = _orm;


    return router;
};

// Send request
router.post('/send', async (req, res) => {
    try {
        const { method, url, body, data, statusCode } = req.body;

        // If statusCode is missing, try to get it from data
       
        const finalStatusCode = statusCode || (data?.statusCode) || 200;

        const history = orm.em.create(RequestHistory, {
            method,
            url,
            statusCode: finalStatusCode,
            body: JSON.stringify(body || {}),
            response: JSON.stringify(data || {}),
        });

        await orm.em.persistAndFlush(history);

        res.json(data || {}); // return the actual response
    } catch (err) {
        console.log(err, "server error");
        res.status(500).json({ error: err.message });
    }
});



// History with pagination
router.get('/history', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const [data, total] = await orm.em.findAndCount(RequestHistory, {}, {
        orderBy: { createdAt: 'DESC' },
        limit,
        offset: (page - 1) * limit,
    });


    res.json({ data, total, page, totalPages: Math.ceil(total / limit) });
});

module.exports = { initRouter };
