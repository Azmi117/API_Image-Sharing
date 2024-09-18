const express = require('express');
const router = express.Router();
const imageController = require('../controllers/ImageController');
const authenticate = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', authenticate, imageController.getAllImage);
router.get('/me', authenticate, imageController.getMe);
router.get('/:id', authenticate, imageController.getImageById);
router.post('/create', authenticate, upload.single('photo'), imageController.createImage);
router.put('/update/:id', authenticate, upload.single('photo'), imageController.updateImage);
router.delete('/delete/:id', authenticate, upload.single('photo'), imageController.deleteImage);

module.exports = router;
