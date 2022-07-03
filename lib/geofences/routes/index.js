var express = require("express");
var router = express.Router();
var {
  createGeofence,
  getAllGeofences,
  getUserAllGeofences,
  getGeofence,
  updateAdminGeo,
  deleteGeofence,
  activateGeofence,
  deactivateGeofence,
  getGeoByUserId,
} = require("../../geofences/controller");
const auth = require("../../auth-services");

router.post("/", auth.verifyUser, auth.isAdminOrManager, createGeofence);

router.get("/all", auth.verifyUser, getAllGeofences);

router.get("/", auth.verifyUser, getUserAllGeofences);
router.get("/:id", auth.verifyUser, getGeoByUserId);

router.get("/:id", auth.verifyUser, getGeofence);

router.put("/", auth.verifyUser, auth.isAdmin, updateAdminGeo);
router.put("activate/:id", auth.verifyUser, auth.isAdmin, activateGeofence);
router.put("deactivate/:id", auth.verifyUser, auth.isAdmin, deactivateGeofence);

router.delete("/:id", auth.verifyUser, auth.isAdmin, deleteGeofence);

module.exports = router;
