const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
    req.session.regenerate(() => {
        if (
            1 === 6
        ) {
            req.session.user = req.body;
            req.session.save(() => {
                res.status(200).json({ msg: 'Welcome' });
            });
        } else {
            res.status(401).json({ msg: 'Unauthorized' });
        }
    });
});