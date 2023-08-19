const router = require('express').Router();
const {
  getUsers, getUser, setUser, setAvatar, getMe,
} = require('../controllers/users');
const { validationUserId, validationUserInfo, validationAvatar } = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', getMe);
router.patch('/me', validationUserInfo, setUser);
router.patch('/me/avatar', validationAvatar, setAvatar);
router.get('/:userId', validationUserId, getUser);

module.exports = router;
