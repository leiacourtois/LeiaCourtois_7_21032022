const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const paramsCtrl = require('../controllers/params');

router.get('/:id', auth, paramsCtrl.getParams);
router.get('/', auth, paramsCtrl.getAllUsers);
router.put('/:id', auth, multer, paramsCtrl.modifyUserParams);
router.put('/password/:id', auth, paramsCtrl.modifyPasswordParams);
router.delete('/:id', auth, paramsCtrl.deleteUser);

module.exports = router;