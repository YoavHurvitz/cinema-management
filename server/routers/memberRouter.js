const express = require('express');
const memberController = require('../controllers/memberController');

const router = express.Router();

router.get('/', memberController.getMembers);
router.get('/:id', memberController.getMemberById);
router.post('/', memberController.addMember);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;
