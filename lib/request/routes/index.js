var express = require("express");
var router = express.Router();
var {
  getRequestedUsers,
  acceptRequest,
  createRequest,
} = require("../../request/controller");
const auth = require("../../auth-services");

router.get("/", auth.verifyUser, getRequestedUsers);
router.put(
  "/acceptRequest",
  auth.verifyUser,
  auth.isAdminOrManager,
  acceptRequest
);
router.post("/createRequest", auth.verifyUser, createRequest);

module.exports = router;
