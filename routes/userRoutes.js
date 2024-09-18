const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', authenticate, userController.getAllUser);
router.get('/me', authenticate, userController.getMe);
router.get('/:id', authenticate, userController.getUserById);
router.put('/update/:id', authenticate, upload.single('photo'), userController.updateUser);
router.delete('/delete/:id', authenticate, userController.deleteUser);

module.exports = router;