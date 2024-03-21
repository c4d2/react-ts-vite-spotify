const { AddRoom, getChatRoom } = require("../controllers/chatroomController");
const router = require("express").Router();

router.post("/addchatroom/", AddRoom);
router.get("/getchatroom/", getChatRoom);

module.exports = router;
