const { addInviteCode } = require("../controllers/inviteController");
const router = require("express").Router();

router.post("/addInviteCode", addInviteCode);

module.exports = router;
