const express = require('express');
const jwt = require('../middleware/auth');
const validate = require('../middleware/validate');
const memberSchema = require('../validation/memberSchema')

const memberController = require('../controllers/memberController');

const router = express.Router();

router.get('/', jwt, memberController.getAllMember);
router.get('/:memberId', memberController.getOneMember);

router.post('/', validate.validateBody(memberSchema), memberController.createMember);
router.patch('/', memberController.updateAllMember);
router.patch('/:memberId', memberController.updateOneMember); // toutes les infos sauf pw, profilephoto et bannnière eet la biography
router.patch('/profile_photo/:memberId', memberController.updateProfilePhoto);

// Nouvelle route pour mettre à jour la biographie, la localisation, la bannière
router.patch('/profile_infos/:memberId', memberController.updateProfileInfos);

router.delete('/:memberId', jwt, memberController.deleteOneMember);

router.post('/login', memberController.loginMember);
router.post('/token', memberController.refreshToken);

module.exports = router;