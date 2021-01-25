const express = require('express');

const jwt = require('../middleware/auth');

const memberController = require('../controllers/memberController');

const router = express.Router();

router.get('/', jwt, memberController.getAllMember);
router.get('/:memberId', jwt, memberController.getOneMember);
router.post('/', jwt, memberController.createMember);
router.patch('/', jwt, memberController.updateAllMember);
router.patch('/:memberId', jwt, memberController.updateOneMember);
router.delete('/', jwt, memberController.deleteAllMember);
router.delete('/:memberId', jwt, memberController.deleteOneMember);

router.post('/login', memberController.loginMember);

module.exports = router;