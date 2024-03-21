const {
  login,
  register,
  // editAvatar,
  // editUsername,
  isAdmin,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
// router.post("/editAvatar", editAvatar);
// router.post("/editUsername", editUsername);
router.post("/isAdmin", isAdmin);

module.exports = router;
