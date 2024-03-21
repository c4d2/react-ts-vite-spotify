const { addChatMessage, getChatMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addchatmsg/", addChatMessage);
router.get("/getchatmsg/", getChatMessages);

module.exports = router;