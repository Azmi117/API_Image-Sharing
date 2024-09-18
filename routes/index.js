const express = require('express');
const router = express.Router();
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const imageRoutes = require('../routes/imageRoutes');
const reviewRoutes = require('../routes/reviewRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/image', imageRoutes);
router.use('/review', reviewRoutes);

module.exports = router;

