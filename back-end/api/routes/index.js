const express = require('express');
const categoryRoutes = require('./categories.routes');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to Symplete API!'));

router.use('/categories', categoryRoutes);

module.exports = router;